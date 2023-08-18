import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import InputField from './InputField';

const Prompt = ({ page, nextPage }) => {
  const [prompt, setPrompt] = useState("What is your fitness goal?");
  const socket = io("http://localhost:3000");
  const [responding, setResponding] = useState(false)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("openAIResponseChunk", (data) => {
      if (!responding) setResponding(true);
      setPrompt((prevPrompt) => `${prevPrompt} ${data.content}`);
    });

    socket.on("endOfStream", (data) => {
      let currentHistory = JSON.parse(sessionStorage.getItem("messages")) || [];
      currentHistory.push(...data);
      sessionStorage.setItem("messages", JSON.stringify(currentHistory));
      setPrompt(data[data.length - 1].content);
      setResponding(false)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const clearPrompt = ()=> setPrompt('');

  return (
    <>
      <div>
        <h2>{prompt}</h2>
      </div>{responding? (<h4>AI is responding</h4>):
      <InputField
          socket={socket}
          nextPage={nextPage}
          page={page}
          clearPrompt={clearPrompt}

      />}
    </>
  );
};

export default Prompt;
