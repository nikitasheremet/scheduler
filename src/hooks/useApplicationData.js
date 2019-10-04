import { useReducer, useEffect } from "react"
import axios from "axios"



const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
    // console.log(state)
    // console.log(action)
    switch (action.type) {
        case SET_DAY:
            return { ...state, day: action.day }
        case SET_APPLICATION_DATA:
            return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
        case SET_INTERVIEW:
            return { ...state, appointments: action.appointments }
        case SET_DAYS:
            return { ...state, days: action.days }
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

    function updateRemainingSpots(appointments) {
        let counter = 0
        let appList = state.days.filter(item => item.name === state.day)
        if (appList.length === 0) {
            return [];
        } else {
            appList = appList[0].appointments
        }
        let filteredApp = Object.values(appointments).filter(app => appList.includes(app.id))
        for (let app of filteredApp) {
            // console.log(app)
            if (!app.interview) counter++
        }
        const dayTarget = { ...state.days.find(d => d.name === state.day), spots: counter }
        const days = [
            ...state.days
        ].map(a => {
            if (a.name === dayTarget.name) return dayTarget
            return a
        })

        dispatch({ type: SET_DAYS, days })
    }

    function updateInterviewInfo(id, interview = null) {
        const appointment = {
            ...state.appointments[id],
            interview: interview ? { ...interview } : null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        let axiosCall
        if (interview) {
            axiosCall = Promise.all([
                axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }),
            ])
        } else {
            axiosCall = Promise.all([
                axios.delete(`http://localhost:8001/api/appointments/${id}`),
            ])
        }
        return axiosCall.then((res) => {
            dispatch({ type: SET_INTERVIEW, appointments })
            updateRemainingSpots(appointments)
        })
    }

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
        ws.onopen = function (event) {

            ws.onmessage = function (event) {
                const data = JSON.parse(event.data);
                if (data.type === "SET_INTERVIEW") {
                    const appointment = {
                        ...state.appointments[data.id],
                        interview: data.interview ? { ...data.interview } : null
                    };
                    const appointments = {
                        ...state.appointments,
                        [data.id]: appointment
                    };

                    dispatch({ type: SET_INTERVIEW, appointments })
                    updateRemainingSpots(appointments)

                }
            }
        }
        return () => { ws.close() }
    })
    function setDay(day) {
        dispatch({ type: SET_DAY, day })
    }

    return { state, setDay, updateInterviewInfo }
}