import { useReducer, useEffect } from "react"
import axios from "axios"

const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
    switch (action.type) {
        case SET_DAY:
            return { ...state, day: action.day }
        case SET_APPLICATION_DATA:
            return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
        case SET_DAYS:
            return { ...state, days: action.days }
        case SET_INTERVIEW:
            return { ...state, appointments: action.appointments }
        default:
            throw new Error(
                `Tried to reduce with unsupported action type: ${action.type}`
            );
    }
}

export default function () {

    const [state, dispatch] = useReducer(reducer, {
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    })

    useEffect(() => {
        Promise.all([
            axios.get("http://localhost:8001/api/days"),
            axios.get("http://localhost:8001/api/appointments"),
            axios.get("http://localhost:8001/api/interviewers")
        ]).then(res => {
            const [days, appointments, interviewers] = res
            dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data }) //prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }))
        })
    }, [])

    function setDay(day) {
        dispatch({ type: SET_DAY, day })
    }

    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return axios.put(`http://localhost:8001/api/appointments/${id}`, {
            interview
        }).then(() => {
            dispatch({ type: SET_INTERVIEW, appointments })
        }).then(() => {
            axios.get("http://localhost:8001/api/days").then((res) => {
                dispatch({ type: SET_DAYS, days: res.data })
            })
        })

    }

    function deleteInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        return axios.delete(`http://localhost:8001/api/appointments/${id}`)
            .then(() => {
                dispatch({ type: SET_INTERVIEW, appointments })
            }).then(() => {
                axios.get("http://localhost:8001/api/days").then((res) => {
                    dispatch({ type: SET_DAYS, days: res.data })
                })
            })
    }

    return { state, setDay, bookInterview, deleteInterview }
}