import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import {
   useUpdateApplicationMutation,
   useUserResumeQuery,
} from "../../services/companyService";
import { useUsername } from "../../services/authService";
import { useCreateChatRoomMutation } from "../../services/chatService";
import { useNavigate } from "react-router-dom";

const Applicant = ({ application, setApplication, jobID }) => {
   const [status, setStatus] = useState(application.status);
   const [selectedResumeId, setSelectedResumeId] = useState(null);
   const [resumeURL, setResumeURL] = useState(null);
   const createChatMutation = useCreateChatRoomMutation();
   const navigate = useNavigate();
   const [chatLoading, setChatLoading] = useState(false); // Placeholder for any additional state if needed

   const prevStatus = application.status;
   const newStatus = status;

   const { data: username, isLoading } = useUsername(application.applicant_id);
   const { mutate } = useUpdateApplicationMutation(
      jobID,
      prevStatus,
      newStatus
   );
   const {
      data,
      isLoading: reumeIsLoading,
      error,
   } = useUserResumeQuery(selectedResumeId, {
      skip: !selectedResumeId, // Skip until ID is selected
   });

   useEffect(() => {
      setStatus(application.status);
   }, [application]);

   const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
   };

   const handleUpdate = () => {
      mutate({ id: application.id, data: { status: newStatus } });
   };

   const openResume = (resumeId) => {
      console.log("Opening resume with ID:", resumeId);
      setSelectedResumeId(resumeId);
   };

   useEffect(() => {
      if (!selectedResumeId) return;

      if (error) {
         console.error("Error fetching resume:", error);
      } else if (reumeIsLoading) {
         console.log("Loading resume...");
      } else if (data) {
         setResumeURL(data.resume);
         window.open(data.resume, "_blank", "noopener,noreferrer");
      }
   }, [selectedResumeId, data, reumeIsLoading, error]);

   const handleChat = () => {
      setChatLoading(true);
      createChatMutation.mutate(application.applicant_id, {
         onSuccess: (data) => {
            console.log("Chat room created successfully:", data);
            navigate(
               `/company/connections/${data.room_name}/${application.applicant_id}`
            );
         },
         onError: (error) => {
            console.error("Error creating chat room:", error);
            setChatLoading(false);
         },
      });
   };

   return (
      <div className="shadow-lg bg-gray-200 px-5 lg:px-12 xl:px-20 py-5 text-gray-700 relative">
         <div className="flex justify-between">
            <div className="mr-10">
               <h3 className="text-md font-bold mb-3">
                  Username:
                  {isLoading
                     ? "Loading..."
                     : username || application.applicant_id}
               </h3>
               <div className="flex font-medium">
                  <p className="mr-3">Resume:</p>
                  {reumeIsLoading ? (
                     <span className="text-gray-500">Loading resume...</span>
                  ) : error ? (
                     <span className="text-red-500">
                        Resume is deleted by the user.!
                     </span>
                  ) : resumeURL ? (
                     <a
                        href={resumeURL}
                        target="_blank"
                        className="text-blue-600 hover:underline flex items-center"
                        rel="noopener noreferrer"
                     >
                        Open resume <MdOpenInNew className="ml-1" />
                     </a>
                  ) : (
                     <button
                        onClick={() => openResume(application.resume_id)}
                        className="text-blue-600 hover:underline flex items-center"
                     >
                        Open resume <MdOpenInNew className="ml-1" />
                     </button>
                  )}
               </div>

               <p className="mt-4 font-medium">Cover Letter:</p>
               <p className="text-gray-700 text-justify bg-gray-100 p-2">
                  {application.cover_letter || "No cover letter added."}
               </p>
               <button
                  onClick={handleChat}
                  className="mt-2 w-full py-1.5 px-4 me-2 mb-2 text-xs font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10"
               >
                  {chatLoading ? "Loading chat..." : "Chat with applicant"}
               </button>
            </div>
            <div className="text-center">
               <p className="mr-3 underline font-bold mb-2">Status</p>

               {/* Radio buttons for status */}
               <div className="flex items-center mb-2">
                  <input
                     id="accepted"
                     type="radio"
                     value="accepted"
                     name="status"
                     className="w-4 h-4 cursor-pointer"
                     checked={status === "accepted"}
                     onChange={() => handleStatusChange("accepted")}
                  />
                  <label
                     htmlFor="accepted"
                     className="ms-2 text-sm font-medium text-green-500 cursor-pointer"
                  >
                     Accept
                  </label>
               </div>
               <div className="flex items-center mb-2">
                  <input
                     id="pending"
                     type="radio"
                     value="pending"
                     name="status"
                     className="w-4 h-4 cursor-pointer"
                     checked={status === "pending"}
                     onChange={() => handleStatusChange("pending")}
                  />
                  <label
                     htmlFor="pending"
                     className="ms-2 text-sm font-medium text-blue-600 cursor-pointer"
                  >
                     Pending
                  </label>
               </div>
               <div className="flex items-center">
                  <input
                     id="rejected"
                     type="radio"
                     value="rejected"
                     name="status"
                     className="w-4 h-4 cursor-pointer"
                     checked={status === "rejected"}
                     onChange={() => handleStatusChange("rejected")}
                  />
                  <label
                     htmlFor="rejected"
                     className="ms-2 text-sm font-medium text-red-500 cursor-pointer"
                  >
                     Reject
                  </label>
               </div>
               <button
                  onClick={handleUpdate}
                  className="text-sm px-2 py-1 bg-sky-500 mt-4 text-white rounded-md hover:bg-blue-600"
               >
                  Update status
               </button>
            </div>
         </div>
         <FaWindowClose
            onClick={() => setApplication(null)}
            className="absolute right-4 top-2 text-red-700 cursor-pointer"
         />
      </div>
   );
};

export default Applicant;
