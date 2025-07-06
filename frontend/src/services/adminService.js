import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./_axiosInstance";

// --------------------
// API Functions
// --------------------

const fetchJobSeekers = async ({ page = 1 }) => {
   const response = await axiosInstance.get("auth/admin/job-seekers/", {
      params: { page },
   });
   return response.data;
};

const fetchCompanies = async () => {
   const response = await axiosInstance.get("company/admin/companies/");
   return response.data;
};

const fetchUsersCount = async () => {
   const response = await axiosInstance.get("auth/admin/user-count/");
   return response.data;
};

const fetchJobsCount = async () => {
   const response = await axiosInstance.get("company/admin/job-stats/");
   return response.data;
};

const updateCompanyStatus = async (data) => {
   const response = await axiosInstance.patch("company/admin/company-approval/", {
      ...data,
   });
   return response.data;
};

const fetchJobs = async (page, selectedCompany) => {
   const response = await axiosInstance.get("company/admin/jobs/", {
      params: { page, company__title: selectedCompany },
   });
   return response.data;
};

const fetchApplications = async (page) => {
   const response = await axiosInstance.get("company/admin/applications/", {
      params: { page },
   });
   return response.data;
};

// --------------------
// Custom Hooks
// --------------------

const useFetchJobSeekersQuery = ({ page = 1 }) => {
   return useQuery({
      queryKey: ["jobSeekers", page],
      queryFn: () => fetchJobSeekers({ page }),
      staleTime: 5 * 60 * 1000,
   });
};

const useFetchCompaniesQuery = () => {
   return useQuery({
      queryKey: ["companies"],
      queryFn: fetchCompanies,
      staleTime: 5 * 60 * 1000,
   });
};

const useFetchUsersCountQuery = () => {
   return useQuery({
      queryKey: ["user-count"],
      queryFn: fetchUsersCount,
      staleTime: 5 * 60 * 1000,
   });
};

const useFetchJobsCountQuery = () => {
   return useQuery({
      queryKey: ["job-count"],
      queryFn: fetchJobsCount,
      staleTime: 5 * 60 * 1000,
   });
};

const useUpdateCompanyStatusMutation = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateCompanyStatus,
      onMutate: async (data) => {
         const { company_id, is_active } = data;

         const previousCompanies = queryClient.getQueryData(
            ["companies"] || []
         );

         queryClient.setQueryData(["companies"], (oldCompanies = []) =>
            oldCompanies.map((company) =>
               company.id === company_id ? { ...company, is_active } : company
            )
         );

         return { previousCompanies };
      },
      onError: (err, data, context) => {
         console.error("Error updating company status:", err);
         if (context?.previousCompanies) {
            queryClient.setQueryData(["companies"], context.previousCompanies);
         }
      },
      onSuccess: () => {
         // queryClient.invalidateQueries(['companies']);
      },
   });
};

const useFetchJobsQuery = (page, selectedCompany) => {
   return useQuery({
      queryKey: ["admin-jobs", page, selectedCompany],
      queryFn: () => fetchJobs(page, selectedCompany),
      staleTime: 5 * 60 * 1000,
   });
};

const useFetchApplicationsQuery = (page) => {
   return useQuery({
      queryKey: ["admin-applications", page],
      queryFn: () => fetchApplications(page),
      staleTime: 5 * 60 * 1000,
   });
};

export {
   useFetchJobSeekersQuery,
   useFetchCompaniesQuery,
   useFetchUsersCountQuery,
   useFetchJobsCountQuery,
   useUpdateCompanyStatusMutation,
   useFetchJobsQuery,
   useFetchApplicationsQuery,
};
