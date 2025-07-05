import React from "react";
import { FaBuilding, FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { LuTimer } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExperienceSkeleton = () => {
   return Array(3)
      .fill()
      .map((_, index) => {
         return (
            <div
               className="flex justify-between bg-slate-100 p-2 my-2 relative"
               key={index}
            >
               <div className="flex items-center space-x-1">
                  <HiOutlineBadgeCheck className="text-sky-800" />
                  <div className="border-l-2 border-l-zinc-400 pl-1">
                     <strong className="text-zinc-600">
                        <Skeleton width={150} />
                     </strong>
                     <div className="flex items-center">
                        <FaBuilding className="mr-1 text-zinc-600" size={14} />
                        <p className="text-zinc-500">
                           <Skeleton width={150} />
                        </p>
                     </div>
                     <div className="flex items-center">
                        <LuTimer className="mr-1 text-zinc-600" size={14} />
                        <div className="flex">
                           <p className="text-zinc-500">
                              <Skeleton width={60} />
                           </p>
                           <p className="text-zinc-500 mx-2">to</p>
                           <p className="text-zinc-500">
                              <Skeleton width={60} />
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute flex items-start space-x-3 right-2">
                  <GrEdit className="text-yellow-500 cursor-pointer" />
                  <FaRegTrashAlt className="text-red-500 cursor-pointer" />
               </div>
            </div>
         );
      });
};

export default ExperienceSkeleton;
