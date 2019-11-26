import React, {useState} from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {  

  const [interviewer,setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');

  const reset =()=>{
    setName('')
    setInterviewer(null)
  }

  const cancel=()=>{
    reset()
    props.onCancel()
  }

  const save =()=>{
    return [{name}]
  }

  return (

    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event=>event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={name}
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(e)=>setName(e.target.value)}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={e=>props.onSave(name, interviewer)} confirm>Save</Button>
    </section>
  </section>
</main>
  )
}