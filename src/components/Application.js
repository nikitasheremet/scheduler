import React from "react"
import DayList from "./DayList"
import Appointment from "./Appointment/index"
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "./helpers/selectors"
import useApplicationData from "hooks/useApplicationData"
import "components/Application.scss"

export default function Application(props) {
  const { state, setDay, updateInterviewInfo } = useApplicationData()

  //Get an array of appointments and interviewers based on the day selected
  //Map through appointments for curent day and render them using the Appointment component
  const appointmentsForDay = getAppointmentsForDay(state, state.day)
  const interviewersForDay = getInterviewersForDay(state, state.day)
  const schedule = appointmentsForDay.map(app => {
    const interview = getInterview(state, app.interview)
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={updateInterviewInfo}
        deleteInterview={updateInterviewInfo}
      />
    )
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered pic"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  )
}
