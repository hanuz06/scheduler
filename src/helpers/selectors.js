import { interfaceDeclaration } from "@babel/types";

export function getAppointmentsForDay(state, day) {

  const appointmentsForTheDay=[]; 
  const selectedDayAppointments=[];  
  
  state.days.forEach(stateByDay => {if(stateByDay.name === day ) { 
    stateByDay.appointments.forEach(app=>selectedDayAppointments.push(app))
  }});
 
  if (!selectedDayAppointments){
    return appointmentsForTheDay;
  }

  for (const i in state.appointments){

    selectedDayAppointments.forEach(app=>{        
    if(app===Number(i)){
      appointmentsForTheDay.push(state.appointments[i])
    }
  })
  }   
  return appointmentsForTheDay;
}

export function  getInterview(state, interview) {

  if (!interview) return null
 
  const key = interview.interviewer;
  const interviewObject = {}  

  for (const app in state.appointments){
        
    if (Number(app)===key || Number(app)!==null){            
      interviewObject['student']=interview.student;
      interviewObject['interviewer']=state.interviewers[key];
    }
  }
   
  return interviewObject? interviewObject : null;
}