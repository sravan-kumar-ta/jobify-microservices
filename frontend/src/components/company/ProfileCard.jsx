import React from "react";
import { FaGlobe } from "react-icons/fa";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";

const ProfileCard = ({ initialValues, onEdit="updateCompany", onAddJob="addJob" }) => {
   const logoUrl = "https://placehold.co/200x200";

   return (
      <div className="lg:w-2/6 mx-10 bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-3">
         <div className="flex items-center">
            <img
               src={logoUrl}
               alt="company_logo"
               className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
               <h1 className="text-2xl font-bold text-gray-800">
                  {initialValues.title || "Title not added yet."}
               </h1>
               <div className="flex items-center mt-2 text-gray-600">
                  <FaLocationDot className="mr-2" />
                  <span>
                     {initialValues.location || "Location not added yet."}
                  </span>
               </div>
               <div className="flex items-center mt-1 text-gray-600">
                  <FaCalendarDays className="mr-2" />
                  <span>
                     {initialValues.established_date || "Date not added yet"}
                  </span>
               </div>
            </div>
         </div>
         <p className="text-gray-700 mt-4 italic">
            {initialValues.description || "Description not added yet."}
         </p>

         <div className="md:flex justify-between mt-4">
            <div className="flex items-center">
               <FaGlobe className="text-gray-600 mr-2" />
               {initialValues.website ? (
                  <a
                     href={initialValues.website}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                     Open website
                  </a>
               ) : (
                  <span className="italic">Website not added yet.</span>
               )}
            </div>
            <div className="flex mt-4 md:mt-0 justify-between">
               <button
                  onClick={onAddJob}
                  className="text-sm sm:text-base mr-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
               >
                  Add Job
               </button>
               <button
                  onClick={onEdit}
                  className="text-sm sm:text-base bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
               >
                  Update Company
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProfileCard;
