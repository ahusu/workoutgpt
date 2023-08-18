import React, { useState } from 'react';

const ProgressBar = ({page}) => {
  const progressPercentage = (page / 10) * 100; // Calculate progress percentage based on current page

  const progressContainerStyles = {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    marginTop: '20px',
    position: 'relative'
  };

  const progressBarStyles = {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: '15px',
    transition: 'width 0.3s ease-in-out',
    width: `${progressPercentage}%`
  };

  return (
    <div style={progressContainerStyles}>
      <div style={progressBarStyles}></div>
    </div>
  );
}

export default ProgressBar;
