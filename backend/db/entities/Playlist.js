import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Playlist = db.define("Playlist", {
    PlaylistID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    PlaylistDescription: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [3, 200],
                msg: "Playlist description should contain 3 to 200 characters!"
            }
        },
        allowNull: false
    },
    PlaylistDate: {
        type: Sequelize.DATE,
        validate: {
            isDate: {
                msg: "Playlist date should be YYYY-MM-DDTHH:MM:SSZ!"
            }
        },
        defaultValue: (Sequelize.NOW),
        allowNull: false
    }
});

export default Playlist;