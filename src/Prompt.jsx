import React, { useState, useEffect } from "react";
import axios from "axios";

const Prompt = ({ page, input }) => {
  const [prompt, setPrompt] = useState('What is your fitness goal?');

  useEffect(()=>{
    let fetchPrompt = async ()=>{
      let convo = JSON.parse(sessionStorage.getItem("messages")) || [
        {
          role: "system",
          content: "You are a helpful assistant."
        }
      ];
      let res = await axios.post('/api', {
        page: page,
        input: input,
        conversationHistory: convo,
      })
    sessionStorage.setItem("messages", JSON.stringify(res.data));
    setPrompt(res.data[-1].content);
    }
  },[])


  return (
    <div>
      <h2>{prompt}</h2>
    </div>
  );
};

export default Prompt;
