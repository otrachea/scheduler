import React from "react";

import "components/Appointment/style.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  const getInterviewer = (interviewers, interview) => {
    if (interviewers && interview) {
      const interviewer = interviewers.filter(interviewer => {
        return interviewer.id === interview.interviewer;
      });
      return interviewer[0].name;
    }
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        ></Empty>}
      {
        mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={getInterviewer(props.interviewers, props.interview)}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        ></Show>
      }
      {
        mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      }
    </article >
  );
}