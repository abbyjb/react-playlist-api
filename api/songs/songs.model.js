
import mongoose, {Schema, model} from 'mongoose';

const ObjectId = Schema.ObjectId;
let songSchema = Schema({
  id: ObjectId, 
  title: {type: String, required: true},
  artist: {type: String, required: true},
  album: {type: String, required: true}
});

const Song = mongoose.model("song", songSchema);

export { Song }

