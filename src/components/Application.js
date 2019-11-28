import React from "react";

import "components/Application.scss";
import DayList from './DayList';

import Appointment from 'components/Appointment';
import {getAppointmentsForDay, getInterview, getInterviewersByDay} from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData'

export default function Application(props) {

  const {
    state,
    setDay,    
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers:{}
  // });

  // const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));  

    
   const appointments = getAppointmentsForDay(state, state.day);
   const interviewers = getInterviewersByDay(state, state.day);   
  
   
    const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
      return ( 
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          {...appointment}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview} 
          cancelInterview={cancelInterview}
          
        />
      );
    });
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}       
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
