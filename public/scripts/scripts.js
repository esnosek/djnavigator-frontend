function addAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("POST", 'spotify-albums');
    http.setRequestHeader("Content-Type", "application/json");
    console.log("add spotify album " + event.srcElement.id)
    http.send(JSON.stringify({spotifyAlbumId : event.srcElement.id}));
}

function getSpotifyAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'spotify/albums/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function() {
        if (this.status == 200){
            document.getElementById("left").innerHTML = this.response;
            Array.from(document.getElementsByClassName('addTrackButton')).forEach(e => e.onclick = addTrack);
            Array.from(document.getElementsByClassName('addAlbumButton')).forEach(e => e.onclick = addAlbum);
        }
    };
    console.log("get spotify album " + event.srcElement.id)
    http.send()
}

function addTrack(event) {
    const http = new XMLHttpRequest();
    http.open("POST", 'spotify-tracks');
    http.setRequestHeader("Content-Type", "application/json");
    console.log("add spotify track " + event.srcElement.id)
    http.send(JSON.stringify({spotifyTrackId : event.srcElement.id}));
}

function getSpotifyTrack(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'spotify/tracks/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function() {
        if (this.status == 200){
            document.getElementById("right").innerHTML = this.response;
        }
    };
    console.log("get spotify album " + event.srcElement.id)
    http.send()
}

Array.from(document.getElementsByClassName('addAlbumButton')).forEach(e => e.onclick = addAlbum);
Array.from(document.getElementsByClassName('addTrackButton')).forEach(e => e.onclick = addTrack);
Array.from(document.getElementsByClassName('albumImageOnSearchResult')).forEach(e => e.onclick = getSpotifyAlbum);
Array.from(document.getElementsByClassName('trackImageOnSearchResult')).forEach(e => e.onclick = getSpotifyTrack);