import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineSend } from 'react-icons/ai';

const ChatBot = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePromptSubmission = async (event) => {
    event.preventDefault();

    setMessages((prevChatLog) => [...prevChatLog, { type: 'user', message: inputPrompt }]);
    setInputPrompt('');

    try {
      const response = await axios.post('/chat', { inputPrompt });
      const newResponse = response.data.response;
      setMessages([...messages, { type: 'bot', message: newResponse }]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen max-w-4xl mx-auto relative flex flex-col">
    <h3 className="text-4xl font-semibold drop-shadow-xl relative inline-block text-center ">
    Chat with AI
    <div className=" w-60 mx-auto h-1 bg-buttonColor rounded-3xl "></div>
  </h3>
      <div className="h-96 flex-gr border w-2/3 mx-auto flex flex-col rounded-3xl p-5 overflow-y-auto mt-10">
        <h2 className="text-2xl font-bold text-center">Relic AI</h2>
        <hr className="w-2/3 mx-auto" />
        {messages.map((message, index) => (
          <div key={index} className={`text-${message.type === 'user' ? 'right' : 'left'}`}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handlePromptSubmission} className="w-2/3 mx-auto flex">
        <input
          type="text"
          placeholder="Enter your message here.."
          onChange={(event) => setInputPrompt(event.target.value)}
          value={inputPrompt}
          className="border rounded-3xl px-3 py-1 text-sm font-semibold w-2/3 3  mx-auto focus:outline-none relative bottom-9"
        />
        <button type="submit" className=" relative bottom-9 right-28">
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
