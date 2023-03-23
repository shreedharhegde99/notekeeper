const app = require("express").Router();
const Notes = require("../model/note.model");
const createNote = require("../controllers/createNote");
const validateNote = require("../controllers/validateNote");
const updateNote = require("../controllers/updateNote");

app.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    let skipCount = (page - 1) * 6;
    let data = await Notes.find({})
      .sort({ pinned: -1 })
      .skip(skipCount)
      .limit(6);
    res
      .status(200)
      .send({ ok: true, message: "Notes sent successfully", data });
  } catch (e) {
    console.log("ERROR IN FETCHING NOTES", e.message);
    res.status(500).send({ ok: false, message: e.message });
  }
});

app.post("/", validateNote, async (req, res) => {
  try {
    await createNote(req.body);
    res.status(201).send({ ok: true, message: "Note created successfully" });
  } catch (e) {
    console.log("ERROR IN CREATING NOTE ", e.message);
    res.status(400).send({ ok: false, message: e.message });
  }
});

app.patch("/", validateNote, async (req, res) => {
  try {
    await updateNote(req.body);
    res.status(200).send({ ok: true, message: "Note updated successfully" });
  } catch (e) {
    console.log("ERROR IN UPDATING NOTE", e.message);
    res.status(400).send({ ok: false, message: e.message });
  }
});

module.exports = app;
