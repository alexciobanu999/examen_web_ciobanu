import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate, useParams } from 'react-router-dom';
import { routePostPlaylist, routeGetPlaylistByID, routePutPlaylist } from '../ApiRoutes.js';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormularPlaylist() {

    const navigate = useNavigate();

    const routerParams = useParams();
    const idPlaylist = routerParams.idPlaylist;

    const [playlist, setPlaylist] = useState({
        PlaylistDescription: "",
        PlaylistDate: ""
    })

    const onChangePlaylist = e => {
        setPlaylist({ ...playlist, [e.target.name]: e.target.value });
    }

    function deleteStateVariable(param) {
        const { [param]: tmp, ...rest } = playlist;
        setPlaylist(rest);
    }

    const savePlaylist = async () => {
        if (!playlist.PlaylistDeadline) {
            deleteStateVariable("PlaylistDate");
        }
        if (!idPlaylist) {
            let data = await post(routePostPlaylist, playlist);
            if (data.hasErrors) {
                alert(data.message);
                return;
            }
        } else {
            let data = await put(routePutPlaylist, playlist, idPlaylist);
            if (data.hasErrors) {
                alert(data.message);
                return;
            }
        }
        navigate('/');
    }

    useEffect(async () => {
        if (idPlaylist) {
            let data = await get(routeGetPlaylistByID, idPlaylist);
            if (data.hasErrors) {
                alert(data.message);
                return;
            }
            setPlaylist(data);
        }
    }, [])

    return (
        <div>
            <Grid container
                spacing={2}
                direction="column">

                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="PlaylistDescription"
                        name="PlaylistDescription"
                        label="Descriere playlist"
                        fullWidth
                        value={playlist.PlaylistDescription}
                        onChange={e => onChangePlaylist(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="PlaylistDate"
                        name="PlaylistDate"
                        label="Data playlist"
                        fullWidth
                        value={playlist.PlaylistDate}
                        onChange={e => onChangePlaylist(e)} />
                </Grid>
            </Grid>

            <br />

            <Button color="primary" variant='contained' startIcon={<SaveIcon />} onClick={() => savePlaylist()}>
                Save
            </Button>
        </div >
    )
}