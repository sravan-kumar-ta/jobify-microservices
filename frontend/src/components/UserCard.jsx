import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserCard = ({ user, onEdit }) => {
   const userImage = "https://placehold.co/200x200";

   return (
      <div className="lg:w-2/6 mx-10 bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-3">
         <div className="flex items-center">
            <img
               src={userImage}
               alt="User Image"
               className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
               <h1 className="text-2xl font-bold text-gray-800">
                  {user.get_full_name}
               </h1>
               <div className="flex items-center mt-2 text-gray-600">
                  <FaUser className="mr-2" />
                  <span>{user.username}</span>
               </div>
               <div className="flex items-center mt-1 text-gray-600">
                  <MdEmail className="mr-2" />
                  <span>{user.email}</span>
               </div>
            </div>
         </div>

         <div className="flex items-end justify-center h-24 relative">
            <button
               onClick={onEdit}
               className="text-sm sm:text-base bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
            >
               Update User
            </button>
         </div>
      </div>
   );
};

export default UserCard;
