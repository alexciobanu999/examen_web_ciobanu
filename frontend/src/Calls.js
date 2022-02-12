import axios from 'axios';
import { routeExportPlaylistsFull } from './ApiRoutes.js';

async function get(p_url, searchAfter1 = null, searchAfter2 = null) {
    try {
        let newUrl;
        if (searchAfter1) {
            newUrl = p_url + "/" + searchAfter1;
            if (searchAfter2) {
                newUrl = newUrl + "/" + searchAfter2;
            }
        } else {
            newUrl = p_url;
        }
        if (p_url !== routeExportPlaylistsFull)
            return (await axios.get(newUrl)).data;
        else
            window.open(routeExportPlaylistsFull);
    } catch (err) {
        return err.response.data;
    }
}
// get(routeGetPlaylistsFull)
// get(routeGetPlaylists)
// get(routeGetPlaylistByID, idPlaylist)
// get(routeGetPlaylistsSorted)
// get(routeExportPlaylistsFull)
// get(routeGetSongs)
// get(routeGetSongsByPlaylist, idPlaylist)
// get(routeGetSongByPlaylist, idPlaylist, idSong)

async function getQuery(p_url, p_description, p_date) {
    try {
        const params = new URLSearchParams({ description: p_description, date: p_date });
        let urlFilter = p_url + "?";
        return (await axios.get(`${urlFilter}${params}`)).data;
    } catch (err) {
        return err.response.data;
    }
}
// getQuery(routeGetPlaylistsFilter, description, date)

async function post(p_url, item, id = null) {
    try {
        let newUrl = id ? p_url + "/" + id : p_url;
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        return err.response.data;
    }
}
// post(routePostPlaylist, Playlist)
// post(routePostSong, song, idPlaylist)

async function put(p_url, item, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        return err.response.data;
    }
}
// put(routePutPlaylist, playlist, idPlaylist)
// put(routePutSong, song, idPlaylist, idSong)

async function remove(p_url, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.delete(newUrl)).data;
    } catch (err) {
        return err.response.data;
    }
}
// remove(routeDeletePlaylist, idPlaylist)
// remove(routeDeleteSong, idPlaylist, idSong)

export { get, getQuery, post, put, remove };