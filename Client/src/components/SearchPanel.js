import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Artist from "./Artist.js";
import '../style/SearchPanel.css';

function SearchPanel({addArtist}) {
    const [currentSearchInput, setCurrentSearchInput] = useState('');
    const [enteredSearchInput, setEnteredSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        var backendUrl = new URL('http://localhost:3001/api/search-artists/');
        var params = {searchInput: currentSearchInput}
        backendUrl.search = new URLSearchParams(params).toString();
    
        fetch(`${backendUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(searchResults => {
            setSearchResults(searchResults.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [enteredSearchInput]);

    const renderSearchResults = () => {
        return searchResults.map(({name, images}) => (
          <Artist
            showSubscribeBtn={true}
            name={name}
            images={images}
            addArtist={addArtist}/>
        ))
    }

    const searchItems = (searchValue) => {
        setCurrentSearchInput(searchValue)
    }

    const handleKeyDown = (e) => {
        // If Enter is pressed
        if (e.keyCode === 13) {
          if (currentSearchInput === '') {
            setSearchResults([])
          }
          setEnteredSearchInput(currentSearchInput);
        }
    }

    return (
        <div className="search-panel">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
            <input
              type="text"
              placeholder="Search for an artist"
              onChange={(e) => searchItems(e.target.value)}
              onKeyDown={handleKeyDown}/>
          </div>
          <div className="search-results">
            {renderSearchResults()}
          </div>
        </div>
    )
}

export default SearchPanel;