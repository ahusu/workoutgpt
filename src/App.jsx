import React, { useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import Prompt from './Prompt.jsx';
import './App.css';

function App() {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage(page+1)
  };

  return (
    <>
      <ProgressBar page={page} nextPage={nextPage} />
      <h3>Welcome to your WorkoutGPT Onboarding!</h3>
      <Prompt page={page} input={input}/>

    </>
  )
}

export default App
