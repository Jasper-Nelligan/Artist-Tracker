import './Artist.css';

function Artist({showSubscribeBtn, name, images}) {
    console.log(images)
    var imageURL;
    if (images && images.length !== 0 ) {
        imageURL = images[0].url;
    }
    return(
        <div className="artist-entry">
            <div className="align">
                <img className="artist-pfp" src={imageURL} alt={`${name} profile picture`}/>
                <p>{name}</p>
            </div>
            {
                showSubscribeBtn &&
                <button className="subscribe-btn">Subscribe</button>
            }
        </div>
    )
}

export default Artist;