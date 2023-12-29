import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Artist from "./Artist.js";

function App() {
  return (
    <div className="app-container">
      <div className="new-releases-title">
        <h1>New Releases</h1>
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
