import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate, useParams } from 'react-router-dom';
import { routePostSong, routePutSong, routeGetSongByPlaylist, routeGetPlaylistByID } from '../ApiRoutes.js';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormularSong() {

    const navigate = useNavigate();
    const routerParams = useParams();
    const idPlaylist = routerParams.idPlaylist;
    const idSong = routerParams.idSong;

    const [song, setSong] = useState({
        SongTitle: "",
        SongURL: "",
        SongStyle: "",
        PlaylistID: parseInt(idPlaylist)
    })
    const [description, setDescription] = useState({
        PlaylistDescription: ""
    });

    useEffect(async () => {
        if (idSong) {
            let data = await get(routeGetSongByPlaylist, idPlaylist, idSong);
            if (data.hasErrors) {
                alert(data.message);
                return;
            }
            setSong(data);
        }
        let data = await get(routeGetPlaylistByID, idPlaylist);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        setDescription({ PlaylistDescription: data.PlaylistDescription });
    }, [])

    const onChangeSong = e => {
        setSong({ ...song, [e.target.name]: e.target.value });
    }

    const saveSong = async () => {
        if (!idSong) {
            let data = await post(routePostSong, song, idPlaylist);
            if (data.hasErrors) {
                alert(data.message);
                return;
            }
        } else {
            let data = await put(routePutSong, song, idPlaylist, idSong);
            if (data.hasErrors) {
                alert(data.message);
                return;
            }
        }
        navigate(`/tabelSongs/${idPlaylist}`);
    }

    return (
        <div align="center">
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start">

                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="SongTitle"
                        name="SongTitle"
                        label="Titlu song"
                        fullWidth
                        value={song.SongTitle}
                        onChange={e => onChangeSong(e)} />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        margin="dense"
                        id="SongURL"
                        name="SongURL"
                        label="URL song"
                        fullWidth
                        value={song.SongURL}
                        onChange={e => onChangeSong(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="SongStyle"
                        name="SongStyle"
                        label="Stilul song"
                        fullWidth
                        value={song.SongStyle}
                        onChange={e => onChangeSong(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="PlaylistDescription"
                        name="PlaylistDescription"
                        label="Descrierea playlistului de care apartine"
                        fullWidth
                        disabled={true}
                        value={description.PlaylistDescription}
                        onChange={e => onChangeSong(e)} />
                </Grid>
            </Grid>

            <br />

            <Button color="primary" variant='contained' startIcon={<SaveIcon />} onClick={() => saveSong()}>
                Save
            </Button>
        </div>
    )
}