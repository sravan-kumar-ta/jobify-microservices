import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRectangleList } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResumeSkeleton = () => {
   return Array(3)
      .fill()
      .map((_, index) => {
         return (
            <div className="flex items-center justify-between bg-slate-100 p-2 my-2" key={index}>
               <div className="flex items-center">
                  <FaRectangleList className="mr-2 text-sky-800" />
                  <p className="text-blue-600 hover:underline">
                     <Skeleton width={160} />
                  </p>
               </div>
               
               <FaRegTrashAlt className="ml-3 text-red-500 cursor-pointer" />
            </div>
         );
      });
};

export default ResumeSkeleton;
