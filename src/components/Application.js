import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from './DayList';

import Appointment from 'components/Appointment';
import {getAppointmentsForDay, getInterview, getInterviewersByDay} from '../helpers/selectors'

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Andrey Li",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcomlm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ]

export default function Application(props) {

  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() =>{ 
    Promise.all([
      Promise.resolve(
        axios.get('/api/days')
      .then(res=>{
        //console.log('DAYS ', res.data);        
        return res.data
        //setDays(res.data);
      })
      ),
      Promise.resolve(
        axios.get('/api/appointments')
        .then(res=>{
          //console.log('APPOINTMENTS ', res.data);
          return res.data
        //setDays(res.data);
      })
      ),
      Promise.resolve(
        axios.get('/api/interviewers')
        .then(res=>{
          //console.log('ddddddddddddddddd ', res.data);
          return res.data
        //setDays(res.data);
      })
      )          
    ]).then(all=>{
      setState(prev => ({ days: all[0], appointments: all[1], interviewers: all[2] }));
      //console.log('AAAAA ', all);
      console.log('BBBBB ', state.interviewers);
    })
   }, [])

    
   const appointments = getAppointmentsForDay(state, state.day);
   const interviewers = getInterviewersByDay(state, state.day);

   console.log('34454545454545 ', interviewers)
   
   function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };   

    // setState({
    //   ...state,
    //   appointments
    // });

    return axios.put(`/api/appointments/${id}`, {interview})
        .then(res=>
          setState({
          ...state,
          appointments
        }))
  } 

  function cancelInterview(id){
    console.log('STARTING ',id)
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    return axios.delete(`/api/appointments/${id}`)
        .then(res=>
          setState(state => ({
          ...state,
          appointments
        })))
    }
  
   
    const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
      return ( 
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
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
        
        {/* {appointments.map(appointment => 
           <Appointment key={appointment.id} {...appointment} />
           )} */}
           <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
