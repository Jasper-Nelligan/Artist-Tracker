import React from "react";
import NewRelease from "./NewRelease";
import NewReleaseDate from "./NewReleaseDate";
import './NewReleasesSection.css';

function NewReleasesSection({newReleases}) {
    let sections = [];
    if (newReleases.length > 0) {
        sections.push(createNewSection(newReleases[0]));
        for (let i = 1; i < newReleases.length; i++) {
            if (newReleases[i].release_date != newReleases[i-1].release_date) {
                sections.push(createNewSection(newReleases[i]))
            }
        }
        return sections;
    }
}

function createNewSection(newRelease) {
    let {release_date, name, album_type, artists, images} = newRelease;
    let elements = [];
    elements.push(<NewReleaseDate date={release_date}/>)
    
    let release = <NewRelease
        name={name}
        type={album_type}
        artist={artists[0].name}
        albumCoverURL={images[0].url}/>

    let grid = React.createElement(
        "div",
        {
            className: "new-releases-grid"
        },
        release
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