import router from './PlaylistRoutes.js';
import { getSongs, getSongsByPlaylist, getSongByPlaylist, createSong, updateSong, deleteSong } from '../logic/SongLogic.js';

router.route('/getSongs').get(async (req, res) => {
    try {
        res.status(200).json(await getSongs());
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/getSongsByPlaylist/:idPlaylist').get(async (req, res) => {
    try {
        res.status(200).json(await getSongsByPlaylist(req.params.idPlaylist));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/getSongByPlaylist/:idPlaylist/:idSong').get(async (req, res) => {
    try {
        res.status(200).json(await getSongByPlaylist(req.params.idPlaylist, req.params.idSong));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/createSong/:idPlaylist').post(async (req, res) => {
    try {
        res.status(201).json(await createSong(req.body, req.params.idPlaylist));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/updateSong/:idPlaylist/:idSong').put(async (req, res) => {
    try {
        res.status(200).json(await updateSong(req.params.idPlaylist, req.params.idSong, req.body));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

router.route('/deleteSong/:idPlaylist/:idSong').delete(async (req, res) => {
    try {
        res.status(200).json(await deleteSong(req.params.idPlaylist, req.params.idSong));
    }
    catch (err) {
        res.status(500).json({ hasErrors: true, message: err.message })
    }
})

export default router;