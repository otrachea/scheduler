import React from "react";

import "components/Appointment/style.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  const deleteAppointment = (id) => {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY));
  };

  const getInterviewer = (interviewers, interview) => {
    if (interviewers && interview) {
      const interviewer = interviewers.filter(interviewer => {
        return interviewer.id === interview.interviewer;
      });
      return interviewer.length === 0 ? null : interviewer[0].name;
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
        />}
      {
        mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={getInterviewer(props.interviewers, props.interview)}
          onEdit={props.onEdit}
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
    </article >
  );
};