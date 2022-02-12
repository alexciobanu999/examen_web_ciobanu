import express from 'express';
import { getPlaylistsFull, getPlaylists, getPlaylistByID, getPlaylistsFilter, getPlaylistsSortedByDate, exportPlaylistsFull, createPlaylist, updatePlaylist, deletePlaylist } from '../logic/PlaylistLogic.js';

const router = express.Router();

router.route('/getPlaylistsFull').get(async (req, res) => {
    try {
        res.status(200).json(await getPlaylistsFull());
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/getPlaylists').get(async (req, res) => {
    try {
        res.status(200).json(await getPlaylists());
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/getPlaylistByID/:idPlaylist').get(async (req, res) => {
    try {
        res.status(200).json(await getPlaylistByID(req.params.idPlaylist));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/getPlaylistsFilter').get(async (req, res) => {
    try {
        res.status(200).json(await getPlaylistsFilter(req.query));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/getPlaylistsSortedByDate').get(async (req, res) => {
    try {
        res.status(200).json(await getPlaylistsSortedByDate());
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/exportPlaylistsFull').get(async (req, res) => {
    try {
        await exportPlaylistsFull();
        res.download("./playlists_full.json", "downloadPlaylistsFull.json");
    } catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/createPlaylist').post(async (req, res) => {
    try {
        res.status(201).json(await createPlaylist(req.body));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/updatePlaylist/:idPlaylist').put(async (req, res) => {
    try {
        res.status(200).json(await updatePlaylist(req.params.idPlaylist, req.body));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/deletePlaylist/:idPlaylist').delete(async (req, res) => {
    try {
        res.status(200).json(await deletePlaylist(req.params.idPlaylist));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

export default router;