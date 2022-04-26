import React from "react";

import "components/Appointment/style.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteAppointment = (id) => {
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const getInterviewer = (interviewers, interview) => {
    if (interviewers && interview) {
      for (const interviewer of interviewers) {
        if (interviewer.id === interview.interviewer.id)
          return interviewer.name;
      }
      return null;
    }
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {
        mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={getInterviewer(props.interviewers, props.interview)}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      }
      {
        mode === SAVING &&
        <Status
          message="Saving"
        />
      }
      {
        mode === DELETING &&
        <Status
          message="Deleting"
        />
      }
      {
        mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => deleteAppointment(props.id)}
          onCancel={back}
        />
      }
      {
        mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      {
        mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      {
        mode === ERROR_SAVE &&
        <Error
          message="Could not save appointment."
          onClose={() => transition(EDIT)}
        />
      }
      {
        mode === ERROR_DELETE &&
        <Error
          message="Coult not cancel appointment."
          onClose={() => transition(SHOW)}
        />
      }
    </article >
  );
};