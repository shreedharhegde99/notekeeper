const Note = require("../model/note.model");

async function createNote({ title, tag, content, pinned }) {
  try {
    let newNote = await Note.create({ title, tag, content, pinned });
    await newNote.save();
    return;
  } catch (e) {
    console.log("ERROR IN CREATING NEW NOTE", e.message);
    throw new Error(e.message);
  }
}

module.exports = createNote;
