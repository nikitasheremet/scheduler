import React, { useState } from "react"
import "./style.scss"
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const [currentName, setName] = useState(props.name || "")
  const [selectedInterviewer, setInterviewer] = useState(
    props.interviewer || null
  )
  const [error, setError] = useState("")

  function validate() {
    if (currentName === "" || selectedInterviewer === "") {
      setError("Student name OR Interviewer cannot be blank")
      return
    }
    setError("")
    props.onSave(currentName, selectedInterviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            value={currentName}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          key={props.id}
          interviewers={props.interviewers}
          value={selectedInterviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}
