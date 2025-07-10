import React from "react";
import {
   useCreateChatRoomMutation,
   useGetChatListQuery,
} from "../../services/chatService";
import { useUsernames } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
   const { data: chatList, isLoading: isChatListLoading } =
      useGetChatListQuery();
   const createChatMutation = useCreateChatRoomMutation();
   const navigate = useNavigate();

   const chatUserIds = chatList?.map((item) => item.user_id) ?? [];

   const {
      data: usernames,
      isLoading: isUsernamesLoading,
      error: usernamesError,
   } = useUsernames(chatUserIds);

   const handleChat = (userId) => {
      createChatMutation.mutate(userId, {
         onSuccess: (data) => {
            console.log("Chat room created successfully.");
            navigate(`/job_seeker/connections/${data.room_name}/${userId}`);
         },
         onError: (error) => {
            console.error("Error creating chat room:", error);
         },
      });
   };

   return (
      <div className="mx-auto mt-1 w-full max-w-sm h-[500px] bg-white border border-gray-300 rounded-xl shadow-sm overflow-y-auto">
         <div className="p-4 text-xl font-semibold border-b border-gray-200 bg-gray-50">
            Chats
         </div>

         {isUsernamesLoading || isChatListLoading
            ? Array(5)
                 .fill(null)
                 .map((_, index) => (
                    <button
                       key={index}
                       className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center"
                    >
                       <p className="text-sm font-medium text-gray-400">
                          Loading....
                       </p>
                    </button>
                 ))
            : usernames?.map((user, i) => (
                 <button
                    key={i}
                    onClick={() => handleChat(user.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center"
                 >
                    <p className="text-sm font-medium text-gray-900">
                       {user.username}
                    </p>
                 </button>
              ))}

         {/* <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">Alice</p>
         </button> */}
      </div>
   );
};

export default ChatList;
