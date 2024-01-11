import '../style/NewRelease.css';
import { useState } from "react";
import { ColorExtractor } from 'react-color-extractor';

function NewRelease({name, type, artist, albumCoverURL, onGetLinks}) {
    const [imgColors, setImgColors] = useState([]);
    const containerStyle = {
        background: `linear-gradient(${imgColors[0]}, ${imgColors[1]}, ${imgColors[2]}, ${imgColors[3]}, ${imgColors[5]})`
    }

    return (
			<div className="new-release-container" style={containerStyle}>
					<ColorExtractor getColors={colors => setImgColors(colors)}>
							<img className="new-release-img" src={albumCoverURL} alt="TODO"/>
					</ColorExtractor>
					<p>{name}</p>
					<p>{type} by {artist}</p>
					<a
							href=""
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