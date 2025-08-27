import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState({ funds: []})

  useEffect(() => {
    fetch("/funds").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    ).catch((err) => console.error("Error fetching funds:", err));
  }, [])

  return (
    <div>
      {(typeof data.funds === 'undefined') ? (
        <p>Loading ...</p>
      ) : (
        data.funds.map((fund, i) => (
          <p key={i}>{fund}</p>
        ))
      )}
    </div>
  )
}

export default App
