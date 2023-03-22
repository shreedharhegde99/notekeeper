const Note = require("../model/note.model");

async function updateNote({ _id, ...document }) {
  try {
    await Note.updateOne({ _id }, document);
    return;
  } catch (e) {
    console.log("ERROR IN UPDATING NOTE", e.message);
  }
}

module.exports = updateNote;
