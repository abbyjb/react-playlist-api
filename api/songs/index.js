import express from "express";
import * as songsController from './songs.controller';

let router = express.Router();

router.get('/', songsController.getAllSongs);

export {router}