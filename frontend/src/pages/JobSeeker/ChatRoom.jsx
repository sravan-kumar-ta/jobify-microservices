import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useUsernames } from "../../services/authService";

const baseURL = import.meta.env.VITE_WEBSOCKET_URL;

const ChatRoom = () => {
   const { roomID, userID } = useParams();
   const { data: usernames, isLoading } = useUsernames([userID]);
   const socketRef = useRef(null);
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");

   const parts = roomID.split("_");
   const sender = parts[1] === userID ? parts[1] : parts[2];

   useEffect(() => {
      const socket = new WebSocket(`${baseURL}${roomID}/`);
      socketRef.current = socket;

      socket.onopen = () => {
         console.log("Connected to WebSocket");
      };

      socket.onmessage = (event) => {
         const data = JSON.parse(event.data);
         setMessages((prev) => [...prev, data]);
      };

      socket.onclose = () => {
         console.log("Disconnected from WebSocket");
      };

      socket.onerror = (err) => {
         console.error("WebSocket error:", err);
      };

      return () => {
         socket.close();
      };
   }, [roomID]);

   const sendMessage = () => {
      if (socketRef.current && input.trim()) {
         socketRef.current.send(JSON.stringify({ message: input, sender }));
         setInput("");
      }
   };

   const handleEnter = (e) => {
      if (e.key === "Enter") sendMessage();
   };

   const handleBack = () => {
      window.history.back();
   };

   return (
      <div className="mx-auto mt-1 w-5/6 md:w-1/3 h-full flex flex-col">
         <div className="flex justify-between px-4 py-2 bg-blue-600 text-white font-semibold">
            <button
               onClick={handleBack}
               className="flex items-center text-white hover:text-gray-200"
            >
               <IoIosArrowBack />
               Back
            </button>
            {isLoading ? (
               <p>Loading...</p>
            ) : (
               <p>{usernames?.[0]?.username || "User"}</p>
            )}
            <p></p>
         </div>

         <div className="overflow-y-scroll flex-1 p-4 space-y-3 bg-gray-50 max-h-[400px]">
            {messages.map((msg, i) => (
               <div
                  key={i}
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                     msg.sender === userID
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-200 text-gray-900"
                  }`}
               >
                  {msg.message}
               </div>
            ))}
         </div>

         <div className="p-3 border-2 border-gray-300 flex items-center">
            <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleEnter}
               className="flex-1 px-4 py-2 border border-gray-300 rounded-full"
               placeholder="Type a message..."
            />
            <button
               onClick={sendMessage}
               className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
               Send
            </button>
         </div>
      </div>
   );
};

export default ChatRoom;
