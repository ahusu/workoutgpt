import React, { useState } from "react";


const InputField = ({ socket, page, clearPrompt, history, setHistory, finalize }) => {
  const [input, setInput] = useState('');
  const [hovering, setHovering] = useState(false);

  const handleSubmit = () => {
    const newUserMessage = {
      role: 'user',
      content: input
    };

    const updatedHistory = history.length === 0
      ? [
          {
            role: "system",
            content: "You are a daily workout planner. In order to best plan workouts for your clients, you need to ask enough questions to understand their needs and where they want to go. Do not ask the same question twice.",
          },
          {
            role:"assistant",
            content: "what is your fitness goal?"
          },
          newUserMessage
        ]
      : [...history, newUserMessage];

    setHistory(updatedHistory);
    sessionStorage.setItem("messages", JSON.stringify(updatedHistory));

    socket.emit("getOpenAIResponse", {
      answer: input,
      conversationHistory: updatedHistory,
      questionNumber: page
    });

    setInput('');
    clearPrompt();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleSubmit();
    }
  }

  return (
    <>
      <textarea
        rows="5"
        cols="60"
        name="text"
        value={input}
        placeholder="Enter text"
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      ></textarea>
    <div style={{ display: 'flex' , justifyContent: 'center'}}>
    <button
        onClick={handleSubmit}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{...hovering ? hoverStyles : buttonStyles, marginRight: '10px'}}
    >
        Submit
    </button>
    {page===5?<button
        onClick={finalize}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={hovering ? hoverStyles : buttonStyles}
    >
        Finalize
    </button>:null}
</div>

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
