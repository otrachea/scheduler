import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = () => {
    return props.spots === 1 ? "spot" : "spots"
  };

  const dayClass = classNames("day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": !props.spots
    });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid={"day"}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {props.spots ? props.spots : "no"} {formatSpots()} remaining
      </h3>
    </li>
  );
}