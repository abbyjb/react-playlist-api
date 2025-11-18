import express from "express";
import * as songsController from './songs.controller';

let router = express.Router();
// GET calls
router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getOneSong);

//POST call
router.post('/', songsController.addSong);

// PUT calls
router.put('/:id', songsController.updateSong);

// DELETE calls
router.delete('/:id', songsController.deleteSong);
export {router}