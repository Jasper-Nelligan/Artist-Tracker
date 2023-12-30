import './NewRelease.css';
import { useState } from "react";
import albumCover from './images/OK_Orchestra Album Cover.png';
import { ColorExtractor } from 'react-color-extractor';

function NewRelease() {
    const [imgColor, setImgColor] = useState();

    console.log(imgColor);
    return (
        <div className="new-release-container">
            <ColorExtractor getColors={colors => setImgColor(colors)}>
                <img className="new-release-img" src={albumCover} alt="TODO"/>
            </ColorExtractor>
            <p>OK Orchestra</p>
            <p>Album by AJR</p>
            <p>Get links</p>
        </div>
    )
}

export default NewRelease;