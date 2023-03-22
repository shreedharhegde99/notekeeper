import { Fragment } from "react";
import style from "./styles/addTaskBtn.module.css";
const { addTaskBtnContainer, addTaskBtn } = style;

export default function AddTaskBtn({ onOpen }) {
  return (
    <Fragment>
      <div
        className={addTaskBtnContainer}
        title="Add note"
        onClick={() => onOpen(true)}
      >
        <div className={addTaskBtn}> + </div>
      </div>
    </Fragment>
  );
}
