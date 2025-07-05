import React from "react";
import JobCard from "../components/JobCard";
import { useFetchJobsQuery } from "../services/seekerService";
import JobCardSkeleton from "../components/JobCardSkeleton";

const Home = () => {
   const { data: jobsData, error, isLoading } = useFetchJobsQuery();
   
   if (error) return <div>Error: {error.message}</div>;

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-20 p-6 mt-4 mx-0 lg:mx-20">
         {isLoading ? (
            <JobCardSkeleton />
         ) : (
            jobsData?.map((job) => <JobCard key={job.id} job={job} />)
         )}
      </div>
   );
};

export default Home;
