import '../style/SubscriptionsPanel.css';
import Artist from './Artist.js';

function SubscriptionsPanel() {
    return (
        <div className="subscriptions-box">
            <h3 className="subscriptions-title">Subscriptions</h3>
            <div className="search-results">
            </div>
        </div>
    )
}

export default SubscriptionsPanel;