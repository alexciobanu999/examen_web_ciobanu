import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Song = db.define("Song", {
    SongID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    SongTitle: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 200],
                msg: "Song title should contain 5 to 200 characters!"
            }
        },
        allowNull: false
    },
    SongURL: {
        type: Sequelize.STRING,
        validate: {
            isUrl: {
                msg: "Song URL should be a valid URL!"
            }
        },
        allowNull: false
    },
    SongStyle: {
        type: Sequelize.STRING,
        values: ['Pop', 'Alternative', 'Rock', 'EDM', 'Jazz', 'Trap'],
        validate: {
            isIn: {
                args: [['Pop', 'Alternative', 'Rock', 'EDM', 'Jazz', 'Trap']],
                msg: "Song style must be Pop/Alternative/Rock/EDM/Jazz/Trap!"
            }
        },
        allowNull: false
    },
    PlaylistID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Song;