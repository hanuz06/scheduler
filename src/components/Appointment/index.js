import "./styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


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
        .then(res =>transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true));
      }

      function deleteItem() {  
        transition(DELETING, true)        
        cancelInterview(id)
        .then(res => transition(EMPTY))            
        .catch(error => transition(ERROR_DELETE, true));

      }     
        
        return (

          <article className="appointment" data-testid="appointment">

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

            {mode === ERROR_DELETE && <Error message={'Could not delete appointment'} onClose={()=>transition(SHOW)} />}

            {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={()=>back()} />}

            {mode === CONFIRM && <Confirm message={'Please Confirm'} onCancel={()=>back()} onConfirm={deleteItem} />}
            
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
  