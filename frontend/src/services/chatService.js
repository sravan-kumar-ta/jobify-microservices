import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./_axiosInstance";

// --------------------
// API Functions
// --------------------
const createRoom = async (userID) => {
    const response = await axiosInstance.post("chat/get-room/", { user_id: userID });
    return response.data;
};

const getChatList = async () => {
    const response = await axiosInstance.get("chat/get-users/");
    return response.data;
}

const getPastChats = async (roomID) => {
    const response = await axiosInstance.get(`chat/messages/${roomID}/`);
    return response.data;
}

// --------------------
// Custom Hooks
// --------------------
const useCreateChatRoomMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRoom,
        onSuccess: (data) => {
            //  queryClient.invalidateQueries({ queryKey: ["chat-room"] });
            // console.log("Chat Room created successfully:", data);
            console.log("Chat Room created successfully.");
        },
        onError: (error) => {
            console.error("Error creating chatRoom:", error);
        },
    });
};

const useGetChatListQuery = () => {
    return useQuery({
        queryKey: ["chat-list"],
        queryFn: getChatList,
        staleTime: 5 * 60 * 1000,
    });
};

const useGetChatHistoryQuery = (roomID) => {
    return useQuery({
        queryKey: ["chat-hist", roomID],
        queryFn: () => getPastChats(roomID),
        enabled: !!roomID,
        staleTime: 5 * 60 * 1000,
    });
};


export { useCreateChatRoomMutation, useGetChatListQuery, useGetChatHistoryQuery };