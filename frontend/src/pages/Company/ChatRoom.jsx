import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useUsername } from "../../services/authService";

const ChatRoom = () => {
   const { roomID, userID } = useParams();
   // const {} = useUsername(userID);

  const handleBack = () => {
   window.history.back();
 };
   return (
      <div className="mx-auto mt-1 w-1/3 h-full flex flex-col">
         <div className="flex justify-between px-4 py-2 bg-blue-600 text-white font-semibold">
            <button onClick={handleBack} className="flex items-center text-white hover:text-gray-200">
               <IoIosArrowBack />
               Back
            </button>
            <p>Alice</p>
            <p>{userID}</p>
         </div>

         <div className="overflow-y-scroll flex-1 p-4 space-y-3 bg-gray-50 max-h-[400px]">
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Hey, are you coming to the event?
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
            <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto">
               Yes, I’ll be there at 5.
            </div>
            <div className="max-w-[70%] bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
               Awesome, see you!
            </div>
         </div>

         <div className="p-3 border-2 border-gray-300 flex items-center">
            <input
               type="text"
               className="flex-1 px-4 py-2 border border-gray-300 rounded-full"
               placeholder="Type a message..."
            />
            <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
               Send
            </button>
         </div>
      </div>
   );
};

export default ChatRoom;
