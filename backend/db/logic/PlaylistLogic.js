import Playlist from '../entities/Playlist.js';

import LikeOperator from '../Operators.js';
import moment from 'moment';

import fs from 'fs';
'use strict';

async function getPlaylistsFull() {
    return await Playlist.findAll({ include: ["Songs"] });
}

async function getPlaylists() {
    return await Playlist.findAll();
}

async function getPlaylistByID(idPlaylist) {
    return await Playlist.findByPk(idPlaylist);
}

async function getPlaylistsFilter(filterQuery) {
    let whereClause = {};

    if (filterQuery.description)
        whereClause.PlaylistDescription = { [LikeOperator]: `%${filterQuery.description}%` };
    if (filterQuery.date)
        whereClause.PlaylistDate = { [LikeOperator]: `%${filterQuery.date}%` }; //nu merge, probabil compara STRING cu DATE
    //trebuie ceva cu moment() si sa foloseasca toString sau format al DATE-ului din baza de date..

    return await Playlist.findAll({
        where: whereClause
    })
}


async function getPlaylistsSortedByDate() {
    return await Playlist.findAll({
        order: [
            ["PlaylistDate", "DESC"]
        ]
    });
}

async function exportPlaylistsFull() {
    // if (!fs.existsSync("../exported"))
    //     fs.mkdirSync("../exported")
    fs.writeFileSync("./playlists_full.json", JSON.stringify(await getPlaylistsFull()));
}

async function createPlaylist(playlist) {
    return await Playlist.create(playlist);
}

async function updatePlaylist(idPlaylist, updatedPlaylist) {
    if (parseInt(idPlaylist) !== updatedPlaylist.PlaylistID)
        return { hasErrors: true, message: "Entity id diff!" };

    let playlist = await getPlaylistByID(idPlaylist);

    if (!playlist)
        return { hasErrors: true, message: "No playlist found with this id!" };

    return await playlist.update(updatedPlaylist);
}

async function deletePlaylist(idPlaylist) {
    let playlistToBeDeleted = await getPlaylistByID(idPlaylist);

    if (!playlistToBeDeleted)
        return { hasErrors: true, message: "No playlist found with this id!" };

    return await playlistToBeDeleted.destroy();
}


export { getPlaylistsFull, getPlaylists, getPlaylistByID, getPlaylistsFilter, getPlaylistsSortedByDate, exportPlaylistsFull, createPlaylist, updatePlaylist, deletePlaylist };