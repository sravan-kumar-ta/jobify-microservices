import React from "react";
import { useFetchCompaniesQuery } from "../../services/adminService";
import { Link } from "react-router-dom";
import CompaniesSkeleton from "../../components/admin/skeletons/CompaniesSkeleton";

const Companies = () => {
   const { data, isLoading, isError, error } = useFetchCompaniesQuery();
   
   if (isError) {
      return <div>Error: {error.message}</div>;
   }

   const slugify = (name) => {
      return name
         .toLowerCase()
         .replace(/ /g, "-")
         .replace(/[^\w-]+/g, "");
   };

   return (
      <div className="md:w-2/3 mx-auto mt-4 bg-white">
         <h2 className="text-2xl font-bold text-center mb-4 sticky top-0 bg-white py-2 z-10">
            Companies
         </h2>
         <div className="md:max-h-[calc(100vh-13rem)] max-h-[calc(100vh-15rem)] overflow-y-auto">
            <table className="min-w-full table-auto border-collapse">
               <thead className="sticky top-0 bg-gray-200 z-10">
                  <tr>
                     <th className="px-4 py-2 border-b">Name</th>
                     <th className="px-4 py-2 border-b">Location</th>
                     <th className="px-4 py-2 border-b">Since</th>
                     <th className="px-4 py-2 border-b">Status</th>
                     <th className="px-4 py-2 border-b">Action</th>
                  </tr>
               </thead>
               <tbody align="center">
                  {isLoading ? (
                     <CompaniesSkeleton />
                  ) : (
                     data.map((company) => (
                        <tr key={company.id}>
                           <td className="px-4 py-2 border-b">
                              {company.title}
                           </td>
                           <td className="px-4 py-2 border-b">
                              {company.location}
                           </td>
                           <td className="px-4 py-2 border-b">
                              {company.established_date || "--"}
                           </td>
                           <td className="px-4 py-2 border-b">
                              {company.is_active ? (
                                 <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                    Approved
                                 </span>
                              ) : (
                                 <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                    Pending
                                 </span>
                              )}
                           </td>
                           <td className="px-4 py-2 border-b">
                              <Link
                                 to={`${slugify(company.title)}/profile`}
                                 state={{ company }}
                                 className="bg-blue-500 text-white px-4 py-1 rounded"
                              >
                                 View
                              </Link>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Companies;
