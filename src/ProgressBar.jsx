import React, { useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({page,nextPage}) => {
  const progressPercentage = (page / 10) * 100; // Calculate progress percentage based on current page

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
}

export default ProgressBar;
