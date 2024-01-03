import './NewReleaseDate.css'

function NewReleaseDate({date}) {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });

    return (
        <div className="new-releases-date">
            <p>{month + " " + dateObj.getDay() + ", " + dateObj.getFullYear()}</p>
        </div>
    )
}

export default NewReleaseDate;