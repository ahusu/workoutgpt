import { Configuration, OpenAIApi } from "openai";


async function getChatGPTResponse(prompt, conversationHistory) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Append user's message to the conversation history
  conversationHistory.push({
    role: "user",
    content: prompt
  });

  try {
    const conversation = await openai.createCompletion({
      model: "gpt-4.0-turbo",
      messages: conversationHistory
    });

    // Extract the assistant's reply
    const assistantReply = conversation.data.choices[0].message.content;

    // Append assistant's reply to the conversation history
    conversationHistory.push({
      role: "assistant",
      content: assistantReply
    });

    return conversationHistory;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export { getChatGPTResponse };

