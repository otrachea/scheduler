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
    return axios.put(`/api/appointments/${id}`, { interview: { ...interview } });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`);
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