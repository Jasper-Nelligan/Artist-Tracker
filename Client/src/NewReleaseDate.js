import './NewReleaseDate.css'

function NewReleaseDate({date}) {
    console.log(date)
    var [YYYY, MM, DD] = date.split('-')
    // Subtract 1 from month since JavaScript counts months from 0
    var dateObj = new Date(YYYY, MM - 1, DD);
    const month = dateObj.toLocaleString('default', { month: 'long' });

    return (
        <div className="new-releases-date">
            <p>{month + " " + dateObj.getDate() + ", " + dateObj.getFullYear()}</p>
        </div>
    )
}

export default NewReleaseDate;