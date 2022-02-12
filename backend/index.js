import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './db/routes/SongRoutes.js'; //contains both Playlist and Song routes

//import createDB from './db/createDB.js';
import addFKconstraints from './db/AddForeignKey.js';
import db from './db/dbConfig.js';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));     //pentru heroku
app.use("/api", router);

//createDB();
addFKconstraints();

//pentru heroku
router.route('/').get(async (req, res) => {
    let path = path.resolve();
    res.sendFile(path.join(path, "build", "Index.html"));
});

let port = process.env.PORT || 8000;
app.listen(port, async () => {
    await db.sync({ alter: true });
    console.log("Baza de date sincronizata cu succes!");
});
console.log("API is running at " + port);