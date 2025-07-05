import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobCardSkeleton = () => {
   return Array(6)
      .fill()
      .map((_, index) => {
         return (
            <div
               className="md:w-11/12 w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
               key={index}
            >
               <span className="text-gray-600 bg-gray-100 py-1 px-2 rounded-bl-lg absolute top-0 right-0">
                  <Skeleton width={100} />
               </span>

               <header className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                     <Skeleton width={150} />
                  </h2>
               </header>
               <hr />

               <div className="flex items-center ml-4 mt-2">
                  <FaRegBuilding className="text-gray-700 mr-1" />
                  <p className="text-gray-600">
                     <Skeleton width={200} />
                  </p>
               </div>

               <div className="flex items-center ml-4">
                  <GiMoneyStack className="text-gray-700 mr-1" />
                  <p className="text-gray-500">
                     <Skeleton width={200} />
                  </p>
               </div>
               <div className="flex items-center ml-4">
                  <FaLocationDot className="text-gray-600 mr-1" />
                  <p className="text-gray-600">
                     <Skeleton width={200} />
                  </p>
               </div>

               <div className="flex items-center ml-4 mb-2">
                  <MdCalendarMonth className="text-gray-700 mr-1" />
                  <p className="text-gray-500">
                     <Skeleton width={200} />
                  </p>
               </div>
               <hr />

               <section className="px-4 pb-4 mt-2">
                  <p className="text-gray-700">
                     <Skeleton width={"full"} count={3} />
                  </p>
               </section>

               <footer className="px-4 py-4 bg-gray-100 border-t border-gray-200 text-center">
                  <button
                     disabled
                     className={
                        "mx-auto w-2/4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center cursor-not-allowed opacity-50"
                     }
                  >
                     <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                     >
                        <circle
                           className="opacity-25"
                           cx="12"
                           cy="12"
                           r="10"
                           stroke="currentColor"
                           strokeWidth="4"
                        ></circle>
                        <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                        ></path>
                     </svg>
                     Loading...
                  </button>
               </footer>
            </div>
         );
      });
};

export default JobCardSkeleton;
