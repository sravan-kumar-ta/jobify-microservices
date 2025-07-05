import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApplicantSkeleton = () => {
   return (
      <div className="shadow-lg bg-gray-50 px-5 lg:px-12 xl:px-20 py-5 text-gray-700 cursor-default">
         <div className="flex justify-between">
            <div className="mr-10">
               <h3 className="text-md font-bold mb-3">
                  <Skeleton width={220} />
               </h3>
               <div className="flex font-medium">
                  <p className="mr-3">Resume:</p>
                  <Skeleton width={150} />
               </div>

               <p className="mt-4 font-medium">C V:</p>
               <p className="text-gray-700 text-justify bg-gray-100 py-2 px-4">
                  <Skeleton width={320} count={5} />
               </p>
            </div>
            <div className="text-center">
               <p className="mr-3 underline font-bold mb-2">Status</p>
               <div className="flex">
                  <Skeleton circle width={18} height={18} />
                  <p className="ms-2 text-sm font-medium text-green-500">
                     Accept
                  </p>
               </div>
               <div className="flex">
                  <Skeleton circle width={18} height={18} />
                  <p className="ms-2 text-sm font-medium text-blue-600">
                     Pending
                  </p>
               </div>
               <div className="flex">
                  <Skeleton circle width={18} height={18} />
                  <p className="ms-2 text-sm font-medium text-red-500">
                     Reject
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ApplicantSkeleton;
