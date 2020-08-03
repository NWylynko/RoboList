import React, { useEffect, useState } from 'react';

let server = `ws://${window.location.hostname}:8080`
let ws = new WebSocket(server)

function App() {

  const [list, setList] = useState()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = ({ data }) => {
      data = JSON.parse(data)
      setList(Object.keys(data).map(id => {
        return { id, ip: data[id].ip }
      }))
    }
  }, [])

  return (
    <div>
      <h2>Robots {connected ? ' - connected to server' : ' - not connected to server'}</h2>
      {list ? list.map(Robot) : <p>loading...</p>}
    </div>
  );
}

function Robot({ id, ip }) {
  return (
    <div key={id} style={{ display: 'flex', flexDirection: 'row' }}>
      <span role="img" aria-label="robot">🤖</span>
      <p>local ip:</p>
      <a href={'ssh://pi@' + ip}>{ip}</a>
      <p>MAC: {id}</p>
    </div>
  )
}

export default App;
