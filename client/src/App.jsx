import { useState } from 'react'

import './App.css'

function App() {
  const [prompt,setPrompt] = useState('');
  const [result,setResult] = useState('');
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:3000/gemini-prompt',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({prompt})

      })
      if(res.ok){
        const data = await res.text();
        setResult(data);
        console.log(data)
      }
      else{
        console.log('error')
      }
    }
    catch(error){
      console.log(error)
    }
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Gemini AI Prompt Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows="4"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Generate
          </button>
        </div>
      </form>
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-2">Response:</h2>
        <p className="text-gray-700">{result}</p>
      </div>
    </div>
  );
}


export default App
