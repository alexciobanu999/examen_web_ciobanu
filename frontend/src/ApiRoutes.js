// const link = "http://localhost:8000/api";
const link = "https://examen-ciobanu.herokuapp.com/api";

const routeGetPlaylistsFull = link + '/getPlaylistsFull';
const routeGetPlaylists = link + '/getPlaylists';
const routeGetPlaylistByID = link + '/getPlaylistByID';  //   /:idPlaylist
const routeGetPlaylistsFilter = link + '/getPlaylistsFilter';    //    ?description=ceva&date=altceva
const routeGetPlaylistsSorted = link + '/getPlaylistsSortedByDate';
const routeExportPlaylistsFull = link + '/exportPlaylistsFull';
const routeGetSongs = link + '/getSongs';
const routeGetSongsByPlaylist = link + '/getSongsByPlaylist'; //  /:idPlaylist
const routeGetSongByPlaylist = link + '/getSongByPlaylist';    //  /:idPlaylist/:idSong

const routePostPlaylist = link + '/createPlaylist';
const routePostSong = link + '/createSong';  //   /:idPlaylist

const routePutPlaylist = link + '/updatePlaylist'; //     /:idPlaylist
const routePutSong = link + '/updateSong'; //     /:idPlaylist/:idSong

const routeDeletePlaylist = link + '/deletePlaylist'; //     /:idPlaylist
const routeDeleteSong = link + '/deleteSong'; //     /:idPlaylist/:idSong

export {
    routeGetPlaylistsFull, routeGetPlaylists, routeGetPlaylistByID, routeGetPlaylistsFilter, routeGetPlaylistsSorted, routeExportPlaylistsFull,
    routeGetSongs, routeGetSongsByPlaylist, routeGetSongByPlaylist,
    routePostPlaylist, routePostSong,
    routePutPlaylist, routePutSong,
    routeDeletePlaylist, routeDeleteSong
};