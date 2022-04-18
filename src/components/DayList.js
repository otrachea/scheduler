import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        spots={day.spots}
        selected={props.day === day.name}
        name={day.name}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {dayItems}
    </ul>
  );
}