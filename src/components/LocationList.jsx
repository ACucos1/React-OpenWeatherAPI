import React, { useEffect, useState } from 'react'
import Display from './Display'
export default function LocationList({weatherList, visited, setVisited}) {
    // console.log(weatherList)
    // console.log(weatherList);
    let [page, setPage] = useState(0)
    let [pageWindow, setPageWindow] = useState(0)
    


    const handleNextClick = () => {
        let numPages = weatherList.length/3
        if(numPages > 1 && page+1 <= numPages){
            setPageWindow(pageWindow+3)
            setPage(page+1)
        }
    }
    
    const handlePrevClick = () => {
        // let numPages = weatherList.length/3
        if(page-1 >= 0){
            setPageWindow(pageWindow-3)
            setPage(page-1)
        }
    }

    useEffect(() => {
        setPage(0)
        setPageWindow(0)
    }, [weatherList])

    return (
        <div>
            {/* {console.log(weatherList)} */}
            {weatherList.length > 0 ? 
            <div>
                <div className="pageNav">
                    <button className="prev" onClick={handlePrevClick}>Prev</button>
                    {page+1}  / {Math.ceil(weatherList.length/3)}
                    <button className="next" onClick={handleNextClick}>Next</button>
                </div>
                {weatherList.map((city, idx) => {
                    return (idx >= pageWindow && idx < pageWindow+3) && 
                    (<Display visited={visited} setVisited={setVisited} weather={city} key={idx}/>) 
                })}
            </div>
            
            : <div className="no-results">No Results</div>}
        </div>
    )
}
