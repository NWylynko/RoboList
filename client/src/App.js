import React, { useEffect, useState } from 'react';
import Interval from 'react-interval-rerender'

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
      <h2 style={{ paddingLeft: 15 }}>Robots {connected ? ' - connected to server' : ' - not connected to server'}</h2>
      {list ?
        list.length === 0 ?
          <p style={{ color: 'var(--accent1)' }}>No robots registered yet</p> :
          list.map(Robot) :
        <p style={{ color: 'var(--accent1)' }}>loading...</p>
      }
    </div>
  );
}

function Robot({ id, ip, hostname, timestamp }) {
  return (
    <div key={id} style={{ display: 'inline-flex', flexDirection: 'column', border: '2px solid var(--accent1)', borderRadius: 5, padding: 5, margin: 5, width: 'fit-content', minWidth: 400 }}>
      <div className="row">
        <p>{hostname}</p>
        <Interval delay={1000}>
          {() => <p style={Date.now() - timestamp < 60000 ? {color: 'green'} : {color: 'red'}}>pinged {Math.floor((Date.now() - timestamp) / 1000)}s ago</p>}
        </Interval>
      </div>
      <div className="row">
        <p>IP: {ip}</p>
        <p>MAC: {id.toUpperCase()}</p>
      </div>
      <div className="row">
        <RobotLink scheme={'ssh'} ip={ip} />
        <RobotLink scheme={'vnc'} ip={ip} />
        <RobotLink scheme={'http'} ip={ip} />
      </div>
    </div>
  )
}

function RobotLink({ scheme, ip }) {
  return <a href={`${scheme}://pi@${ip}`} style={{ margin: 0, padding: 0, color: 'var(--accent2)' }} target="_blank" rel="noopener noreferrer">{scheme.toUpperCase()}</a>
}

export default App;
