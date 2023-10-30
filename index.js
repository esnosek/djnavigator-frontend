import express from 'express'
import bodyParser from 'body-parser'
import * as collectionController from './routes/collection-controller.js'

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'pug')
app.set('views', './views')

const __dirname = "."

app.use('product/scripts', express.static(__dirname + "/public/scripts"));
app.use('/scripts', express.static(__dirname + "/public/scripts"));
app.use('product/styles', express.static(__dirname + "/public/styles"));
app.use('/styles', express.static(__dirname + "/public/styles"));

app.get('/', collectionController.index);
app.get('/spotify-search', collectionController.spotifySearch);
app.post('/spotify/albums', collectionController.addSpotifyAlbum);
app.post('/spotify-tracks', collectionController.addSpotifyTrack);
app.get('/spotify/albums/:spotifyAlbumId', collectionController.getSpotifyAlbum);
app.get('/spotify/tracks/:spotifyTrackId', collectionController.getSpotifyTrack);
app.get('/albums/:albumId', collectionController.getAlbum);
app.delete('/albums/:albumId', collectionController.deleteAlbum);
app.delete('/tracks/:albumId/:trackId', collectionController.deleteTrack);
app.get('/mix', collectionController.getMix);

app.listen(process.env.NODE_PORT, process.env.NODE_HOST, async function () {
    console.log(`App is listening on port ${process.env.NODE_PORT}...`)
})
