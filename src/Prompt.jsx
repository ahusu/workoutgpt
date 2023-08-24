import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import InputField from "./InputField";

const Prompt = ({ page, nextPage }) => {
  const [prompt, setPrompt] = useState("What is your fitness goal?");
  const [responding, setResponding] = useState(false);
  const [socket, setSocket] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    let currentHistory = JSON.parse(sessionStorage.getItem("messages")) || [];
    if(currentHistory) setHistory(currentHistory);
    newSocket.on("connect", () => {
      console.log("Socket connected!");
    });

    newSocket.on("openAIResponseChunk", (data) => {
      if (!responding) setResponding(true);
      if (data.delta.content) {
        setPrompt((prevPrompt) => `${prevPrompt}${data.delta.content}`);
      }
    });

    newSocket.on("endOfStream", () => {
      console.log("reached end of stream");
      setHistory([...history ,{
        role: "assistant",
        content: prompt,
      }]);
      sessionStorage.setItem("messages", JSON.stringify(history));
      setResponding(false);
      nextPage();
    });

    return () => {
      newSocket.off("openAIResponseChunk");
      newSocket.off("endOfStream");
      newSocket.disconnect();
    };
  }, [page]);

  const clearPrompt = () => setPrompt("");

  return (
    <>
      <div>
        <h3>{prompt}</h3>
        {page === 5 ? (
          <h2>Is there anything you want to change about the fitness plan?</h2>
        ) : (
          ""
        )}
      </div>
      {responding ? (
        <h4>AI is responding</h4>
      ) : (
        <InputField socket={socket} page={page} clearPrompt={clearPrompt} />
      )}
    </>
  );
};

export default Prompt;
