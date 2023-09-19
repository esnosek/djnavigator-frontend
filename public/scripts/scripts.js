function addAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("POST", 'spotify-albums');
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function() {
        if (this.status === 200){
            document.getElementById("all-collection-albums-right").innerHTML = this.response;
            document.getElementById("all-collection-albums-left").innerHTML = this.response;
            Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);
        }
    };
    console.log("add spotify album " + event.srcElement.id)
    http.send(JSON.stringify({spotifyAlbumId : event.srcElement.id}));
}

function getSpotifyAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'spotify/albums/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function() {
        if (this.status === 200){
            document.getElementById("spotify-album").innerHTML = this.response;
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
    http.onload = function() {
        if (this.status === 200){
            document.getElementById("all-collection-albums-left").innerHTML = this.response;
            document.getElementById("all-collection-albums-right").innerHTML = this.response;
            Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);
        }
    };
    console.log("add spotify track " + event.srcElement.id)
    http.send(JSON.stringify({spotifyTrackId : event.srcElement.id}));
}

function getSpotifyTrack(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'spotify/tracks/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function() {
        if (this.status === 200){
            document.getElementById("spotify-track").innerHTML = this.response;
            Array.from(document.getElementsByClassName('addTrackButton')).forEach(e => e.onclick = addTrack);
        }
    };
    console.log("get spotify album " + event.srcElement.id)
    http.send()
}

function getAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'albums/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function() {
        if (this.status === 200){
            console.log("parent element id: " + event.srcElement.parentElement.parentElement.parentElement.id)
            if(event.srcElement.parentElement.parentElement.parentElement.id === "all-collection-albums-left"){
                console.log("present album on left side")
                document.getElementById("album-view-left").innerHTML = this.response;
            }
            if(event.srcElement.parentElement.parentElement.parentElement.id === "all-collection-albums-right"){
                console.log("present album on right side")
                document.getElementById("album-view-right").innerHTML = this.response;
            }
        }
    };
    console.log("get album " + event.srcElement.id)
    http.send(JSON.stringify({albumId : event.srcElement.id}));
}

Array.from(document.getElementsByClassName('addAlbumButton')).forEach(e => e.onclick = addAlbum);
Array.from(document.getElementsByClassName('addTrackButton')).forEach(e => e.onclick = addTrack);
Array.from(document.getElementsByClassName('albumImageOnSearchResult')).forEach(e => e.onclick = getSpotifyAlbum);
Array.from(document.getElementsByClassName('trackImageOnSearchResult')).forEach(e => e.onclick = getSpotifyTrack);
Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);