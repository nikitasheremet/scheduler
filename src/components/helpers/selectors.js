export function getAppointmentsForDay(state, day) {
    let appList = state.days.filter(item => item.name === day)
    if (appList.length === 0) {
        return [];
    } else {
        appList = appList[0].appointments
    }
    return Object.values(state.appointments).filter(app => appList.includes(app.id))
}

export function getInterview(state, interview) {
    if (!interview) return null
    return {
        student: interview.student,
        interviewer: Object.values(state.interviewers).filter(int => {
            return int.id === interview.interviewer
        })[0]
    }
}