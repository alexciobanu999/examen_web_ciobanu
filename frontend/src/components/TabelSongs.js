import { useState, useEffect } from 'react';
import { get, remove } from '../Calls.js';
import { useNavigate, useParams } from 'react-router-dom';
import { routeGetSongsByPlaylist, routeDeleteSong, routeGetPlaylistByID } from '../ApiRoutes.js';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from "@material-ui/core";

export default function TabelSongs() {

    const navigate = useNavigate();

    const routerParams = useParams();
    const idPlaylist = routerParams.idPlaylist;

    const [rows, setRows] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const [description, setDescription] = useState({
        PlaylistDescription: ""
    });

    useEffect(async () => {
        let data = await get(routeGetSongsByPlaylist, idPlaylist);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        let data2 = await get(routeGetPlaylistByID, idPlaylist);
        if (data2.hasErrors) {
            alert(data2.message);
            return;
        }
        setDescription({ PlaylistDescription: data2.PlaylistDescription });
        setRows(data);
    }, [needToUpdate]);

    const deleteSong = async (idSong, index) => {
        let data = await remove(routeDeleteSong, idPlaylist, idSong);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }

        rows.splice(index, 1);
        setRows(rows);
        setNeedToUpdate(!needToUpdate);
    }

    return (
        <div align="center">
            <br />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#cee5d0' }}>
                        <TableRow>
                            <TableCell style={{ borderRight: "1px solid black" }}>ID Song</TableCell>
                            <TableCell style={{ borderRight: "1px solid black" }} align="center">Titlu song</TableCell>
                            <TableCell style={{ borderRight: "1px solid black" }} align="center">URL song</TableCell>
                            <TableCell style={{ borderRight: "1px solid black" }} align="center">Stil song</TableCell>
                            <TableCell style={{ borderRight: "1px solid black" }} align="center">Descriere playlist de care apartine</TableCell>
                            <TableCell style={{ borderRight: "1px solid black" }} align="center">Actiuni song</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.SongID}>
                                <TableCell component="th" scope="row">
                                    {row.SongID}
                                </TableCell>
                                <TableCell align="center">{row.SongTitle}</TableCell>
                                <TableCell align="left">{row.SongURL}</TableCell>
                                <TableCell align="center">{row.SongStyle}</TableCell>
                                <TableCell align="center">{`${description.PlaylistDescription}`}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/formularSong/${idPlaylist}/${row.SongID}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteSong(row.SongID, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button color="primary" variant='contained' startIcon={<AddIcon />} onClick={() => navigate(`/formularSong/${idPlaylist}`)}>
                Adauga song
            </Button>
            <br />
            <br />
            <Button color="primary" variant='contained' onClick={() => navigate('/')}>
                Inapoi la playlists
            </Button>
        </div >
    )
}