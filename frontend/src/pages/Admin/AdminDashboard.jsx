import React from "react";
import { FaUser, FaBuilding, FaUserCog, FaSuitcase } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
   useFetchUsersCountQuery,
   useFetchJobsCountQuery,
} from "../../services/adminService";

const AdminDashboard = () => {
   const { user } = useAuth();
   const {
      data: roles,
      isLoading: isRoleLoading,
      isError: isRoleError,
      error: roleError,
   } = useFetchUsersCountQuery();
   const {
      data: jobs,
      isLoading: isJobLoading,
      isError: isJobError,
      error: jobError,
   } = useFetchJobsCountQuery();

   if (isRoleError) {
      return <div>Error: {roleError.message}</div>;
   }
   if (isJobError) {
      return <div>Error: {jobError.message}</div>;
   }

   return (
      <div className="p-6 bg-gray-100 min-h-screen">
         <div className="lg:w-3/5 xl:w-2/5 mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
               Admin Dashboard
            </h1>

            {/* Admin Details Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6">
               <div className="flex items-center mb-4">
                  <FaUserCog className="text-red-600 text-3xl mr-4" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                     Admin Details
                  </h2>
               </div>
               <div className="flex flex-col md:flex-row justify-between">
                  <div>
                     <p className="text-gray-600 text-lg mb-2">
                        <strong>Full Name:</strong> {user.first_name} {user.last_name}
                     </p>
                     <p className="text-gray-600 text-lg mb-2">
                        <strong>Username:</strong> {user.username}
                     </p>
                     <p className="text-gray-600 text-lg mb-2">
                        <strong>Email:</strong> {user.email}
                     </p>
                  </div>
                  <div className="flex items-end justify-end">
                     <NavLink
                        to={"update-admin"}
                        className="border border-blue-600 text-blue-600 text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
                     >
                        Update
                     </NavLink>
                  </div>
               </div>
            </div>

            {/* Job Seekers and Companies Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Job Seekers Section */}
               <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                     <FaUser className="text-green-600 text-3xl mr-4" />
                     <h2 className="text-2xl font-semibold text-gray-800">
                        Job Seekers
                     </h2>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-gray-600 text-lg">
                        {isRoleLoading
                           ? "Loading..."
                           : `${roles.seekers} registered`}
                     </p>
                     <NavLink
                        to={"job-seekers"}
                        className="border border-blue-600 text-blue-600 text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
                     >
                        View all
                     </NavLink>
                  </div>
               </div>

               {/* Companies Section */}
               <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                     <FaBuilding className="text-green-600 text-3xl mr-4" />
                     <h2 className="text-2xl font-semibold text-gray-800">
                        Companies
                     </h2>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-gray-600 text-lg">
                        {isRoleLoading
                           ? "Loading..."
                           : `${roles.companies} registered`}
                     </p>

                     <Link
                        to={"companies"}
                        className="border border-blue-600 text-blue-600 text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
                     >
                        View all
                     </Link>
                  </div>
               </div>
            </div>

            {/* Jobs and Applications Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
               {/* Jobs Section */}
               <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                     <FaSuitcase className="text-green-600 text-3xl mr-4" />
                     <h2 className="text-2xl font-semibold text-gray-800">
                        Jobs
                     </h2>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-gray-600 text-lg">
                        {isJobLoading
                           ? "Loading..."
                           : `${jobs.jobs} created`}
                     </p>
                     <NavLink
                        to={"jobs"}
                        className="border border-blue-600 text-blue-600 text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
                     >
                        View all
                     </NavLink>
                  </div>
               </div>

               {/* Companies Section */}
               <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                     <IoDocumentText className="text-green-600 text-3xl mr-4" />
                     <h2 className="text-2xl font-semibold text-gray-800">
                        Applications
                     </h2>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-gray-600 text-lg">
                        {isJobLoading
                           ? "Loading..."
                           : `${jobs.applications} sent`}
                     </p>

                     <Link
                        to={"application"}
                        className="border border-blue-600 text-blue-600 text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
                     >
                        View all
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminDashboard;
