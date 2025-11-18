import express from 'express';
import * as playlistController from './playlist.controller';
let router = express.Router();

router.get('/', playlistController.getAllPlaylists);
router.get('/:id', playlistController.getPlaylist);
router.post('/', playlistController.createPlaylist);
router.put('/:id', playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);

export {router}