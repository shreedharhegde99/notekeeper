const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    pinned: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Note = model("note", noteSchema);
module.exports = Note;
