// // App.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [message, setMessage] = useState('');
//   const [chatResponse, setChatResponse] = useState('');

//   const sendMessage = async () => {
//     if (message.trim()) {
//       try {
//         const res = await axios.post('http://127.0.0.1:8000/chat', { message });
//         setChatResponse(res.data.response);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Mental Health Chatbot</h1>
//       <div>
//         <textarea
//           rows="4"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message here..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Bot Response:</h2>
//         <p>{chatResponse}</p>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { FiSun, FiMoon, FiPaperclip, FiSend, FiSmile, FiSearch, FiMoreVertical } from 'react-icons/fi';
// import { BsCheck2All } from 'react-icons/bs';
// import Avatar from 'react-avatar';
// import EmojiPicker from 'emoji-picker-react';
// import axios from 'axios'; 
// import './index.css';


// const ChatUI = () => {
//   const [theme, setTheme] = useState('light');
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     name: 'You',
//     avatar: '', // Replace with your user's avatar if needed
//     status: 'online'
//   });

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     setTheme(savedTheme);
//     if (savedTheme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     if (newTheme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   };

//   const sendMessage = async () => {
//     if (inputMessage.trim()) {
//       // Add the user's message to the chat
//       const userMessage = {
//         id: messages.length + 1,
//         text: inputMessage.trim(),
//         sender: userProfile.name,
//         timestamp: new Date().toISOString(),
//       };
//       setMessages([...messages, userMessage]);
//       setInputMessage('');

//       // Call backend API to get the response from "Calmi"
//       try {
//         const response = await axios.post('http://localhost:8000/chat', {
//           message: inputMessage.trim(),
//         });

//         const botMessage = {
//           id: messages.length + 2,
//           text: response.data.response, // Assuming the API returns {response: "Calmi's reply"}
//           sender: 'Calmi',
//           timestamp: new Date().toISOString(),
//         };

//         // Add the bot's message to the chat
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//       } catch (error) {
//         console.error('Error communicating with Calmi backend:', error);
//       }
//     }
//   };
//   const handleEmojiClick = (emojiObject) => {
//     setInputMessage(prevInput => prevInput + emojiObject.emoji);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       if (inputMessage.trim()) {
//         sendMessage();
//       }
//     }
//   };

