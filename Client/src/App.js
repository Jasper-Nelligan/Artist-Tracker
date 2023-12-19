import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
          <input type="text" />
        </div>
      </div>
      <div className="subscriptions-box">
        <p>World</p>
      </div>
    </div>
  );
}

export default App;
