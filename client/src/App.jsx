import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import AddTaskBtn from "./components/AddTaskBtn";
import useFetchData from "./hooks/useFechData";
import style from "./App.module.css";
import NoteCard from "./components/NoteCard";
const { pageTitle, notesContainer, noteCard, navBtnContainer } = style;

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = useState(1);
  const [data, getNotes] = useFetchData();

  const handleOpenForm = (val) => {
    setOpenForm(val);
  };

  const refetchNotes = () => {
    getNotes(page);
  };

  useEffect(() => {
    refetchNotes();
  }, [page]);

  return (
    <div>
      <header>
        <div className={pageTitle}>Note-Keeper</div>
      </header>
      <div className={navBtnContainer}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>{page} </span>
        <button disabled={data.length < 6} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      <div className={notesContainer}>
        {data.map((note) => (
          <NoteCard
            key={note._id}
            className={noteCard}
            note={note}
            refreshData={refetchNotes}
          />
        ))}
      </div>

      <AddTaskBtn onOpen={handleOpenForm} />
      {openForm && (
        <AddTask onOpen={handleOpenForm} refreshData={refetchNotes} />
      )}
    </div>
  );
}

export default App;
