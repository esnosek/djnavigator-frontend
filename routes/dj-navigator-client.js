import 'dotenv/config'

const url = "http://" + process.env.DJ_NAVIGATOR_BACKEND_HOST + ":" + process.env.DJ_NAVIGATOR_BACKEND_PORT

async function spotifySearch(query) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/spotify/search?query=" + query + "&limit=10", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function addSpotifyAlbum(spotifyAlbumId) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/spotify-albums?id=" + spotifyAlbumId, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function getSpotifyAlbum(spotifyAlbumId) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/spotify/albums/" + spotifyAlbumId, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function addSpotifyTrack(spotifyTrackId) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/spotify-tracks?id=" + spotifyTrackId, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function getSpotifyTrack(spotifyTrackId) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/spotify/tracks/" + spotifyTrackId, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function getAlbums() {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/albums", options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function getAlbum(albumId) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/albums/" + albumId, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function deleteAlbum(albumId) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/albums/" + albumId, options)
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function deleteTrack(trackId) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/tracks/" + trackId, options)
        .catch((err) => {
            console.log("error occurred", err)
        });
}

async function getMix(staticTrackId, dynamicTrackId) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    return fetch(url + "/api/mix?staticTrackId=" + staticTrackId + "&dynamicTrackId=" + dynamicTrackId)
        .then((res) => res.json())
        .catch((err) => {
            console.log("error occurred", err)
        });
}

export {
    spotifySearch,
    addSpotifyAlbum,
    getSpotifyAlbum,
    addSpotifyTrack,
    getSpotifyTrack,
    getAlbums,
    getAlbum,
    deleteAlbum,
    deleteTrack,
    getMix
}