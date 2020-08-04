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
        return { id, ...data[id] }
      }))
    }
  }, [])

  return (
    <div>
      <h2 style={{paddingLeft: 15}}>Robots {connected ? ' - connected to server' : ' - not connected to server'}</h2>
      {list ? list.map(Robot) : <p style={{color: 'var(--accent1)'}}>loading...</p>}
    </div>
  );
}

function Robot({ id, ip, hostname }) {
  return (
    <div key={id} style={{ display: 'flex', flexDirection: 'row', border: '2px solid var(--accent1)', borderRadius: 5, padding: 5, margin: 5, width: 'fit-content' }}>
      <p>Host: {hostname}</p>
      <p>IP: <a href={'ssh://pi@' + ip} style={{margin: 0, padding: 0, color: 'var(--accent2)'}}>{ip}</a></p>
      <p>MAC: {id.toUpperCase()}</p>
    </div>
  )
}

export default App;
