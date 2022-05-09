import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const updateSpots = function (state, appointments, id) {
    const dayObj = state.days.find(d => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    const days = state.days.map(d => d.name === state.day ? day : d);

    return days;
  };

  const bookInterview = (id, interview) => {

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
        const days = updateSpots(state, appointments, id);
        setState(prev => {
          return {
            ...prev,
            days
          };
        });
      });
  };

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState(prev => {
          return {
            ...prev,
            days
          };
        });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};