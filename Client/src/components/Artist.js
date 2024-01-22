import '../style/Artist.css';
import blankProfilePic from '../images/blank-profile-picture.png';

function Artist({showSubscribeBtn, name, images, addArtist}) {
    const image = images && images.length !== 0 ? images[0].url : blankProfilePic;

    const onSubscribe = () => {
        addArtist(name);
    }
    
    return(
        <div className="artist-entry">
            <div className="align">
                <img className="artist-pfp" src={image} alt={`${name}`}/>
                <p>{name}</p>
            </div>
            {
                showSubscribeBtn &&
                <button className="subscribe-btn" onClick={() => onSubscribe()}>Subscribe</button>
            }
        </div>
    )
}

export default Artist;