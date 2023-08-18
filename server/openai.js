import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";


async function getChatGPTResponse(prompt, conversationHistory) {
  const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
  });

  try {
      const stream = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: conversationHistory.concat({
              role: 'user',
              content: prompt
          }),
          stream: true
      });

      for await (const part of stream) {
          console.log(part.choices[0])
      }

      // Extract the assistant's reply
      const assistantReply = conversation.choices[0].message.content;

      return stream;

  } catch (error) {
      console.error('Error:', error.message);
      return null;
  }
}


export { getChatGPTResponse };

