import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const Prompt = ({ page, input }) => {
  const [prompt, setPrompt] = useState("What is your fitness goal?");
  const [input, setInput] = useState('');
  const [hovering, setHovering] = useState(false);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    // Connect the socket and set up the listeners
    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("openAIResponseChunk", (data) => {
      setPrompt((prevPrompt) => `${prevPrompt} ${data.content}`);
    });

    return () => {
      // Cleanup the socket connection on component unmount
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchPrompt = async () => {
      let convo = JSON.parse(sessionStorage.getItem("messages")) || [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
      ];
      let res = await axios.post("/api", {
        page: page,
        input: input,
        conversationHistory: convo,
      });
      sessionStorage.setItem("messages", JSON.stringify(res.data));
      setPrompt(res.data[res.data.length - 1].content);
    };

    fetchPrompt();
  }, [page, input]);

  const handleInput = (input) => {
    setInput(input);
  };

  const handleSubmit = () => {
    socket.emit("getOpenAIResponse", { prompt: "Your prompt here" }); // Replace with the actual prompt when needed
  };

  return (
    <>
      <div>
        <h2>{prompt}</h2>
      </div>
      <textarea
        rows="5"
        cols="60"
        name="text"
        placeholder="Enter text"
        onChange={(e) => {
          handleInput(e.target.value);
        }}
      ></textarea>

      <button
        onClick={() => nextPage()}
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
export default Prompt;
