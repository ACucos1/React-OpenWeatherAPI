import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Display from './Display'

export default function DisplayVisited({visited}) {
    const {id} = useParams()
    const [weather, setWeather] = useState(null )
    console.log(visited);
    
    useEffect(() => {
        for(let i = 0; i < visited.length; i++){
            if(visited[i].name == id){
                setWeather(visited[i])
            }
        }
    }, [setWeather, visited, id])

    
    return (
        <Display weather={weather}/>  
    )
}
