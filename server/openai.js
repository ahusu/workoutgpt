import OpenAI from "openai";


async function getChatGPTResponse(prompt, conversationHistory) {


  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  // Append user's message to the conversation history
  conversationHistory.push({
    role: "user",
    content: prompt
  });

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4.0-turbo",
      messages:[{
        role: 'user',
        content: prompt
      }, conversationHistory]
    })
    for await (const part of stream) {
      console.log(part.choices[0])
    }

    // const conversation = await openai.completions.create({
    //   model: "gpt-4.0-turbo",
    //   messages: conversationHistory
    // });

    // Extract the assistant's reply
    const assistantReply = conversation.choices[0].message.content;

    // Append assistant's reply to the conversation history
    conversationHistory.push({
      role: "assistant",
      content: assistantReply
    });

    return stream;

  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export { getChatGPTResponse };

