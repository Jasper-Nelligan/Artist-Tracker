import '../style/Artist.css';
import blankProfilePic from '../images/blank-profile-picture.png';

function Artist({showSubscribeBtn, name, images}) {
    const image = images && images.length !== 0 ? images[0].url : blankProfilePic;
    
    return(
        <div className="artist-entry">
            <div className="align">
                <img className="artist-pfp" src={image} alt={`${name} profile picture`}/>
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