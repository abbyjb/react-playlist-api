import {Playlist} from './playlist.model';
import { Song } from '../songs/songs.model';

module.exports = {
  getAllPlaylists: async (req, res, next) => {
    try {
      let playlists = await Playlist.find().populate({path: 'songs'});
      return res.status(200).json(playlists);
    }
    catch(error) {
      return next(error);
    }
  },
  getPlaylist: async (req, res, next) => {
    try {
      const id = req.params.id;
      
      let playlist = await Song.findById(id);

      if(playlist) {
        return res.status(200).json(playlist);
      }
      res.status(404).json({message: "playlist not found"});
    } 
    catch (error) {
      return next(error);
    }
  },
  createPlaylist: async (req, res, next) => {
    try {
      let newPlaylist = new Playlist({
        title: req.body.title,
        songs: []
      });

      let savedPlaylist = await newPlaylist.save();
      return res.status(201).json(savedPlaylist);
    }
    catch(error) {
      if(error.name === 'ValidationError'){
        return res.status(400).json({message: error.message });
       }
      return next(error);
    }
  },
  updatePlaylist: async (req, res, next) => {
    try {
      const id = req.params.id;
      
      let playlist = await Playlist.findById(id);

      if(playlist) {
        playlist.title = req.body.title;
        let savedPlaylist = await playlist.increment().save();
        return res.status(200).json(savedPlaylist);
      }
      return res.status(404).json({message: "playlist not found"});

    } 
    catch (error) {
      if (error.name === "Validation Error") {
        return res.status(400).json({message: error.message});
      }
      return next(error);
    }
  },
  deletePlaylist: async (req, res, next) => {
    try {
      const id = req.params.id;

      let playlist = await Playlist.findById(id);

      if(playlist) {
        let deletedPlaylist = await playlist.remove();
        return res.status(204).json();
      }
      return res.status(404).json({message: "playlist not found"});
    } 
    catch (error) {
      return next(error);
    }
  }
}