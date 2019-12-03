import React from "react";
import './DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item',{
    'day-list__item--selected':props.selected,'day-list__item--full': (props.spots ===0)
  })

  const formatSpots = item => (item? (item === 1? `1 spot remaining`: `${item} spots remaining`): `no spots remaining`);
    
    
  
  return (
    <li onClick={() => props.setDay(props.name) } className={dayClass} data-testid="day">
      <h2 >{props.name}</h2>
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}

//expect(getByText(day, '1 spot remaining').toBeInTheDocument();