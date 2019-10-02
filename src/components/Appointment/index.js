import React from "react"
import "./style.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"
// import { getInterviewersByDay } from "../helpers/selectors"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    // console.log(transition)
    console.log(props)

    return (
        <article className="appointment">
            <Header
                time={props.time}
            />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer.name}
                />
            )}
            {mode === CREATE && (
                <Form
                    interviewers={props.interviewers}
                    onCancel={() => back()}
                />
            )}
        </article>
    );
}