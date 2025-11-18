import express from "express";
import * as songsController from './songs.controller';

let router = express.Router();

router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getOneSong);
router.post('/', songsController.addSong);
router.put('/:id', songsController.updateSong);
router.delete('/:id', songsController.deleteSong);

export {router}