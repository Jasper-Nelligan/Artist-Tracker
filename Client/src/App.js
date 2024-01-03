import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Artist from "./Artist.js";
import NewRelease from './NewRelease.js';
import { useEffect, useState } from 'react';
import NewReleaseDate from './NewReleaseDate.js';

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
    .then(data => {
      let newReleasesArray = [];
      Object.keys(data).forEach(function(key, index) {
        newReleasesArray.push(data[key]);
      })
        setNewReleases(newReleasesArray);
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
        <div className="new-releases-section">
          <NewReleaseDate/>
          <div className="new-releases-grid">
            {renderNewReleases()}
          </div>
        </div>
        <div className="new-releases-section">
          <NewReleaseDate/>
          <div className="new-releases-grid">
          </div>
        </div>
        /* <iframe width="100%" height="150" src="https://embed.odesli.co/?url=spotify:album:0VXbDPN8qoDpUm9CaTP1X7&theme=light" frameborder="0" allowtransparency allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe> */
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

export default App;

/*
{
    "album_group": "album",
    "album_type": "album",
    "artists": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/6s22t5Y3prQHyaHWUN1R1C"
            },
            "href": "https://api.spotify.com/v1/artists/6s22t5Y3prQHyaHWUN1R1C",
            "id": "6s22t5Y3prQHyaHWUN1R1C",
            "name": "AJR",
            "type": "artist",
            "uri": "spotify:artist:6s22t5Y3prQHyaHWUN1R1C"
        }
    ],
    "available_markets": [
        "XK"
    ],
    "external_urls": {
        "spotify": "https://open.spotify.com/album/1bU12iHHt5ujHbuKcIGlpm"
    },
    "href": "https://api.spotify.com/v1/albums/1bU12iHHt5ujHbuKcIGlpm",
    "id": "1bU12iHHt5ujHbuKcIGlpm",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b27304a3ca0d3bf91c88f969f905",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e0204a3ca0d3bf91c88f969f905",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/ab67616d0000485104a3ca0d3bf91c88f969f905",
            "width": 64
        }
    ],
    "name": "The Maybe Man",
    "release_date": "2023-11-10",
    "release_date_precision": "day",
    "total_tracks": 12,
    "type": "album",
    "uri": "spotify:album:1bU12iHHt5ujHbuKcIGlpm"
}
*/
