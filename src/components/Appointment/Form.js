import React, { useState } from "react"
import "./style.scss"
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
    const [currentName, setName] = useState(props.name || "")
    const [selectedInterviewer, setInterviewer] = useState(props.interviewer || null)

    // const reset = () => {
    //     setName("")
    //     setInterviewer(null)
    //     props.onCancel()
    // }
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form
                    autoComplete="off"
                    onSubmit={event => event.preventDefault()}
                >
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={event => setName(event.target.value)}
                        value={currentName}

                    /*
                    This must be a controlled component
                    */
                    />
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    value={selectedInterviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={props.onCancel}>Cancel</Button>
                    <Button confirm onClick={props.onSave}>Save</Button>
                </section>
            </section>
        </main>
    )
}