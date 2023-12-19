require('dotenv').config();
var http = require('http');
const { stringify } = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

http.createServer(async function (req, res) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(await getAccessToken());

    const artistId = await getArtistId('AJR');

    const latestReleases = await getLatestReleases('2022-07-06', artistId);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(latestReleases))
    res.end();
}).listen(8080);

/**
 * Returns a promise containing access token
 */
async function getAccessToken() {
    return spotifyApi.clientCredentialsGrant().then(
        function(data) {
            return data.body['access_token'];
        },
        function(err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
}

/**
 * Returns a promise containing the artist's id
 * @param {String} artist 
 */
async function getArtistId(artist) {
    return spotifyApi.searchArtists(artist).then(
        function(data) {
            return(data.body.artists.items[0].id);
    },  function(err) {
            console.error(err);
    });
}

// '2022-07-29'
async function getLatestReleases(lastDateChecked, artistId) {
    // const currentDate = getCurrentDate();

    // Get artist's releases
    const releases = await spotifyApi.getArtistAlbums(artistId).then(
        async function(data) {
            return data.body.items;
        },
        function(err) {
            console.error(err);
        }
    )

    const newReleases = [];

    // TODO what happens when release date precision is less than a day?
    releases.forEach(release => {
        if (release.release_date > lastDateChecked) {
            newReleases.push(release)
        }
    });

    return newReleases;
}

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return(yyyy + '-' + mm + '-' + dd);
}

