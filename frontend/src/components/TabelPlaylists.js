import { useState, useEffect } from 'react';
import { get, getQuery, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routeGetPlaylists, routeGetPlaylistsFilter, routeGetPlaylistsSorted, routeDeletePlaylist, routeExportPlaylistsFull } from '../ApiRoutes.js';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Grid, TextField, Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from "@material-ui/core";

export default function TabelPlaylists() {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const [filtrare, setFiltrare] = useState({
        PlaylistDescription: "",
        PlaylistDate: ""
    });

    useEffect(async () => {
        let data = await get(routeGetPlaylists);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        setRows(data);
    }, [needToUpdate]);

    const onChangeFiltrare = e => {
        setFiltrare({ ...filtrare, [e.target.name]: e.target.value });
    }
    const filtrarePlaylists = async () => {
        let data = await getQuery(routeGetPlaylistsFilter, filtrare.PlaylistDescription, filtrare.PlaylistDate);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        setRows(data);
    }

    const sortare = async () => {
        let data = await get(routeGetPlaylistsSorted);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        setRows(data);
    }

    const exporta = async () => {
        let data = await get(routeExportPlaylistsFull);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
    }
    const deletePlaylist = async (id, index) => {
        let data = await remove(routeDeletePlaylist, id);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }

        rows.splice(index, 1);
        setRows(rows);
        setNeedToUpdate(!needToUpdate);
    }

    return (
        <div style={{ backgroundColor: 'lightblue' }}>
            <Grid container spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">

                <Grid container item spacing={1} xs={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center">

                    <TextField
                        margin="dense"
                        id="PlaylistDescription"
                        name="PlaylistDescription"
                        label="Filtrare dupa description"
                        fullWidth
                        value={filtrare.PlaylistDescription}
                        onChange={e => onChangeFiltrare(e)}
                    />
                    <TextField
                        margin="dense"
                        id="PlaylistDate"
                        name="PlaylistDate"
                        label="Filtrare dupa data"
                        fullWidth
                        value={filtrare.PlaylistDate}
                        onChange={e => onChangeFiltrare(e)}
                    />
                    <Button color="primary" variant='contained' onClick={() => filtrarePlaylists()}>
                        Filtrare
                    </Button>
                    <br />
                    <Button color="primary" variant='contained' onClick={() => {
                        setNeedToUpdate(!needToUpdate);
                        filtrare.PlaylistDescription = "";
                        filtrare.PlaylistDate = "";
                    }}>
                        Sterge filtrare
                    </Button>

                </Grid>

                <Grid item xs={2}>
                    <Button color="primary" variant='contained' startIcon={<AddIcon />} onClick={() => navigate('/formularPlaylist')}>
                        Adauga Playlist
                    </Button >
                </Grid>

                <Grid item xs={2}>
                    <Button color="primary" variant='contained' onClick={() => sortare()}>
                        Sorteaza dupa data
                    </Button >
                </Grid>

                <Grid item xs={2}>
                    <Button color="primary" variant='contained' onClick={() => exporta()}>
                        Exporta playlists
                    </Button >
                </Grid>
            </Grid>

            <br />

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: 'orange' }}>
                        <TableRow>
                            <TableCell style={{ fontSize: '14pt', borderRight: "1px solid black" }} > ID playlist</TableCell>
                            <TableCell style={{ fontSize: '14pt', borderRight: "1px solid black" }} align="center">Descriere playlist</TableCell>
                            <TableCell style={{ fontSize: '14pt', borderRight: "1px solid black" }} align="center">Data playlist</TableCell>
                            <TableCell style={{ fontSize: '14pt', borderRight: "1px solid black" }} align="center">Songs</TableCell>
                            <TableCell style={{ fontSize: '14pt', borderRight: "1px solid black" }} align="center">Actiuni playlist</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.PlaylistID}>
                                <TableCell component="th" scope="row">
                                    {row.PlaylistID}
                                </TableCell>
                                <TableCell align="center">{row.PlaylistDescription}</TableCell>
                                <TableCell align="center">{row.PlaylistDate}</TableCell>
                                <TableCell align="center">
                                    <Button color="primary" variant='contained' startIcon={<AddIcon />} onClick={() => navigate(`/formularSong/${row.PlaylistID}`)}>
                                        Adauga song
                                    </Button>
                                    <br /> <br />
                                    <Button color="primary" variant='contained' onClick={() => navigate(`/tabelSongs/${row.PlaylistID}`)}>
                                        Vezi songs
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/formularPlaylist/${row.PlaylistID}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deletePlaylist(row.PlaylistID, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}