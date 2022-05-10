import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Runs once and retrives data from api server then sets response data to state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((results) => {
      setState((prev) => ({
        ...prev,
        days: results[0].data,
        appointments: results[1].data,
        interviewers: results[2].data,
      }));
    });
  }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Hook to set day in state
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // Updates number of spots remaining without mutating state
  // Return new days state with updated spots
  const updateSpots = function (state, appointments) {
    // Finds obj in days that corresponds to day in state
    const dayObj = state.days.find((d) => d.name === state.day);

    // Counts spot remaining
    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    // Creates new day object with updated spots
    const day = { ...dayObj, spots };
    // Replaces old day obj with new day obj in state days for day in state
    const days = state.days.map((d) => (d.name === state.day ? day : d));

    return days;
  };

  // Book an interview and updates api server
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState((prev) => ({ ...prev, appointments }));
    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        const days = updateSpots(state, appointments);
        setState((prev) => {
          return {
            ...prev,
            days,
          };
        });
      });
  };

  // Cancel an interview and updates api server
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => {
        return {
          ...prev,
          days,
        };
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
