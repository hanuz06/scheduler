import "./styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";



const Appointment=({time, interview, interviewers, bookInterview, id, cancelInterview })=>{
    
    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
      );

      function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING)
        bookInterview(id, interview)                
        .then(res =>
            transition(SHOW))
      }

      function deleteItem() {  
        transition(DELETING)        
        cancelInterview(id).then(res =>
            transition(EMPTY)        
            )            
      }     

    //   let interviewer1={};
    //   const interviewerByID = (interview, interviewers)=>{
    //       let interviewerId = interview['interviewer'];
    //       console.log('andrey4 ', interviewerId)
          
    //     interviewers.forEach (item => 
    //         interviewer1 = {...item.interviewerId}
    //     )       
            
    //         return interviewer1
    //   }
    //   interviewerByID(interview, interviewers);
        
        return (
            <article className="appointment">

        <Header time={time}/>

        {mode === SHOW && (
            <Show
                student={interview.student}
                interviewer={interview['interviewer']}              
                onDelete={()=>transition(CONFIRM)} 
                onEdit={()=>transition(EDIT)} 
                               
            />)} 
            
        {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
        
        {mode === SAVING && <Status message={'SAVING'} />}

        {mode === DELETING && <Status message={'DELETING'} />}

        {mode === CONFIRM && <Confirm message={'Please Confirm'} onCancel={e=>back()} onConfirm={deleteItem} />}
        
        {mode === CREATE && 
        <Form 
        interviewers={interviewers}         
        onCancel={()=>back()}
        onSave={save} />}

        {mode === EDIT && 
        <Form 
        interviewers={interviewers}
        interviewer={interview['interviewer']["id"]}
        name={interview.student}

        onCancel={()=>back()}
        onSave={save} />}

       </article>
    );
};

export default Appointment;
  