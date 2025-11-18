import * as songs from './api/songs';
import * as playlists from './api/playlists';

export default function(app) {
  app.use('/api/playlists', playlists.router);
  app.use('/api/songs', songs.router);
}