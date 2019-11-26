import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


import "./styles.scss"

const Appointment=(props)=>{
    return (
        <article className="appointment">

        <Header time={props.time}/>
       { props.interview? 
       <Show 
       student={props.interview.student} 
       interviewer={props.interview.interviewer}
       onEdit={props.onEdit}
       onDelete={props.onDelete}/> : 
       <Empty  onAdd={props.onAdd}/>}

       </article>
    );
};

export default Appointment;
  