import React, { useState, useEffect} from 'react'
import { useNavigate, matchPath, useLocation } from 'react-router-dom'

const useParams =(path) => {
    const { pathname } = useLocation()
    const match = matchPath({ path }, pathname)
    return match?.params || {}
}


export default function Searchbar({setFinalSearch}) {
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate()
    const {id} = useParams('/search/:id')
    // console.log(userInput.current);


    const handleSearchChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearch = async () => {
        console.log('Click Search')
        
        if(searchInput.length > 0){
            setFinalSearch(searchInput)
            navigate('/search/' + searchInput)
        }       
    }

    useEffect(() => {
        if(id){
            console.log('ID IS: <' + id + ">");
            setSearchInput(id)
            setFinalSearch(id)
        }
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        const listener = (e) => {
            if(e.code === 'Enter' || e.code === 'NumpadEnter'){
                e.preventDefault()
                setFinalSearch(searchInput)
                navigate('/search/' + searchInput)
            }
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
        // eslint-disable-next-line
    }, [])
    
    
    return (
        <div className="searchbar">
            <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchChange}/>
            <input type="submit" value="Search" onClick={handleSearch}/>
        </div>
    )
}
