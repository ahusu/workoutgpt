import React, { useState } from "react";

const InputField = ({ socket, nextPage, page, clearPrompt }) => {
  const [input, setInput] = useState('');
  const [hovering, setHovering] = useState(false);

  const handleSubmit = () => {

    let conversationHistory = JSON.parse(sessionStorage.getItem("messages")) || [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
    ];
    socket.emit("getOpenAIResponse", { prompt: input, conversationHistory: conversationHistory, questionNumber: page });
    setInput('');
    clearPrompt();
    nextPage();
  };

  return (
    <>
      <textarea
        rows="5"
        cols="60"
        name="text"
        value={input}
        placeholder="Enter text"
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={hovering ? hoverStyles : buttonStyles}
      >
        Submit
      </button>
    </>
  );
};

const buttonStyles = {
  backgroundColor: 'blue',
  color: 'white'
};

const hoverStyles = {
  backgroundColor: 'darkblue',
  color: 'white'
};

export default InputField;
