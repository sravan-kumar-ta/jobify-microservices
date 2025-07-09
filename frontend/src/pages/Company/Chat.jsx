import React, { useState } from "react";
import ChatList from "../../components/company/ChatList";
import ChatWindow from "../../components/company/ChatWindow";
const Chat = () => {
   const [selectedChat, setSelectedChat] = useState(null);
   return (
    <ChatWindow />
   );
};

export default Chat;
