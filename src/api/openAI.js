import axios from 'axios';
import { openAIKey } from '../constants';

const chatgptEndPoint = "https://api.groq.com/openai/v1/chat/completions";
const dalleEndPoint = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";

const client = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + openAIKey,
    }
});

export const apiCall = async (prompt, messages) => {
    try {
        const response = await chatgpApiCall(prompt, messages || []);
        console.log("Full Response:", response);

        return { success: true, messages: response.messages || [] };
    } catch (e) {
        console.log("Error:", e);
        return { success: false, msg: e.message };
    }
};

const chatgpApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(chatgptEndPoint, {
            model: "llama-3.3-70b-versatile",
            messages: messages,
        });

        let answer = res.data?.choices?.[0]?.message?.content;

        if (!answer) {
            throw new Error("No response from API");
        }

        messages.push({
            role: "assistant",
            content: answer.trim(),
        });

        return { success: true, messages };
    } catch (e) {
        console.log("Error:", e);
        return { success: false, msg: e.message };
    }
};

const dalleApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(dalleEndPoint, { input: prompt });

        return { success: true, data: res.data };
    } catch (e) {
        console.log("Error:", e);
        return { success: false, msg: e.message };
    }
};
