import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Artist from "./Artist.js";
import NewRelease from './NewRelease.js'

function App() {
  return (
    <div className="app-container">
      <div>
        <h1 className="new-releases-title">New Releases</h1>
        <div className="new-releases-grid">
          <NewRelease/>
          <NewRelease/>
          <NewRelease/>
        </div>
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

export default App;
