// import {useReducer, useEffect} from 'react';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOT = "SET_SPOT";

  export default function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, 
        day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, 
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers }
      case SET_INTERVIEW: {
        return { ...state, 
          appointments: action.appointments }
      }      
      case SET_SPOT: {        
        return { ...state, 
          days: action.days }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }