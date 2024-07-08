// const { GoogleGenerativeAI } = require("@google/generative-ai");
import {GoogleGenerativeAI} from '@google/generative-ai'
import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'
app.use(express.json())
app.use(cors())



dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


async function run(prompt) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    // const prompt = "Write a story about a magic backpack."
  
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}
app.post('/gemini-prompt',async(req,res)=>{
    const prompt = req.body.prompt
    if(!prompt){
        res.status(400).send('No prompt provided')
    }
    try{
        const p = await run(prompt)
        res.status(200).send(p)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    
})