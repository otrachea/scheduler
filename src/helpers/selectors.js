export const getAppointmentsForDay = (state, day) => {
  const dayInState = state.days.filter(dayState => dayState.name === day)[0];

  if (!dayInState) return [];

  return dayInState.appointments.map(appointment => state.appointments[`${appointment}`]);
};

export const getInterview = (state, interview) => {
  return interview
    ? {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }
    : null;
};

export const getInterviewersForDay = (state, day) => {
  const dayInState = state.days.filter(dayState => dayState.name === day)[0];

  if (!dayInState) return [];

  return dayInState.interviewers.map(interviewer => state.interviewers[`${interviewer}`]);
};