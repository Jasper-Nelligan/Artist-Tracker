require('dotenv').config();
const express = require('express');
const cors = require("cors");
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.get("/api/new-releases/", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        spotifyApi.setAccessToken(accessToken);

        const artists = ['AJR', 'Barns Courtney'];
        let allLatestReleases = [];

        for (const artist of artists) {
            const artistId = await getArtistId(artist);
            const latestReleases = await getLatestReleases('2022-07-06', artistId);
            allLatestReleases.push(latestReleases);
        }
        
        res.status(200).json(allLatestReleases);
    } catch (error) {
        console.error('Error in /api:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/api/search-artists/", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        spotifyApi.setAccessToken(accessToken);
        
        if (req.query.searchInput) {
            const searchResults = await searchArtists(req.query.searchInput);
            res.status(200).json(searchResults);
        }
    } catch (error) {
        console.error('Error in /api:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

async function getAccessToken() {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        return data.body['access_token'];
    } catch (error) {
        console.error('Error when retrieving an access token:', error.message);
        throw error;
    }
}

async function getArtistId(artist) {
    try {
        const data = await spotifyApi.searchArtists(artist);
        return data.body.artists.items[0].id;
    } catch (error) {
        console.error('Error when retrieving artist ID:', error.message);
        throw error;
    }
}

async function searchArtists(artist) {
    try {
        const data = await spotifyApi.searchArtists(artist);
        return data.body.artists;
    } catch (error) {
        console.error('Error when searching for artist:', error.message);
        throw error;
    }
}

async function getLatestReleases(lastDateChecked, artistId) {
    try {
        const releases = await spotifyApi.getArtistAlbums(artistId);
        const newReleases = releases.body.items.filter(release => release.release_date > lastDateChecked);
        return newReleases;
    } catch (error) {
        console.error('Error when retrieving latest releases:', error.message);
        throw error;
    }
}