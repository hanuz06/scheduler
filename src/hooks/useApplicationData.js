import {useReducer, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers:{}
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
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
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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
        //console.log('DAYS ', res.data);        
        return res.data
        //setDays(res.data);
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
      //setState(prev => ({ days: all[0], appointments: all[1], interviewers: all[2] }));  
      dispatch({type: SET_APPLICATION_DATA, days: all[0], appointments: all[1], interviewers: all[2] })         
    })
   }, [])

  // const setDay = day => setState({...state, day});
  const setDay = day => dispatch({type: SET_DAY, day});

  function bookInterview(id, interview) {    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };   

    return axios.put(`/api/appointments/${id}`, {interview})
        .then(res=>
        //   setState({
        //   ...state,
        //   appointments
        // })
        dispatch({type: SET_INTERVIEW, appointments})
        )        
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
   
    return axios.delete(`/api/appointments/${id}`)
        .then(res=>
        //   setState(state => ({
        //   ...state,
        //   appointments
        // }))
        dispatch({type: SET_INTERVIEW, appointments})
        
        )
    }

  
  return { state, setDay, bookInterview, cancelInterview };
}