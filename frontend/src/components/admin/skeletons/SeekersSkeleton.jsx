import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SeekersSkeleton = () => {
   return Array(4)
      .fill()
      .map((_, index) => {
         return (
            <tr key={index}>
               <td className="px-4 py-2 border-b">
                  <Skeleton width={100} />
               </td>
               <td className="px-4 py-2 border-b">
                  <Skeleton width={80} />
               </td>
               <td className="px-4 py-2 border-b">
                  <Skeleton width={150} />
               </td>
               <td className="px-4 py-2 border-b">
                  <Skeleton width={80} />
               </td>
               <td className="px-4 py-2 border-b">
                  <Skeleton width={70} height={30} />
               </td>
            </tr>
         );
      });
};

export default SeekersSkeleton;
