import './NewRelease.css';
import albumCover from './images/OK_Orchestra Album Cover.png'

function NewRelease() {
    return (
        <div className="new-release-container">
            <img className="new-release-img" src={albumCover} alt="TODO"/>
            <p>Hello World</p>
        </div>
    )
}

export default NewRelease;