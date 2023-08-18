import express from "express";
import http from "http";
import path from 'path';
import { Server } from "socket.io";
import { getChatGPTResponse } from "./openai.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));


io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("getOpenAIResponse", async (data) => {
        const { prompt, conversationHistory } = data;

        if (!prompt || !Array.isArray(conversationHistory)) {
            socket.emit("error", { error: 'Prompt or conversationHistory missing or invalid' });
            return;
        }

        const stream = await getChatGPTResponse(prompt, conversationHistory);

        if (stream) {
            for await (const part of stream) {
                socket.emit("openAIResponseChunk", part.choices[0]);
            }
        } else {
            console.error("Failed to retrieve response from OpenAI.");
            socket.emit("error", { error: "Failed to retrieve response from OpenAI." });
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
