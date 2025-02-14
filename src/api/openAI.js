import axios from 'axios';
import { openAIKey } from '../constants';

const client=axios.create({
    headers:{
        "Content-Type":'application/json',
        "Authorization": "Bearer "+openAIKey, 
    }
});

const chatgptEndPoint="https://api.openai.com/v1/chat/completions";
const dalleEndPoint="https://api.openai.com/v1/images/generations";

export const apiCall=async(prompt,messages)=>{
    try{
        const response=await client.post(chatgptEndPoint,{
            model:"gpt-3.5-turbo",
            messages:[{
                role:"user",
                content:`Does this message want to generate an AI picture, image, art or anything similar?${prompt}.`
            }]
        })  
        console.log("Response from Server",response.data)
        
    }
    catch(e){
        console.log("Error",e)
    }
}