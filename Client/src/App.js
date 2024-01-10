import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Artist from "./Artist.js";
import NewRelease from './NewRelease.js';
import { useEffect, useState } from 'react';
import NewReleasesSection from './NewReleasesSection.js';

function App() {
  // TODO rename showLinksModal to something better?
  const [showLinksModal, setShowLinksModal] = useState(null);
  const [newReleases, setNewReleases] = useState([]);
  const [currentSearchInput, setCurrentSearchInput] = useState('');
  const [enteredSearchInput, setEnteredSearchInput] = useState('');

  useEffect(() => {
    const backendUrl = 'http://localhost:3001/api/new-releases';

    fetch(`${backendUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(newReleaseData => {
        setNewReleases(sortNewReleaseData(newReleaseData));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, []);

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
    .then(newReleaseData => {
        //setNewReleases(sortNewReleaseData(newReleaseData));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, [enteredSearchInput]);

  const searchItems = (searchValue) => {
    setCurrentSearchInput(searchValue)
  }

  const handleKeyDown = (e) => {
    // If Enter is pressed
    if (e.keyCode == 13) {
      setEnteredSearchInput(currentSearchInput);
    }

  }

  const renderLinksModal = () => {
    if (showLinksModal !== null) {
      return (
        <div className="modal" id="modal">
          <div className="modal-content">
            <button
              className="modal-close-button"
              aria-label="Close"
              onClick={() => setShowLinksModal(null)}
              >
                &times;
            </button>
            <div>
              <iframe width="100%" height="150" src={"https://embed.odesli.co/?url=" + showLinksModal + "&theme=light"} frameborder="0" allowtransparency allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="app-container">
      <div>
        <h1 className="new-releases-title">New Releases</h1>
        <NewReleasesSection
          newReleases={newReleases}
          onGetLinks={(uri) => setShowLinksModal(uri)}/>
      </div>
      <div className="account">
        <p>example@gmail.com</p>
      </div>
      {/* TODO rename class to side-panels */}
      <div className="side-bar">
        <div className="search-box">
          {/* TODO create seperate classes for these side panels */}
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
            <input
              type="text"
              placeholder="Search for an artist"
              onChange={(e) => searchItems(e.target.value)}
              onKeyDown={handleKeyDown}/>
          </div>
          <div className="search-results">
            <Artist showSubscribeBtn={true}/>
            <Artist showSubscribeBtn={true}/>
            <Artist showSubscribeBtn={true}/>
            <Artist showSubscribeBtn={true}/>
          </div>
        </div>
        <div className="subscriptions-box">
          <h3 className="subscriptions-title">Subscriptions</h3>
          <div className="search-results">
            <Artist showSubscribeBtn={false}/>
            <Artist showSubscribeBtn={false}/>
            <Artist showSubscribeBtn={false}/>
            <Artist showSubscribeBtn={false}/>
          </div>
        </div>
      </div>
      {renderLinksModal()}
    </div>
  );
}

function sortNewReleaseData(newReleaseData) {
  newReleaseData = newReleaseData[0].concat(newReleaseData[1]);
  newReleaseData = newReleaseData.sort((e1, e2) => e1.release_date < e2.release_date ? 1 : -1)
  return (newReleaseData)
}

export default App;
