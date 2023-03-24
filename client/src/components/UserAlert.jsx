import { Fragment } from "react";
import style from "./styles/userAlert.module.css";
const { userAlertMain, showAlert } = style;

export default function UserAlert({ message }) {
  return (
    <Fragment>
      <div className={`${userAlertMain} ${message ? showAlert : ""}`}>
        <div>{message}</div>
      </div>
    </Fragment>
  );
}
