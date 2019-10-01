import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment/index"
import axios from "axios"

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Nikita Sheremet",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm"
  }
];

export default function Application(props) {
  const [currentDay, setDay] = useState('Monday')
  const [days, setDays] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8001/api/days").then(res => {
      setDays(res.data)
    })
  }, [days])
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={currentDay}
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
        {appointments.map(app => {
          return (
            <Appointment
              id={app.id}
              {...app}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}