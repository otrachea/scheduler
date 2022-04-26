import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const getDayFromAppointment = (id) => {
    for (const day of state.days) {
      for (const appointment of day.appointments) {
        if (appointment === id) {
          return day;
        }
      }
    }
  };

  // const updateSpots = function (state, appointments, id) {
  //   const dayObj = state.days.find(d => d.name === state.day);

  //   let spots = 0;
  //   for (const id of dayObj.appointments) {
  //     if (!appointments[id].interview) {
  //       spots++;
  //     }
  //   }

  //   const day = { ...dayObj, spots };
  //   const days = state.days.map(d => d.name === state.day ? day : d);

  //   return days;
  // };

  const bookInterview = (id, interview) => {

    const isNew = state.appointments[id].interview ? false : true;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prev => ({ ...prev, appointments }));
    return axios.put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        setState(prev => {
          getDayFromAppointment(id).spots -= (isNew) ? 1 : 0;
          return {
            ...prev,
          };
        });
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => {
          getDayFromAppointment(id).spots += 1;
          return {
            ...prev,
          };
        });
      });
    // .then(() => {
    //   console.log(updateSpots(state, ))
    // });
  };

  useEffect(() => {
    Promise.all([axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")])
      .then(results => {
        setState(prev => ({
          ...prev,
          days: results[0].data,
          appointments: results[1].data,
          interviewers: results[2].data
        }));
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};