import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Display from './Display'

export default function DisplayVisited({visited}) {
    const {id} = useParams()
    const [weather, setWeather] = useState(null)

    useEffect(() => {

        for(let i = 0; i < visited.length; i++){
            if(visited[i].cityData.name === id){
                setWeather(visited[i])
                break;
            }
        }
    }, [setWeather, visited, id])
    
    
    return (
        <>
        
            {weather && <Display weather={weather}/>}  
        </>
        
    )
}
