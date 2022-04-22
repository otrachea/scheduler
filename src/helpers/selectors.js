export function getAppointmentsForDay(state, day) {
  const dayInState = state.days.filter(dayState => dayState.name === day)[0];

  if (!dayInState) return [];

  return dayInState.appointments.map(appointment => state.appointments[`${appointment}`]);

}
