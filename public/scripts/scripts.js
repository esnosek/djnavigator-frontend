function addAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("POST", 'spotify/albums');
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        if (this.status === 200) {
            document.getElementById("all-collection-albums-right").innerHTML = this.response;
            document.getElementById("all-collection-albums-left").innerHTML = this.response;
            Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);
        }
    };
    console.log("add spotify album " + event.srcElement.id)
    http.send(JSON.stringify({spotifyAlbumId: event.srcElement.id}));
}

function getSpotifyAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'spotify/albums/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        if (this.status === 200) {
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
    http.onload = function () {
        if (this.status === 200) {
            document.getElementById("all-collection-albums-left").innerHTML = this.response;
            document.getElementById("all-collection-albums-right").innerHTML = this.response;
            Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);
        }
    };
    console.log("add spotify track " + event.srcElement.id)
    http.send(JSON.stringify({spotifyTrackId: event.srcElement.id}));
}

function getSpotifyTrack(event) {
    const http = new XMLHttpRequest();
    http.open("GET", 'spotify/tracks/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        if (this.status === 200) {
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
    http.onload = function () {
        if (this.status === 200) {
            console.log("parent element id: " + event.srcElement.parentElement.parentElement.parentElement.id)
            if (event.srcElement.parentElement.parentElement.parentElement.id === "all-collection-albums-left") {
                console.log("present album on left side")
                document.getElementById("album-view-left").innerHTML = this.response;
                Array.from(document.getElementsByClassName('deleteAlbumButton')).forEach(e => e.onclick = deleteAlbum);
                Array.from(document.getElementsByClassName('deleteTrackButton')).forEach(e => e.onclick = deleteTrack);
                Array.from(document.getElementsByName('radioName')).forEach(e => e.onchange = updatePitch);
            }
            if (event.srcElement.parentElement.parentElement.parentElement.id === "all-collection-albums-right") {
                console.log("present album on right side")
                document.getElementById("album-view-right").innerHTML = this.response;
                Array.from(document.getElementsByClassName('deleteAlbumButton')).forEach(e => e.onclick = deleteAlbum);
                Array.from(document.getElementsByClassName('deleteTrackButton')).forEach(e => e.onclick = deleteTrack);
                Array.from(document.getElementsByName('radioName')).forEach(e => e.onchange = updatePitch);
            }
        }
    };
    console.log("get album " + event.srcElement.id)
    http.send();
}

function deleteAlbum(event) {
    const http = new XMLHttpRequest();
    http.open("DELETE", 'albums/' + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        if (this.status === 200) {
            document.getElementById("all-collection-albums-left").innerHTML = this.response;
            document.getElementById("all-collection-albums-right").innerHTML = this.response;
            Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);
            event.srcElement.parentElement.parentElement.innerHTML = ""
        }
    };
    console.log("delete album " + event.srcElement.id)
    http.send();
}

function deleteTrack(event) {
    const http = new XMLHttpRequest();
    http.open("DELETE", 'tracks/' + event.srcElement.parentElement.id + "/" + event.srcElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        if (this.status === 200) {
            event.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = this.response
            Array.from(document.getElementsByClassName('deleteAlbumButton')).forEach(e => e.onclick = deleteAlbum);
            Array.from(document.getElementsByClassName('deleteTrackButton')).forEach(e => e.onclick = deleteTrack);
        }
    };
    console.log("delete track " + event.srcElement.id)
    http.send();
}

function updatePitch(event) {
    console.log("pitch settings change " + event.srcElement.id)
    Array.from(document.getElementsByName('pitchSetting'))
        .forEach(e => changePitchFor(event.srcElement.id, e))
}

function changePitchFor(staticTrackId, dynamicElement) {
    console.log("staticTrackId: " + staticTrackId + " dynamicElement: " + dynamicElement.id)
    const http = new XMLHttpRequest();
    http.open("GET", 'mix?staticTrackId=' + staticTrackId + '&dynamicTrackId=' + dynamicElement.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        console.log("status: " + this.status)
        if (this.status === 200) {
            console.log("response: " + this.response)
            dynamicElement.innerHTML = this.response
        }
    };
    http.send();
}

function checkMe(event, radioId) {
    Array.from(document.getElementsByTagName('tr'))
        .forEach(e => e.removeAttribute("style"))
    event.removeAttribute("style")
    Array.from(document.getElementsByName('radioName'))
        .filter(e => e.id === radioId)
        .forEach(e => {
                e.click()
                event.style.backgroundColor = "#B28C00"
            }
        );
}

Array.from(document.getElementsByClassName('addAlbumButton')).forEach(e => e.onclick = addAlbum);
Array.from(document.getElementsByClassName('addTrackButton')).forEach(e => e.onclick = addTrack);
Array.from(document.getElementsByClassName('albumImageOnSearchResult')).forEach(e => e.onclick = getSpotifyAlbum);
Array.from(document.getElementsByClassName('trackImageOnSearchResult')).forEach(e => e.onclick = getSpotifyTrack);
Array.from(document.getElementsByClassName('allAlbumsImage')).forEach(e => e.onclick = getAlbum);
Array.from(document.getElementsByName('radioName')).forEach(e => e.onchange = updatePitch);