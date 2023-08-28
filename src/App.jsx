import React, { useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import Prompt from './Prompt.jsx';
import FinalSubmission from './FinalSubmission.jsx';
import './App.css';

function App() {
  const [page, setPage] = useState(0);
  const [plan, setPlan] = useState('');
  const [finalized, setFinalized] = useState(false);

  const nextPage = () => {
    setPage(page+1);
  };
  const finalize = () => {
    setFinalized(true);
  };

  return (
    <>
      <ProgressBar page={page} nextPage={nextPage} />
      {finalized? null: (<>
      <h3>Welcome to your WorkoutGPT Onboarding!</h3>
      <Prompt
        page={page}
        nextPage={nextPage}
        setPlan={setPlan}
        finalize={setFinalized} />
      </>)}
      {finalized? <FinalSubmission plan={plan} /> : null}
    </>
  )
}

export default App
