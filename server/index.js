import express from "express";
import http from "http";
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";
import { getChatGPTResponse } from "./openai.js";
import morgan from 'morgan';
import promptGen from './promptGen.js'
import axios from 'axios';
import {db, postFitnessPlan} from './firebase.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(morgan('dev'))

app.post('/submission', async (req, res) => {
    try {
        const {name, phoneNumber, plan} = req.body;
        const result = await postFitnessPlan({name, phoneNumber, plan});
        res.status(200).json({ message: 'Successfully posted!', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred', error: error.message });
    }
});



io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("getOpenAIResponse", async (data) => {
        console.log("Received data:", data);  // <-- Log the received data here
        let fitnessGoal = ''

        const { answer, conversationHistory, questionNumber } = data;
        if (questionNumber === 0) {
            console.log('setting fitness Goal')
            fitnessGoal = answer;
        }

        if (!answer || !Array.isArray(conversationHistory)) {
            socket.emit("error", { error: 'Prompt or conversationHistory missing or invalid' });
            return;
        }

        const stream = await getChatGPTResponse(promptGen(questionNumber,fitnessGoal), conversationHistory, socket);

    });


    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
