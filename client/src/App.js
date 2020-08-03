import React, { useEffect, useState } from 'react';

function App() {

  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8080`)
      .then(response => response.json())
      .then(data => {
        return Object.keys(data).map(id => {
          return {id, ip: data[id].ip}
        })
      })
      .then(setList)
      .catch(console.warn);
  }, [])

  return (
    <div>
      <h2>Robots</h2>
      {list.map(Robot)}
    </div>
  );
}

function Robot({id, ip}) {
  return (
    <div key={id} style={{display: 'inline-flex', flexDirection: 'row'}}>
      <span role="img" aria-label="robot">🤖</span>
      <p>local ip:</p>
      <a href={'ssh://pi@' + ip}>{ip}</a>
      <p>MAC: {id}</p>
    </div>
  )
}

export default App;
