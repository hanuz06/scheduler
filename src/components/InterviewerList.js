import React from "react";
import PropTypes from 'prop-types';
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {  
  
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        id={interviewer.id}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });

    return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>)
}

InterviewerList.propTypes = {
  interviewer: PropTypes.string,
  setInterviewer: PropTypes.func.isRequired
}