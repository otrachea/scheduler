// Return array of appointment objects for a day
// Example output: (For Monday, where there is one interview at 4pm)
// [{ id: 1, time: "12pm", interview: null }, 
//  { id: 2, time: "1pm", interview: null }, 
//  { id: 3, time: "2pm", interview: null }, 
//  { id: 4, time: "3pm", interview: null }, 
//  { id: 5, time: "4pm", interview: { interviewer: 10, student: "Archie Cohen" } }]

export const getAppointmentsForDay = (state, day) => {
  const dayInState = state.days.filter(dayState => dayState.name === day)[0];

  if (!dayInState) return [];

  return dayInState.appointments.map(appointment => state.appointments[`${appointment}`]);
};

// Return interview obj with interviewer's info or null if no interview
// Example input interview:
// { id: 5, time: "4pm", interview: { interviewer: 10, student: "Archie Cohen" } }
// Example output:
// { student: "Archie Cohen",
//   interviewer: {
//     id: 10,
//     name: "Samantha Stanic"
//     avatar: "https://i.imgur.com/okB9WKC.jpg" }
// }
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

// Return array of objs that represents interviewers for a certain day
// Example output:
// [{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
// { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
// { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
// { id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg" },
// { id: 10, name: "Samantha Stanic", avatar: "https://i.imgur.com/okB9WKC.jpg" }]
export const getInterviewersForDay = (state, day) => {
  const dayInState = state.days.filter(dayState => dayState.name === day)[0];

  if (!dayInState) return [];

  return dayInState.interviewers.map(interviewer => state.interviewers[`${interviewer}`]);
};