import "@babel/polyfill";
let mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

describe("Playlist API", () => {
  const testPlaylist = {
    title: "test playlist"
  };

  const updatedTestPlaylist = {
    title: "test playlist updated"
  };

  const baseUrl = "/api/playlists";
  const dummyId = mongoose.Types.ObjectId();
  let testPlaylistId;
  afterAll(() => {
    mongoose.disconnect();
  });

  describe("GET /api/playlists", () => {
    it("should be successful", async () => {
      const response = await request(app).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /api/playlists", () => {
    it("should be successful", async () => {
      const response = await request(app)
        .post(baseUrl)
        .send(testPlaylist);

      // keep track of new id to reference in other tests
      testPlaylistId = response.body._id;

      expect(response.status).toBe(201);
      expect(response.body._id).toBeDefined();
      expect(response.body.songs).toMatchObject([]);
    });

    it("should fail when the request is missing fields", async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Playlist validation failed: title: Path `title` is required."
      );
    });
  });

  describe("GET /api/playlists/:id", () => {
    it("should be successful", async () => {
      const response = await request(app).get(`${baseUrl}/${testPlaylistId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        ...testPlaylist,
        songs: [],
        _id: testPlaylistId,
        __v: 0
      });
    });

    it("should fail when document doesn't exist", async () => {
      const response = await request(app).get(`${baseUrl}/${dummyId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("playlist not found");
    });
  });

  describe("PUT /api/playlists/:id", () => {
    it("should be successful", async () => {
      const response = await request(app)
        .put(`${baseUrl}/${testPlaylistId}`)
        .send(updatedTestPlaylist);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        ...updatedTestPlaylist,
        songs: [],
        _id: testPlaylistId,
        __v: 1
      });
    });

    it("should fail when document doesn't exist", async () => {
      const response = await request(app)
        .put(`${baseUrl}/${dummyId}`)
        .send(testPlaylist);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("playlist to update not found");
    });

    it("should fail when the request is missing fields", async () => {
      const response = await request(app)
        .put(`${baseUrl}/${testPlaylistId}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Playlist validation failed: title: Path `title` is required."
      );
    });
  });

  describe("DELETE /api/playlists/:id", () => {
    it("should be successful", async () => {
      const response = await request(app).delete(
        `${baseUrl}/${testPlaylistId}`
      );

      expect(response.status).toBe(204);
      expect(response.body).toMatchObject({});
    });

    it("should fail when document doesnt exist", async () => {
      const response = await request(app).delete(`${baseUrl}/${dummyId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("playlist to delete not found");
    });
  });
});
