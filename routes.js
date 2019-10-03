import * as songs from './api/songs';


export default function(app) {
  app.use('/api/songs', songs.router);
  
}