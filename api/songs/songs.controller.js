import mongoose from 'mongoose';
import Song from "./songs.model";

module.exports = {
  getAllSongs: async (req, res, next) =>{
    try {
      let songs = await Song.find();
      return res.status(200).json(songs);
    }
    catch(error) {
      next(error);
    }
  }
}