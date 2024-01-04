import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Artist from "./Artist.js";
import NewRelease from './NewRelease.js';
import { useEffect, useState } from 'react';
import NewReleasesSection from './NewReleasesSection.js';

function App() {
  const [newReleases, setNewReleases] = useState([]);

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

  const renderNewReleases = () => {
    return newReleases.map(({ album_type, artists, images, release_date, uri, name}) => (
      <NewRelease
        name={name}
        type={album_type}
        artist={artists[0].name}
        albumCoverURL={images[0].url}
      />
    ))
  }

  return (
    <div className="app-container">
      <div>
        <h1 className="new-releases-title">New Releases</h1>
        <NewReleasesSection newReleases={newReleases}/>
        <iframe width="100%" height="150" src="https://embed.odesli.co/?url=spotify:album:0VXbDPN8qoDpUm9CaTP1X7&theme=light" frameborder="0" allowtransparency allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe>
      </div>
      <div className="account">
        <p>example@gmail.com</p>
      </div>
      <div className="search-box">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className='search-icon'/>
          <input type="text" placeholder="Search for an artist"/>
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
  );
}

function sortNewReleaseData(newReleaseData) {
  newReleaseData = newReleaseData[0].concat(newReleaseData[1]);
  newReleaseData = newReleaseData.sort((e1, e2) => e1.release_date < e2.release_date ? 1 : -1)
  return (newReleaseData)
}

export default App;
