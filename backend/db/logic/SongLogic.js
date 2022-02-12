import Song from '../entities/Song.js';
import Playlist from '../entities/Playlist.js';
import { getPlaylistByID } from './PlaylistLogic.js';

async function getSongs() {
    return await Song.findAll();
}

async function getSongsByPlaylist(idPlaylist) {
    let playlist = await getPlaylistByID(idPlaylist);

    if (!playlist)
        return { hasErrors: true, message: "No playlist found with this id!" };

    return await Song.findAll({
        include: [{ model: Playlist, attributes: ["PlaylistDescription"], where: idPlaylist ? { PlaylistID: idPlaylist } : undefined }]
    });
}

async function getSongByPlaylist(idPlaylist, idSong) {
    let playlist = await getPlaylistByID(idPlaylist);

    if (!playlist)
        return { hasErrors: true, message: "No playlist found with this id!" };

    return await Song.findOne({
        include: [{ model: Playlist, attributes: ["PlaylistDescription"], where: idPlaylist ? { PlaylistID: idPlaylist } : undefined }],
        where: idSong ? { SongID: idSong } : undefined
    });
}

async function createSong(song, idPlaylist) {
    if (parseInt(idPlaylist) !== song.PlaylistID)
        return { hasErrors: true, message: "Entity id diff!" };

    let playlist = await getPlaylistByID(idPlaylist);

    if (!playlist)
        return { hasErrors: true, message: "No playlist found with this id!" };

    //song.PlaylistID = idPlaylist;

    return await Song.create(song);
}

async function updateSong(idPlaylist, idSong, updatedSong) {
    if (parseInt(idSong) !== updatedSong.SongID)
        return { hasErrors: true, message: "Entity id diff!" };
    if (parseInt(idPlaylist) !== updatedSong.PlaylistID)
        return { hasErrors: true, message: "Entity id diff!" };

    let playlist = await getPlaylistByID(idPlaylist);

    if (!playlist)
        return { hasErrors: true, message: "No playlist found with this id!" };

    let song = await getSongByPlaylist(idPlaylist, idSong);

    if (!song)
        return { hasErrors: true, message: "No song found with this id in this playlist!" };

    return await song.update(updatedSong);
}

async function deleteSong(idPlaylist, idSong) {
    let playlist = await getPlaylistByID(idPlaylist);

    if (!playlist)
        return { hasErrors: true, message: "No playlist found with this id!" };

    let songToBeDeleted = await getSongByPlaylist(idPlaylist, idSong);

    if (!songToBeDeleted)
        return { hasErrors: true, message: "No song found with this id in this playlist!" };

    return await songToBeDeleted.destroy();
}

export { getSongs, getSongsByPlaylist, getSongByPlaylist, createSong, updateSong, deleteSong };


