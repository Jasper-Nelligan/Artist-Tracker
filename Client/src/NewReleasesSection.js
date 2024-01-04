import React from "react";
import NewRelease from "./NewRelease";
import NewReleaseDate from "./NewReleaseDate";
import './NewReleasesSection.css';

function NewReleasesSection({newReleases}) {
    let sections = [];
    if (newReleases.length > 0) {
        console.log(newReleases[0])
        let elements = [createNewReleaseElement(newReleases[0])];
        for (let i = 1; i < newReleases.length; i++) {
            console.log(newReleases[i])
            if (newReleases[i].release_date === newReleases[i-1].release_date || elements.length === 0) {
                elements.push(createNewReleaseElement(newReleases[i]));
            } else {
                sections.push(createNewSection(elements, newReleases[i-1]))
                elements = [];
                i--;
            }
        }
    }
    return sections;
}

function createNewReleaseElement(newRelease) {
    let {name, album_type, artists, images} = newRelease;
    let release = <NewRelease
        name={name}
        type={album_type}
        artist={artists[0].name}
        albumCoverURL={images[0].url}/>
    return release;
}

function createNewSection(newReleaseElements, newRelease) {
    let {release_date} = newRelease;
    let elements = [];
    elements.push(<NewReleaseDate date={release_date}/>)

    let grid = React.createElement(
        "div",
        {
            className: "new-releases-grid"
        },
        newReleaseElements
    )
    elements.push(grid)

    const newSection = React.createElement(
        "div",
        {
            className: "new-releases-section"
        },
        elements
    )

    return newSection;
}

export default NewReleasesSection;