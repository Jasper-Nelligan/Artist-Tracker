require('dotenv').config();
var http = require('http');
var SpotifyWebApi = require('spotify-web-api-node');

var artistID;

http.createServer(async function (req, res) {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(await getAccessToken(spotifyApi));

    // Search artists whose name contains 'Love'
    spotifyApi.searchArtists('AJR').then(
        function(data) {
            artistID = data.body.artists.items[0].id;
    },  function(err) {
            console.error(err);
    });

    // Get artist's albums
    spotifyApi.getArtistAlbums(artistID).then(
        function(data) {
            console.log('Artist albums: ', data.body);
        },
        function(err) {
            console.error(err);
    })

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);

async function getAccessToken(spotifyApi) {
    return spotifyApi.clientCredentialsGrant().then(
        function(data) {
            return data.body['access_token'];
        },
        function(err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
}