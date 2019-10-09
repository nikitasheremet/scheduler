import React, { useEffect } from "react"
import "./style.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const ERRORsave = "ERRORsave"
const ERRORdelete = "ERRORdelete"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(e => {
        console.log(e)
        transition(ERRORsave, true)
      })
  }

  function infoForDelete() {
    transition(DELETING, true)
    props
      .deleteInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        console.log(e)
        transition(ERRORdelete, true)
      })
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW)
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY)
    }
  }, [transition, mode, props.interview])

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === ERRORsave && (
        <Error message={"Error on Save Action"} onClose={() => back()} />
      )}
      {mode === ERRORdelete && (
        <Error message={"Error on Delete Action"} onClose={() => back()} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={infoForDelete}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          interviewerID={props.interview.interviewer.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && (
        <Form
          id={props.id}
          name={props.interview ? props.interview.student : null}
          interviewer={props.interview ? props.interview.interviewer.id : null}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  )
}
