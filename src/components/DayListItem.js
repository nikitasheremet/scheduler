import React from "react";
import "./DayListItem.scss"
import classnames from "classnames"

export default function DayListItem(props) {
    const selectedClass = classnames(
        'day-list__item', 
        {'day-list__item--full':props.spots === 0},
        {'day-list__item--selected':props.selected}
        )
    const formatSpots = () => {
        if (props.spots === 0) {
            return "no spots remaining"
        } else if (props.spots === 1) {
            return "1 spot remaining"
        } else {
            return `${props.spots} spots remaining`
        }
    }
    return (
        <li 
        onClick={() => props.setDay(props.name)}
        className={selectedClass}
        >
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots()}</h3>
        </li>
    );
  }