//   return (
//     <div className={`flex h-screen antialiased text-gray-800 ${theme === 'dark' ? 'dark' : ''}`}>
//       <div className="flex flex-row h-full w-full overflow-x-hidden">
//         <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white dark:bg-gray-900 flex-shrink-0">
//           <div className="flex flex-row items-center justify-center h-12 w-full">
//             <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 h-10 w-10">
//               <FiSearch className="w-6 h-6" />
//             </div>
//             <div className="ml-2 font-bold text-2xl dark:text-white">Calmi</div>
//           </div>
//           <div className="flex flex-col items-center bg-indigo-100 dark:bg-indigo-900 border border-gray-200 dark:border-gray-700 mt-4 w-full py-6 px-4 rounded-lg">
//       <div className="h-20 w-20 rounded-full border overflow-hidden">
//         {/* Check if avatar URL exists, else use react-avatar */}
//         {userProfile.avatar ? (
//           <img src={userProfile.avatar} alt="Avatar" className="h-full w-full" />
//         ) : (
//           <Avatar name={userProfile.name} size="80" round={true} />
//         )}
//       </div>
//       <div className="text-sm font-semibold mt-2 dark:text-white">{userProfile.name}</div>
//       <div className="text-xs text-gray-500 dark:text-gray-400">{userProfile.status}</div>
//     </div>
//         </div>
//         <div className="flex flex-col flex-auto h-full p-6 bg-gray-100 dark:bg-gray-800">
//           <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white dark:bg-gray-900 h-full p-4">
//             <div className="flex flex-col h-full overflow-x-auto mb-4">
//               <div className="flex flex-col h-full">
//                 <div className="grid grid-cols-12 gap-y-2">
//                 {messages.map((message, index) => (
//                     <div key={`${message.id}-${index}`} className={`col-start-${message.sender === userProfile.name ? '6' : '1'} col-end-${message.sender === userProfile.name ? '13' : '8'} p-3 rounded-lg`}>
//                       <div className={`flex ${message.sender === userProfile.name ? 'justify-end' : 'justify-start'} items-center`}>
//                       <div className={`relative ml-3 text-sm ${message.sender === userProfile.name ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-white dark:bg-gray-700'} py-2 px-4 shadow rounded-xl`}>
//                         <div className="dark:text-white">{message.text}</div>
//                         <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500 dark:text-gray-400">
//                           {new Date(message.timestamp).toLocaleTimeString()}
//                         </div>
//                       </div>
//                     </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-row items-center h-16 rounded-xl bg-white dark:bg-gray-700 w-full px-4">
//               <div>
//                 <button className="flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
//                   <FiPaperclip className="w-5 h-5" />
//                 </button>
//               </div>
//               <div className="flex-grow ml-4">
//                 <div className="relative w-full">
//                   <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white pl-4 h-10"
//                     placeholder="Type your message..."
//                   />
//                   <button
//                     className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
//                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                   >
//                     <FiSmile className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <button
//                   className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
//                   onClick={sendMessage}
//                 >
//                   <span>Send</span>
//                   <span className="ml-2">
//                     <FiSend className="w-4 h-4" />
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showEmojiPicker && (
//           <div className="absolute bottom-24 right-16">
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//     </div>
//   );
// };

// export default ChatUI;

import React, { useState, useEffect } from 'react';
import {
  FiSun,
  FiMoon,
  FiPaperclip,
  FiSend,
  FiSmile,
  FiSearch,
  FiMoreVertical,
} from 'react-icons/fi';
import { BsCheck2All } from 'react-icons/bs';
import Avatar from 'react-avatar';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import './index.css';

const ChatUI = () => {
  const [theme, setTheme] = useState('light');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'You',
    avatar: '', // Replace with your user's avatar if needed
    status: 'online',
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      // Add the user's message to the chat
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage.trim(),
        sender: userProfile.name,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, userMessage]);
      setInputMessage('');

      // Call backend API to get the response from "Calmi"
      try {
        const response = await axios.post('http://localhost:8000/chat', {
          message: inputMessage.trim(),
        });

        const botMessage = {
          id: messages.length + 2,
          text: response.data.response, // Assuming the API returns {response: "Calmi's reply"}
          sender: 'Calmi',
          timestamp: new Date().toISOString(),
        };

        // Add the bot's message to the chat
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error communicating with Calmi backend:', error);
      }
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim()) {
        sendMessage();
      }
    }
  };

  return (
    <div
      className={`flex h-screen antialiased text-gray-800 ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* Sidebar */}
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-gradient-to-b from-indigo-500 to-purple-600 dark:bg-gray-900 flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-full text-white bg-indigo-700 h-12 w-12 shadow-md">
              {/* Calmi Icon */}
              <span className="text-2xl font-bold">C</span>
            </div>
            <div className="ml-3 font-bold text-xl text-white">CalmX</div>
          </div>
          {/* Profile Card */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-4 w-full py-6 px-4 rounded-lg shadow-md">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Avatar name={userProfile.name} size="80" round={true} />
              )}
            </div>
            <div className="text-sm font-semibold mt-2 dark:text-white">
              {userProfile.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {userProfile.status}
            </div>
          </div>
        </div>
        {/* Chat Area */}
        <div className="flex flex-col flex-auto h-full p-6 bg-gray-100 dark:bg-gray-800">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white dark:bg-gray-900 h-full p-4 shadow-md">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.id}-${index}`}
                      className={`col-start-${
                        message.sender === userProfile.name ? '6' : '1'
                      } col-end-${
                        message.sender === userProfile.name ? '13' : '8'
                      } p-3 rounded-lg`}
                    >
                      <div
                        className={`flex ${
                          message.sender === userProfile.name
                            ? 'justify-end'
                            : 'justify-start'
                        } items-center`}
                      >
                        <div
                          className={`relative ml-3 text-sm ${
                            message.sender === userProfile.name
                              ? 'bg-gradient-to-r from-indigo-100 to-indigo-300 dark:from-indigo-900 dark:to-indigo-700'
                              : 'bg-white dark:bg-gray-700'
                          } py-2 px-4 shadow-md rounded-xl`}
                        >
                          <div className="dark:text-white">{message.text}</div>
                          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500 dark:text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Input Area */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white dark:bg-gray-700 w-full px-4">
              <div>
              <button
                  aria-label="Attach file"
                  title="Attach file"
                  className="flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
                >
                  <FiPaperclip className="w-5 h-5" />
              </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white pl-4 h-10"
                    placeholder="Type your message..."
                  />
                  <button
                    className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <FiSmile className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={sendMessage}
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <FiSend className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-24 right-16">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default ChatUI;

