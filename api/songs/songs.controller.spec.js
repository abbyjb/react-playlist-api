import "@babel/polyfill";
let mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

describe("Songs API", () => {
  const testSong = {
    title: "test song",
    artist: "test artist",
    album: "test album"
  };

  const updatedTestSong = {
    title: "test song updated",
    artist: "test artist updated",
    album: "test album updated"
  }

  const baseUrl = "/api/songs";
  const dummyId = mongoose.Types.ObjectId();
  let testSongId;

  afterAll(() => {
    mongoose.disconnect();
  });

  describe("GET /api/songs", () => {
    it("should be successful", async () => {
      const response = await request(app).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /api/songs", () => {
    it("should be successful", async () => {
      const response = await request(app)
        .post(baseUrl)
        .send(testSong);

      // keep track of new id to reference in other tests
      testSongId = response.body._id;

      expect(response.status).toBe(201);
      expect(response.body._id).toBeDefined();
      expect(response.body).toStrictEqual({
        ...testSong,
        _id: testSongId,
        __v: 0
      });
    });

    it("should fail when the request is missing fields", async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ title: "something" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Song validation failed: artist: Path `artist` is required., album: Path `album` is required."
      );
    });
  });

  describe("GET /api/songs/:id", () => {
    it("should be successful", async () => {
      const response = await request(app).get(`${baseUrl}/${testSongId}`);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        ...testSong,
        _id: testSongId,
        __v: 0
      });
    });

    it("should fail when document doesn't exist", async () => {
      const response = await request(app).get(`${baseUrl}/${dummyId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("song not found");
    });
  });

  describe("PUT /api/songs/:id", () => {
    it("should be successful", async () => {
      const response = await request(app)
        .put(`${baseUrl}/${testSongId}`)
        .send(updatedTestSong);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        ...updatedTestSong,
        _id: testSongId,
        __v: 1
      });
    });

    it("should fail when document doesn't exist", async () => {
      const response = await request(app)
        .put(`${baseUrl}/${dummyId}`)
        .send(testSong);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("song to update not found");
    });

    it("should fail when the request is missing fields", async () => {
      const response = await request(app)
        .put(`${baseUrl}/${testSongId}`)
        .send({ artist: "some artist" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Song validation failed: title: Path `title` is required., album: Path `album` is required."
      );
    });
  });

  describe("DELETE /api/songs/:id", () => {
    it("should be successful", async () => {
      const response = await request(app).delete(`${baseUrl}/${testSongId}`);

      expect(response.status).toBe(204);
      expect(response.body).toMatchObject({});
    });

    it("should fail when document doesnt exist", async () => {
      const response = await request(app).delete(`${baseUrl}/${dummyId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("song to delete not found");
    });
  });
});
