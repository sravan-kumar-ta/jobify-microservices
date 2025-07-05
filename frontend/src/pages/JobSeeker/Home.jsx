import React, { useState, useEffect } from "react";
import { useFetchFilteredJobsQuery } from "../../services/seekerService";
import JobCardSkeleton from "../../components/JobCardSkeleton";
import JobCard from "../../components/JobCard";

const Home = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [minSalary, setMinSalary] = useState("");
   const [maxSalary, setMaxSalary] = useState("");
   const [empType, setEmpType] = useState("");
   const [sortBy, setSortBy] = useState("");
   const [page, setPage] = useState(1);
   const [allData, setAllData] = useState([]);

   const params = {
      search: searchQuery,
      min_salary: minSalary,
      max_salary: maxSalary,
      employment_type: empType,
      ordering: sortBy,
      page,
   };

   const { data, isLoading, error } = useFetchFilteredJobsQuery(params);

   const removeDuplicates = (jobs) => {
      const uniqueJobs = [];
      const jobIds = new Set();

      jobs.forEach((job) => {
         if (!jobIds.has(job.id)) {
            uniqueJobs.push(job);
            jobIds.add(job.id);
         }
      });

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

   return (
      <>
         <div className="text-center py-5 bg-slate-200 sticky top-16 z-50">
            <input
               type="text"
               placeholder="Search jobs..."
               value={searchQuery}
               onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
               }}
               className={`mx-2 px-2 outline-none border ${
                  searchQuery ? "border-green-500" : "border-sky-200"
               } focus:border-indigo-500 rounded-sm py-1 text-slate-700 font-semibold`}
            />
            <input
               type="number"
               placeholder="Min salary"
               value={minSalary}
               onChange={(e) => {
                  setMinSalary(e.target.value);
                  setPage(1);
               }}
               className={`mx-2 px-2 outline-none border ${
                  minSalary ? "border-green-500" : "border-sky-200"
               } focus:border-indigo-500 rounded-sm py-1 text-slate-700 font-semibold`}
            />
            <input
               type="number"
               placeholder="Max salary"
               value={maxSalary}
               onChange={(e) => {
                  setMaxSalary(e.target.value);
                  setPage(1);
               }}
               className={`mx-2 px-2 outline-none border ${
                  maxSalary ? "border-green-500" : "border-sky-200"
               } focus:border-indigo-500 rounded-sm py-1 text-slate-700 font-semibold`}
            />
            <select
               value={empType}
               onChange={(e) => {
                  setEmpType(e.target.value);
                  setPage(1);
               }}
               className={`mx-2 px-2 outline-none border ${
                  empType ? "border-green-500" : "border-sky-200"
               } focus:border-indigo-500 rounded-sm py-1 font-semibold`}
            >
               <option value="">All Types</option>
               <option value="Full-time">Full-time</option>
               <option value="Part-time">Part-time</option>
               <option value="Freelance">Freelance</option>
               <option value="Contract">Contract</option>
               <option value="Internship">Internship</option>
            </select>
            <select
               value={sortBy}
               onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
               }}
               className="mx-2 px-2 outline-none border border-sky-200 focus:border-indigo-500 rounded-sm py-1 font-semibold"
            >
               <option value="">Sort By</option>
               <option value="salary">Salary (Low to High)</option>
               <option value="-salary">Salary (High to Low)</option>
               <option value="date_posted">Date Posted (Oldest)</option>
               <option value="-date_posted">Date Posted (Newest)</option>
            </select>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-20 p-6 mt-4 mx-0 lg:mx-20">
            {isLoading && <JobCardSkeleton />}
            {allData &&
               allData.map((job) => <JobCard key={job.id} job={job} />)}{" "}
         </div>

         {data && data.next && (
            <div className="flex justify-center py-5">
               <button
                  className="px-4 py-1 border border-sky-500 rounded-md font-semibold tracking-wider text-slate-800 hover:bg-sky-600 hover:text-white"
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={!data.next}
               >
                  Load more...
               </button>
            </div>
         )}
      </>
   );
};

export default Home;
