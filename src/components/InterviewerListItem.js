import React from "react";
import './InterviewerListItem.scss';
import classNames from 'classnames';

export default function InterviewerListItem(props) {

  let interviewerCSS = classNames(
    'interviewers__item',
  {
    'interviewers__item--selected': props.selected,
    'interviewers__item-image': props.avatar,
    'interviewers__item--selected interviewers__item-image': props.selected && props.avatar     
  })
  
  return (
    <li className={interviewerCSS} onClick={()=>props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );     
}