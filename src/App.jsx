import React, { useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import Prompt from './Prompt.jsx';
import './App.css';

function App() {
  const [page, setPage] = useState(0);
  const [input, setInput] = useState('');
  const [hovering, setHovering] = useState(false);

  const nextPage = () => {
    setPage(page+1)
  };

  const handleInput = (input) => {
    setInput(input);
  };

  return (
    <>
      <ProgressBar page={page} nextPage={nextPage} />
      <h3>Welcome to your WorkoutGPT Onboarding!</h3>
      <Prompt page={page} input={input}/>
      <textarea rows="5" cols="60" name="text" placeholder="Enter text" onChange={(e)=>{handleInput(e.target.value)}}></textarea>
      <button onClick={() => nextPage()}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={hovering ? hoverStyles : buttonStyles}>
        Submit
      </button>
    </>
  )
}
const buttonStyles = {
  backgroundColor: 'blue',
  color: 'white'
};

const hoverStyles = {
  backgroundColor: 'darkblue',
  color: 'white'
};
export default App
