import {useReducer, useEffect} from 'react';
import axios from 'axios';

import reducer  from "reducers/application";
import { statements } from '@babel/template';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOT = "SET_SPOT";

export default function useApplicationData() {   

  const [state, dispatch]=useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}    
  })

  useEffect(() =>{ 
    Promise.all([
      Promise.resolve(
        axios.get('/api/days')
      .then(res=>{                
        return res.data;        
      })
      ),
      Promise.resolve(
        axios.get('/api/appointments')
        .then(res=>{          
          return res.data        
      })
      ),
      Promise.resolve(
        axios.get('/api/interviewers')
        .then(res=>{          
          return res.data        
      })
      )          
    ]).then(all=>{        
      dispatch({type: SET_APPLICATION_DATA, days: all[0], appointments: all[1], interviewers: all[2] })         
    })
   }, [])
  
  const setDay = day => dispatch({type: SET_DAY, day});

   //finds a day by appointment id
   const dayByAppId= id => {
    let dayByAppointmenID={};
    state.days.forEach(item => {
      item.appointments.forEach(appointmentID=>{
        if(id===appointmentID){
          dayByAppointmenID={...item};
        }}
      )
    });
    return dayByAppointmenID;
  }

  function editAppointment(id, interview) {     
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };      

    return axios.put(`/api/appointments/${id}`, {interview})
        .then(res=> {        
        dispatch({type: SET_INTERVIEW, appointments});        
        dispatch({type: SET_SPOT, days: state.days});
      })        
  }

  function bookInterview(id, interview) {     
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };     

    const daySpot = dayByAppId(id)
    
    const spotDecrease = (daySpot) =>{      
      const m = state.days.map((item, index)=>{
        if (index !== daySpot.id-1){
          return item;
        } 
        return {
          ...daySpot,
          spots:item.spots - 1
        }                 
      }       
      )
      return m;  
    }
    const days = spotDecrease(daySpot)

    return axios.put(`/api/appointments/${id}`, {interview})
        .then(res=> {        
        dispatch({type: SET_INTERVIEW, appointments});        
        dispatch({type: SET_SPOT, days: days});
      })        
  } 

  function cancelInterview(id){    
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daySpot = dayByAppId(id)

    const spotIncrease = (daySpot) =>{      
      const m = state.days.map((item, index)=>{
        if (index !== daySpot.id-1){
          return item;
        } 
        return {
          ...daySpot,
          spots:item.spots + 1
        }                 
      }       
      )
      return m;  
    }
    const days = spotIncrease(daySpot)
   
    return axios.delete(`/api/appointments/${id}`)
        .then(res=>{        
          dispatch({type: SET_INTERVIEW, appointments});
          dispatch({type: SET_SPOT, days: days});
        })
    }
  
  return { state, setDay, bookInterview, cancelInterview ,editAppointment};
}