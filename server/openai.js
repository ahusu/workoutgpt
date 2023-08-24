import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";


async function getChatGPTResponse(prompt, conversationHistory, socket) {
  const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
  });

  try {
    console.log(conversationHistory.concat({
      role: 'user',
      content: prompt
  }))
      const stream = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: conversationHistory.concat({
              role: 'user',
              content: prompt
          }),
          stream: true
      });

      for await (const part of stream) {
          console.log(part.choices[0]);
          socket.emit("openAIResponseChunk", part.choices[0]);

          if (part.choices[0].finish_reason && part.choices[0].finish_reason === 'stop') {
            console.log('emitting end of stream')
            socket.emit("endOfStream");
        }
      }


      return stream;

  } catch (error) {
    console.error('Error:', error.message);
    socket.emit("error", { error: `Failed to retrieve response from OpenAI: ${error.message}` });
  }
}


export { getChatGPTResponse };

