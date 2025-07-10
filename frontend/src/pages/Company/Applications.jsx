import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFilteredApplicationsQuery } from "../../services/companyService";
import { useParams } from "react-router-dom";
import Applicant from "./Applicant";
import ApplicantSkeleton from "../../components/company/skeletons/ApplicantSkeleton";

const ApplicantsList = () => {
   const { jobID } = useParams();
   // console.log("jobID:", jobID);
   const [application, setApplication] = useState();
   const [showDropdown, setShowDropdown] = useState(false);
   const [filterStatus, setFilterStatus] = useState("all");
   const { data, isLoading, error } = useFilteredApplicationsQuery(
      jobID,
      filterStatus
   );

   if (error) return <p>Error: {error.message}</p>;

   const formattedDate = (appliedAt) => {
      const date = new Date(appliedAt);
      const day = date.getUTCDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getUTCFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      return formattedDate;
   };

   const handleFilter = (status) => {
      setFilterStatus(status);
      setShowDropdown(false);
   };

   return (
      <div className="p-6 min-h-screen">
         <div className="lg:w-3/5 xl:w-2/5 mx-auto overflow-x-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
               Applications List
            </h1>

            <table className="w-full text-sm text-left text-gray-500 mt-10">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                     <th scope="col" className="pl-6 py-3">
                        #
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Applicant ID
                     </th>
                     <th scope="col" className="px-6 py-3 text-center">
                        Application Date
                     </th>
                     <div className="flex justify-center items-center py-3">
                        <p className="font-bold">Status</p>
                        <div className="relative">
                           <button
                              className="text-gray-600 hover:bg-gray-200 pl-1 pr-2"
                              id="filterButton"
                              onClick={() => setShowDropdown(!showDropdown)}
                           >
                              ▼
                           </button>
                           {showDropdown && (
                              <div className="absolute capitalize right-0 mt-2 w-24 bg-white border border-gray-300 shadow-md z-10 rounded-sm">
                                 <ul className="py-1 text-sm text-gray-700">
                                    <li
                                       className="block px-4 py-2 hover:bg-gray-100 cursor-pointer tracking-wider"
                                       onClick={() => handleFilter("all")}
                                    >
                                       All
                                    </li>
                                    <li
                                       className="block px-4 py-2 hover:bg-gray-100 cursor-pointer tracking-wider"
                                       onClick={() => handleFilter("accepted")}
                                    >
                                       Accepted
                                    </li>
                                    <li
                                       className="block px-4 py-2 hover:bg-gray-100 cursor-pointer tracking-wider"
                                       onClick={() => handleFilter("rejected")}
                                    >
                                       Rejected
                                    </li>
                                    <li
                                       className="block px-4 py-2 hover:bg-gray-100 cursor-pointer tracking-wider"
                                       onClick={() => handleFilter("pending")}
                                    >
                                       Pending
                                    </li>
                                 </ul>
                              </div>
                           )}
                        </div>
                     </div>
                     <th scope="col" className="px-6 py-3 text-center">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {isLoading ? (
                     <>
                        {[...Array(5)].map((_, index) => (
                           <tr key={index} className="bg-white border-b">
                              {Array(5)
                                 .fill()
                                 .map((_, idx) => (
                                    <td key={idx} className="px-6 py-4">
                                       <Skeleton />
                                    </td>
                                 ))}
                           </tr>
                        ))}
                     </>
                  ) : data.length === 0 ? (
                     <tr className="bg-white border-b">
                        <td
                           className="px-6 py-4 text-center text-amber-500 font-semibold tracking-widest"
                           colSpan={5}
                        >
                           There are no applications to display.
                        </td>
                     </tr>
                  ) : (
                     data.map((application, index) => (
                        <tr key={application.id} className="bg-white border-b">
                           <th
                              scope="row"
                              className="pl-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                           >
                              {index + 1}
                           </th>
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                           >
                              {application.applicant_id.slice(0, 8) + "..."}
                           </th>
                           <td className="px-6 py-4 text-center">
                              {formattedDate(application.applied_at)}
                           </td>
                           <td className="px-6 py-4 text-center">
                              {{
                                 pending: (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                       Pending
                                    </span>
                                 ),
                                 accepted: (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                       Accepted
                                    </span>
                                 ),
                                 rejected: (
                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                       Rejected
                                    </span>
                                 ),
                              }[application.status] || ""}
                           </td>
                           <td className="px-6 py-4 text-center">
                              <button
                                 onClick={() => setApplication(application)}
                                 className="bg-sky-500 text-white px-2 rounded-md font-semibold shadow-sm hover:bg-gray-100 hover:text-sky-500 ease-in duration-100"
                              >
                                 View
                              </button>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>

            {/* {application ? (
               <Applicant
                  application={application}
                  setApplication={setApplication}
                  jobID={jobID}
               />
            ) : (
               <ApplicantSkeleton />
            )} */}
            {application && (
               <Applicant
                  application={application}
                  setApplication={setApplication}
                  jobID={jobID}
               />
            )}
         </div>
      </div>
   );
};

export default ApplicantsList;
