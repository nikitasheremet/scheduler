import React from "react"
import "./style.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "../../hooks/useVisualMode"
// import { getInterviewersByDay } from "../helpers/selectors"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"



export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING)
        props.bookInterview(props.id, interview).then(() => {
            transition(SHOW)
        })
    }
    // console.log(save)
    // console.log(props)

    return (
        <article className="appointment">
            <Header
                time={props.time}
            />
            {mode === SAVING && <Status message={"Saving"} />}
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer.name}
                />
            )}
            {mode === CREATE && (
                <Form
                    id={props.id}
                    interviewers={props.interviewers}
                    onCancel={() => back()}
                    onSave={save}
                />
            )}

        </article>
    );
}