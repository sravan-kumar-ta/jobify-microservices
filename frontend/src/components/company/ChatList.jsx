import React from "react";

const ChatList = () => {
   return (
      <div className="mx-auto mt-1 w-full max-w-sm h-[500px] bg-white border border-gray-300 rounded-xl shadow-sm overflow-y-auto">
         <div className="p-4 text-xl font-semibold border-b border-gray-200 bg-gray-50">
            Chats
         </div>

         {/* {chatUsers.map((user) => (
       <button
          key={user.id}
          onClick={() => onSelectChat(user)}
          className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center"
       >
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
       </button>
    ))} */}
         <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">Alice</p>
         </button>
         <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">Alice</p>
         </button>
         <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">Alice</p>
         </button>
      </div>
   );
};

export default ChatList;
