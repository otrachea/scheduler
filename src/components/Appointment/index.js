import React from "react";

import "components/Appointment/style.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && "No Appointments"}
      {props.time && `Appointment at ${props.time}`}
    </article>
  );
}