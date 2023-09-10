import * as djNavigatorClient from "./dj-navigator-client.js"

async function index(req, res) {
    res.render('index', {
        albums: [],
        tracks: []
    });
}

async function spotifySearch(req, res) {
    djNavigatorClient.spotifySearch(req.query.query)
        .then(data => {console.log(data); return data})
        .then(result => {
            res.render('index', {
                spotifySearch: true,
                albums: result.albums,
                tracks: result.tracks
            });
        })
}

async function albumsSearch(req, res) {
    djNavigatorClient.albumsSearch(req.query.query)
        .then(data => {console.log(data); return data})
        .then(result => {
            res.render('index', {
                collectionSearch: true,
                album: result,
            });
        })
}


async function addSpotifyAlbum(req, res) {
    console.log(req.body.spotifyAlbumId)
    djNavigatorClient.addSpotifyAlbum(req.body.spotifyAlbumId)
        .then(data => {console.log(data); return data})
        .then(result => {
            res.json(result)
        })
}

async function getSpotifyAlbum(req, res) {
    djNavigatorClient.getSpotifyAlbum(req.params['spotifyAlbumId'])
        .then(data => {console.log(data); return data})
        .then(result => {
            res.render('album-view', {
                album: result
            });
        })
}
async function addSpotifyTrack(req, res) {
    console.log(req.body.spotifyTrackId)
    djNavigatorClient.addSpotifyTrack(req.body.spotifyTrackId)
        .then(data => {console.log(data); return data})
        .then(result => {
            res.json(result)
        })
}

async function getSpotifyTrack(req, res) {
    djNavigatorClient.getSpotifyTrack(req.params['spotifyTrackId'])
        .then(data => {console.log(data); return data})
        .then(result => {
            res.render('track-view', {
                track: result
            });
        })
}

export {
    index,
    spotifySearch,
    albumsSearch,
    addSpotifyAlbum,
    getSpotifyAlbum,
    addSpotifyTrack,
    getSpotifyTrack
}
