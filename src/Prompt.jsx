import React, { useState, useEffect } from "react";
import {io} from "socket.io-client";
import InputField from "./InputField";

const Prompt = ({ page, nextPage, setPlan, finalize }) => {
  const [prompt, setPrompt] = useState("What is your fitness goal?");
  const [responding, setResponding] = useState(false);
  const [socket, setSocket] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    let currentHistory;
    try {
      currentHistory = JSON.parse(sessionStorage.getItem("messages"));
    } catch (error) {
      console.error("Error parsing session storage data:", error);
    }

    if (currentHistory) setHistory(currentHistory);

    newSocket.on("connect", () => {
      console.log("Socket connected!");
    });

    newSocket.on("openAIResponseChunk", (data) => {
      console.log("Incoming data:", data.delta.content);
      if (!responding) setResponding(true);
      if (data.delta.content) {
          setPrompt((prevPrompt) => {
              const newPrompt = `${prevPrompt}${data.delta.content}`;
              console.log("Updated prompt:", newPrompt);
              return newPrompt;
          });
      }
  });


  newSocket.on("endOfStream", () => {
    setPrompt((currentPrompt) => {
      if (page === 5) setPlan(currentPrompt)
      setHistory(prevHistory => {
          const updatedHistory = [
              ...prevHistory,
              {
                  role: "assistant",
                  content: currentPrompt,
              },
          ];
          console.log("Updated history:", updatedHistory);
          sessionStorage.setItem("messages", JSON.stringify(updatedHistory));
          return updatedHistory;
      });
      return currentPrompt;  // Keep the prompt unchanged
  });
    setResponding(false);
    if (page < 5) nextPage();
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
          <h2>Is there anything you want to change about the fitness plan? If not, please click Finalize to move onto the next step.</h2>
        ) : (
          ""
        )}
      </div>
      {responding ? (
        <h4>AI is responding</h4>
      ) : (
        <InputField
          socket={socket}
          page={page}
          clearPrompt={clearPrompt}
          setHistory={setHistory}
          history={history}
          finalize={finalize}
        />
      )}
    </>
  );
};

export default Prompt;
