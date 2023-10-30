import * as djNavigatorClient from "./dj-navigator-client.js"

async function index(req, res) {
    djNavigatorClient.getAlbums()
        .then(albums => {
            res.render('index', {
                spotifySearch: false,
                albums: albums
            })
        })
}

async function spotifySearch(req, res) {
    djNavigatorClient.getAlbums()
        .then(data => {
            console.log(data);
            return data
        })
        .then(albums => {
                djNavigatorClient.spotifySearch(req.query.query)
                    .then(data => {
                        console.log(data);
                        return data
                    })
                    .then(searchResult => {
                        res.render('index', {
                            spotifySearch: true,
                            spotifyAlbums: searchResult.albums,
                            spotifyTracks: searchResult.tracks,
                            albums: albums
                        });
                    })
            }
        )
}

async function getMix(req, res) {
    djNavigatorClient.getMix(req.query.staticTrackId, req.query.dynamicTrackId)
        .then(data => {
            console.log(req.query.staticTrackId + " " + req.query.dynamicTrackId + " " + data.val)
            return data.val.toString()
        })
        .then(result => res.send(result))
}


async function addSpotifyAlbum(req, res) {
    console.log(req.body.spotifyAlbumId)
    djNavigatorClient.addSpotifyAlbum(req.body.spotifyAlbumId)
        .then(data => {
            console.log(data);
            return data
        })
        .then(() => {
            djNavigatorClient.getAlbums()
                .then(albums => {
                    res.render('all-albums-view', {
                        albums: albums
                    })
                })
        })
}

async function getSpotifyAlbum(req, res) {
    djNavigatorClient.getSpotifyAlbum(req.params['spotifyAlbumId'])
        .then(data => {
            console.log(data);
            return data
        })
        .then(spotifyAlbum => {
            res.render('spotify-album-view', {
                spotifyAlbum: spotifyAlbum
            });
        })
}

async function addSpotifyTrack(req, res) {
    console.log(req.body.spotifyTrackId)
    djNavigatorClient.addSpotifyTrack(req.body.spotifyTrackId)
        .then(data => {
            console.log(data);
            return data
        })
        .then(() => {
            djNavigatorClient.getAlbums()
                .then(albums => {
                    res.render('all-albums-view', {
                        albums: albums
                    })
                })
        })
}

async function getSpotifyTrack(req, res) {
    djNavigatorClient.getSpotifyTrack(req.params['spotifyTrackId'])
        .then(data => {
            console.log(data);
            return data
        })
        .then(spotifyTrack => {
            res.render('spotify-track-view', {
                spotifyTrack: spotifyTrack
            });
        })
}

async function getAlbum(req, res) {
    djNavigatorClient.getAlbum(req.params['albumId'])
        .then(data => {
            console.log(data);
            return data
        })
        .then(album => {
            res.render('album-view', {
                album: album
            });
        })
}

async function deleteAlbum(req, res) {
    djNavigatorClient.deleteAlbum(req.params['albumId'])
        .then(r => {
            console.log(r);
        })
        .then(() => {
            djNavigatorClient.getAlbums()
                .then(albums => {
                    res.render('all-albums-view', {
                        albums: albums
                    })
                })
        })
}

async function deleteTrack(req, res) {
    console.log("deleted track: " + req.params['trackId'] + " from album: " + req.params['albumId'])
    djNavigatorClient.deleteTrack(req.params['trackId'])
        .then(() => {
            djNavigatorClient.getAlbum(req.params['albumId'])
                .then(album => {
                    res.render('album-view', {
                        album: album
                    })
                })
        })
}

export {
    index,
    spotifySearch,
    addSpotifyAlbum,
    getSpotifyAlbum,
    addSpotifyTrack,
    getSpotifyTrack,
    getAlbum,
    deleteAlbum,
    deleteTrack,
    getMix
}
