
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const songSchema = Schema({
  title: {type: String, required: true},
  artist: {type: String, required: true},
  album: {type: String, required: true}
});

const Song = mongoose.model('Song', songSchema);

export {Song};

