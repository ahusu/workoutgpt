import React, { useState } from "react";

const InputField = ({ socket, page, clearPrompt }) => {
  const [input, setInput] = useState('');
  const [hovering, setHovering] = useState(false);

  const handleSubmit = () => {

    let conversationHistory = JSON.parse(sessionStorage.getItem("messages")) || [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role:"assistant",
        content: "what is your fitness goal?"
      }
    ];
    conversationHistory.push({
      role: 'user',
      content: input
    });
    sessionStorage.setItem("messages", JSON.stringify(conversationHistory));
    socket.emit("getOpenAIResponse", { answer: input, conversationHistory: conversationHistory, questionNumber: page });
    setInput('');
    clearPrompt();
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
