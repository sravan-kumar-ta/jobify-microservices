import React from "react";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { useFetchJobsbyCompanyQuery } from "../../services/companyService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const JobsList = () => {
   const { data, isLoading, error } = useFetchJobsbyCompanyQuery();

   if (error) {
      console.log(error);
   }

   return (
      <div className="p-6 min-h-screen">
         <div className="lg:w-3/5 xl:w-2/5 mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
               My Jobs
            </h1>

            <div className="overflow-x-auto shadow-lg bg-slate-200 px-5 lg:px-12 xl:px-20 pt-5">
               <h3 className="text-md font-bold text-gray-700 mb-3">
                  Select a Job from the list to view applications:
               </h3>
               <ul className="max-h-screen overflow-y-auto">
                  {isLoading ? (
                     <>
                        <li className="flex items-center justify-between bg-slate-50 mb-2 p-3">
                           <div className="flex items-center">
                              <PiSuitcaseSimpleDuotone
                                 size={20}
                                 className="text-green-500 "
                              />
                              <span className="ml-3 text-lg">
                                 <Skeleton width={250} />
                              </span>
                           </div>
                           <div className="mr-6">
                              <Skeleton width={50} />
                           </div>
                        </li>
                        <li className="flex items-center justify-between bg-slate-50 mb-2 p-3">
                           <div className="flex items-center">
                              <PiSuitcaseSimpleDuotone
                                 size={20}
                                 className="text-green-500 "
                              />
                              <span className="ml-3 text-lg">
                                 <Skeleton width={250} />
                              </span>
                           </div>
                           <div className="mr-6">
                              <Skeleton width={50} />
                           </div>
                        </li>
                     </>
                  ) : (
                     data.map((job) => (
                        <li
                           key={job.id}
                           className="flex items-center justify-between bg-slate-50 mb-2 p-3"
                        >
                           <div className="flex items-center">
                              <PiSuitcaseSimpleDuotone
                                 size={20}
                                 className="text-green-500 "
                              />
                              <span className="ml-3 text-lg">{job.title}</span>
                           </div>
                           <div className="mr-6">
                              <Link
                                 to={`applications/${job.id}`}
                                 className="bg-sky-500 text-white px-2 rounded-md text-sm font-semibold shadow-sm hover:tracking-widest hover:scale-110 ease-in duration-300"
                              >
                                 View
                              </Link>
                           </div>
                        </li>
                     ))
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default JobsList;
