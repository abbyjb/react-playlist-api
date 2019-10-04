import {Song} from "./songs.model";

module.exports = {
  getAllSongs: async (req, res, next) =>{
    try {
      let songs = await Song.find();
      return res.status(200).json(songs);
    }
    catch(error) {
      return next(error);
    }
  },

  getOneSong: async (req, res, next) => {
    try {
      const id = req.params.id

      let song = await Song.findById(id);

      if(!song) {
        return res.status(404).json({message: "song not found"});
      }
      return res.status(200).json(song);
    }
    catch(error) {
      return next(error);
    }
  }, 

  addSong: async (req, res, next) => {
    try {
      let newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album
      });

      let savedSong = await newSong.save();
      return res.status(201).json(savedSong);
    }
    catch(error){
      if(error.name === 'ValidationError'){
        return res.status(400).json({message: error.message });
       }
      return next(error);
    }
  },

  updateSong: async (req, res, next) => {
    try {
      const id = req.params.id;

      let song = await Song.findById(id);

      if(song) {
        song.title = req.body.title;
        song.artist = req.body.artist;
        song.album = req.body.album;
        
        await song.increment().save();
        return res.status(200).json(song);
      }

      return res.status(404).json({message: "song to update not found"})

    } 
    catch (error) {
      if(error.name === 'ValidationError'){
        return res.status(400).json({message: error.message });
      }
       return next(err);
    } 
  }, 

  deleteSong: async (req, res, next) => {
    try {
      const id = req.params.id;

      let song = await Song.findById(id);

      if(song) {
        await song.remove();
        return res.status(204).send();
      }
      return res.status(404).json({message: "song to delete not found"});
    } 
    catch (error) {
      return next(error);
    }
  }
}