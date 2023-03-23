import { Fragment, useState } from "react";
import style from "./styles/addTask.module.css";
import noteStyle from "./styles/note.module.css";

const { noteCard } = noteStyle;

const { addNoteMain, formContainer, addNoteForm } = style;

export default function NoteCard({ note, refreshData }) {
  const [editNote, setEditNote] = useState(note);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNote({ ...editNote, [name]: value });
  };

  const updatePinned = () => {
    setEditNote({ ...editNote, pinned: !editNote.pinned });
  };

  // handle note update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { title, tag, content } = editNote;

      if (title && tag && content) {
        const res = await fetch(" http://localhost:3001/notes", {
          method: "PATCH",
          body: JSON.stringify(editNote),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((e) => e.json());
      }
      refreshData();
    } catch (e) {
      console
        .log("ERROR IN FETCHING", e.message)
        .catch((e) => console.log(e.message));
    }

    setIsEditOpen(false);
  };

  return (
    <Fragment>
      <div className={noteCard} onClick={() => setIsEditOpen(true)}>
        <div>
          <h3>{note.title}</h3>
          <p>{note.tag}</p>
          <p>{note.content}</p>
        </div>
        <div>
          {note.pinned ? (
            <img
              src="https://thumb.silhouette-ac.com/t/cb/cbb0f5173e768c5e1396195171476a41_t.jpeg"
              width="30px"
              height="30px"
              alt="pinned_note"
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {isEditOpen && (
        <div className={addNoteMain}>
          <div className={formContainer}>
            <div title="close" onClick={() => setIsEditOpen(false)}>
              x
            </div>
            <div>Update note</div>
            <form onSubmit={handleUpdate} className={addNoteForm}>
              <div>
                <label htmlFor="title">Title: </label>
                <input
                  type="text"
                  name="title"
                  value={editNote.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tag">Tag: </label>
                <input
                  type="text"
                  name="tag"
                  value={editNote.tag}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="note">Note: </label>
                <input
                  type="text"
                  name="content"
                  value={editNote.content}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={editNote.pinned}
                  onChange={updatePinned}
                />
                <label htmlFor="pinned">Pinned</label>
              </div>
              <div>
                <input type="submit" value="Update" />
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
