import React from "react"
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from "prop-types"

InterviewerListItem.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default function InterviewerItemList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              id={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.value}
              onChange={event => props.onChange(interviewer.id)}
            />
          )
        })}
      </ul>
    </section>
  )
}
