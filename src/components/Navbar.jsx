import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar({visited}) {
  const [hideDropDown, setHideDropDown] = useState(true)
  const navigate = useNavigate()


  return (
    <div className="navbar">
        <h2><Link to="/" className="navlogo">Navbar</Link></h2>
        
        <div className={hideDropDown ? "dropdown hidden" : "dropdown"}>
          <button onClick={() => {setHideDropDown(!hideDropDown)}}>Recently Visited</button>
          <ul>
              {visited.map((weather, idx) => (
                <li onClick={() => {navigate('/visited/' + weather.cityData.name)}} key={idx}>{weather.cityData.name}</li>
              ))}
          </ul>
        </div>

        

    </div>
  )
}
