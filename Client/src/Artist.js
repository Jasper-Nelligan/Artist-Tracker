import './Artist.css';
import AJR_PFP from "./images/AJR.jpg";

function Artist() {
    return(
        <div className="artist-entry">
            <div className="align">
                <img className="artist-pfp" src={AJR_PFP} alt="AJR Profile Pic"/>
                <p>AJR</p>
            </div>
            <button className="subscribe-btn">Subscribe</button>
        </div>
    )
}

export default Artist;