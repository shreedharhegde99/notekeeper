import { Fragment, useState } from "react";
import style from "./styles/addTask.module.css";
const { addNoteMain, formContainer, addNoteForm } = style;

export default function AddTask({ onOpen }) {
  const initData = { title: "", tag: "", content: "" };
  const [noteData, setNoteData] = useState(initData);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  // handle note add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, tag, content } = noteData;
    const payload = { ...noteData, pinned: false };
    if (title && tag && content) {
      const res = fetch("url", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((e) => e.json())
        .catch((e) => console.log(e.message));
      console.log(`=>  res:`, res);
    }
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
              <input type="submit" value="Add note" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
