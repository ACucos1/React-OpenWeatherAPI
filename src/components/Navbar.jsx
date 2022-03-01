import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({visited}) {
  const navigate = useNavigate()

  return (
    <div className="navbar">
        <h2>Navbar</h2>
        <ul>
            {visited.map((weather, idx) => (
              <li onClick={() => {navigate('/visited/' + weather.name)}} key={idx}>{weather.name}</li>
            ))}
        </ul>

        

    </div>
  )
}
