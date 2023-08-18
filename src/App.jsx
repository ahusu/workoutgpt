import React, { useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import Prompt from './Prompt.jsx';
import FinalSubmission from './FinalSubmission.jsx'
import './App.css';

function App() {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    console.log(page)
    setPage(page+1)
  };

  return (
    <>
      <ProgressBar page={page} />
      <h3>Welcome to your WorkoutGPT Onboarding!</h3>
      {page < 10? <Prompt page={page} nextPage={nextPage}/>: <FinalSubmission />}
    </>
  )
}

export default App
