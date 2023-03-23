import { Fragment, useState } from "react";
import style from "./styles/addTask.module.css";
const { addNoteMain, formContainer, addNoteForm } = style;

export default function AddTask({ onOpen, refreshData }) {
  const initData = { title: "", tag: "", content: "", pinned: false };
  const [noteData, setNoteData] = useState(initData);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const updatePinned = () => {
    setNoteData({ ...noteData, pinned: !noteData.pinned });
  };

  // handle note add
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, tag, content } = noteData;

      if (title && tag && content) {
        const res = await fetch("http://localhost:3001/notes", {
          method: "POST",
          body: JSON.stringify(noteData),
          headers: {
            "content-type": "application/json",
          },
        }).then((e) => e.json());
      }

      refreshData();
    } catch (e) {
      console.log("ERROR IN FETCHING", e.message);
    }
    onOpen(false);
  };

  return (
    <Fragment>
      <div className={addNoteMain}>
        <div className={formContainer}>
          <div title="close" onClick={() => onOpen(false)}>
            x
          </div>
          <div>Create a Note</div>
          <form onSubmit={handleSubmit} className={addNoteForm}>
            <div>
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                value={noteData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="tag">Tag: </label>
              <input
                type="text"
                name="tag"
                value={noteData.tag}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="note">Note: </label>
              <input
                type="text"
                name="content"
                value={noteData.content}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="checkbox"
                checked={noteData.pinned}
                onChange={updatePinned}
              />
              <label htmlFor="pinned">Pinned</label>
            </div>
            <div>
              <input type="submit" value="Add note" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
