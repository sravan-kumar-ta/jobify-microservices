import React, { useEffect, useState } from "react";
import { useFetchJobsQuery } from "../../services/adminService";
import LoadMoreButton from "../../components/admin/LoadMoreButton";

const Jobs = () => {
   const [page, setPage] = useState(1);
   const [allData, setAllData] = useState([]);
   const [companies, setCompanies] = useState([]);
   const [selectedCompany, setSelectedCompany] = useState("");

   const { data, isLoading, isError, error } = useFetchJobsQuery(
      page,
      selectedCompany
   );

   if (error) return <div>{error}</div>;

   const removeDuplicates = (jobs) => {
      const uniqueJobs = [];
      const jobIds = new Set();
      const uniqueCompanies = new Set(companies);

      jobs.forEach((job) => {
         if (!jobIds.has(job.id)) {
            uniqueJobs.push(job);
            jobIds.add(job.id);
         }
         uniqueCompanies.add(job.company.title);
      });

      setCompanies(Array.from(uniqueCompanies));
      return uniqueJobs;
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

   const handleCompanySelect = (event) => {
      setSelectedCompany(event.target.value);
      setPage(1);
   };

   return (
      <div className="md:w-2/3 mx-auto mt-4 bg-white">
         <h2 className="text-2xl font-bold text-center mb-4 sticky top-0 bg-white py-2 z-10">
            Jobs
         </h2>
         <div className="md:max-h-[calc(100vh-13rem)] max-h-[calc(100vh-15rem)] overflow-y-auto">
            <table className="min-w-full table-auto border-collapse">
               <thead className="sticky top-0 bg-gray-200 z-10">
                  <tr>
                     <th className="px-4 py-2 border-b text-left">Title</th>
                     <td className="px-4 py-2 border-b flex justify-center">
                        <select
                           onChange={handleCompanySelect}
                           className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1"
                        >
                           <option value="">All Companies</option>
                           {companies.map((company, index) => (
                              <option key={index} value={company}>
                                 {company}
                              </option>
                           ))}
                        </select>
                     </td>
                     <th className="px-4 py-2 border-b text-right">Salary</th>
                     <th className="px-4 py-2 border-b text-center">Date</th>
                     <th className="px-4 py-2 border-b">Vaccancy</th>
                     <th className="px-4 py-2 border-b">Type</th>
                  </tr>
               </thead>
               <tbody>
                  {allData.map((job) => (
                     <tr key={job.id}>
                        <td className="px-4 py-2 border-b">{job.title}</td>
                        <td className="px-4 py-2 border-b text-center">
                           {job.company.title}
                        </td>
                        <td className="px-4 py-2 border-b text-right">
                           {job.salary.toLocaleString()}&nbsp;&#8377;
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                           {formatDate(job.date_posted)}&nbsp;to&nbsp;
                           {formatDate(job.last_date_to_apply)}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                           {job.vacancy}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                           {job.employment_type}
                        </td>
                     </tr>
                  ))}

                  {isLoading && (
                     <tr className="text-center font-semibold text-sky-600">
                        <td colSpan={6} className="p-3 tracking-widest">
                           Loding Jobs...
                        </td>
                     </tr>
                  )}

                  <tr className="text-center">
                     <td colSpan={6} className="py-3">
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

export default Jobs;
