import {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace===true){
      history.pop()
    }
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
     history.pop();      
    if(history.length>0){
      setHistory(history);     
      setMode(history[history.length-1]);
    } else {
      setMode(mode)
    }
  };
  return { mode, transition, back };
}