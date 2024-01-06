import './NewRelease.css';
import { useState } from "react";
import albumCover from './images/OK_Orchestra Album Cover.png';
import { ColorExtractor } from 'react-color-extractor';

function NewRelease({name, type, artist, albumCoverURL, onGetLinks}) {
    const [imgColor, setImgColor] = useState([]);
    const containerStyle = {
        background: `linear-gradient(${imgColor[0]}, ${imgColor[1]}, ${imgColor[2]}, ${imgColor[3]}, ${imgColor[5]})`
    }

    return (
			<div className="new-release-container" style={containerStyle}>
					<ColorExtractor getColors={colors => setImgColor(colors)}>
							<img className="new-release-img" src={albumCoverURL} alt="TODO"/>
					</ColorExtractor>
					<p>{name}</p>
					<p>{type} by {artist}</p>
					<a
							onClick={(event) => {
									event.preventDefault();
									onGetLinks();
							}}
					>
							Get links
					</a>
			</div>
    )
}

export default NewRelease;