import './NewRelease.css';
import { useState } from "react";
import albumCover from './images/OK_Orchestra Album Cover.png';
import { ColorExtractor } from 'react-color-extractor';

function NewRelease({name, type, artist, albumCoverURL}) {
    const [imgColor, setImgColor] = useState();

    return (
        <div className="new-release-container">
            <ColorExtractor getColors={colors => setImgColor(colors)}>
                <img className="new-release-img" src={albumCoverURL} alt="TODO"/>
            </ColorExtractor>
            <p>{name}</p>
            <p>{type} by {artist}</p>
            <p>Get links</p>
        </div>
    )
}

export default NewRelease;