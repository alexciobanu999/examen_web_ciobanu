import Playlist from './entities/Playlist.js';
import Song from './entities/Song.js';

function addFKconstraints() {
    Playlist.hasMany(Song, { as: "Songs", foreignKey: "PlaylistID" });
    Song.belongsTo(Playlist, { foreignKey: "PlaylistID" });
}

export default addFKconstraints;