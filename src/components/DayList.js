import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayList = props.days.map((day) => {
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
      {dayList}
    </ul>
  );
}