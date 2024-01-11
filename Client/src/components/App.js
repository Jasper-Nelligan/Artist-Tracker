import '../style/App.css';
import { useEffect, useState } from 'react';
import SearchPanel from './SearchPanel.js';
import SubscriptionsPanel from './SubscriptionsPanel.js';
import NewReleasesSection from './NewReleasesSection.js';

function App() {
  const [showLinksModal, setShowLinksModal] = useState(null);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const backendUrl = new URL('http://localhost:3001/api/new-releases');

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
      <div className="side-panels">
        <SearchPanel/>
        <SubscriptionsPanel/>
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
