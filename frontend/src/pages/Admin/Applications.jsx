import React, { useEffect, useState } from "react";
import { useFetchApplicationsQuery } from "../../services/adminService";
import LoadMoreButton from "../../components/admin/LoadMoreButton";

const Applications = () => {
   const [page, setPage] = useState(1);
   const [allData, setAllData] = useState([]);

   const { data, isLoading, isError, error } = useFetchApplicationsQuery(page);

   if (error) return <div>{error}</div>;

   const removeDuplicates = (applications) => {
      const uniqueApps = [];
      const appIds = new Set();

      applications.forEach((application) => {
         if (!appIds.has(application.id)) {
            uniqueApps.push(application);
            appIds.add(application.id);
         }
      });

      return uniqueApps;
   };

   useEffect(() => {
      if (data && data.results) {
         if (page === 1) {
            setAllData(removeDuplicates(data.results));
         } else {
            setAllData((prevData) =>
               removeDuplicates([...prevData, ...data.results])
            );
         }
      }
   }, [data, page]);

   const formatDate = (isoString) => {
      const date = new Date(isoString);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
   };

   const handleLoadMore = () => {
      setPage((prev) => prev + 1);
   };

   return (
      <div className="md:w-2/3 mx-auto mt-4 bg-white">
         <h2 className="text-2xl font-bold text-center mb-4 sticky top-0 bg-white py-2 z-10">
            Applications
         </h2>
         <div className="md:max-h-[calc(100vh-13rem)] max-h-[calc(100vh-15rem)] overflow-y-auto">
            <table className="min-w-full table-auto border-collapse">
               <thead className="sticky top-0 bg-gray-200 z-10">
                  <tr>
                     <th className="px-4 py-2 border-b text-left">Applicant</th>
                     <th className="px-4 py-2 border-b text-left">Job</th>
                     <th className="px-4 py-2 border-b text-left">Company</th>
                     <th className="px-4 py-2 border-b text-left">Date</th>
                     <th className="px-4 py-2 border-b text-left">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {allData.map((app) => (
                     <tr key={app.id}>
                        <td className="px-4 py-2 border-b">
                           {app.applicant.user.get_full_name}
                        </td>
                        <td className="px-4 py-2 border-b">{app.job.title}</td>
                        <td className="px-4 py-2 border-b">
                           {app.job.company.title}
                        </td>
                        <td className="px-4 py-2 border-b">
                           {formatDate(app.applied_at)}
                        </td>
                        <td className="px-4 py-2 border-b">{app.status}</td>
                     </tr>
                  ))}

                  {isLoading && (
                     <tr className="text-center font-semibold text-sky-600">
                        <td colSpan={5} className="p-3 tracking-widest">
                           Loding Applications...
                        </td>
                     </tr>
                  )}

                  <tr className="text-center">
                     <td colSpan={5} className="py-3">
                        {data?.next && (
                           <LoadMoreButton
                              onClick={handleLoadMore}
                              isLoading={isLoading}
                           />
                        )}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Applications;
