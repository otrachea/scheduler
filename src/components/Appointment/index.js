import React from "react";

import "components/Appointment/style.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
          onAdd={props.onAdd}
        ></Empty>}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        ></Show>}
    </article>
  );
}