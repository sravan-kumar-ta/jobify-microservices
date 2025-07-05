import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/JobSeeker/Profile";
import UpdateProfile from "../pages/JobSeeker/UpdateProfile";
import AppliedJobs from "../pages/JobSeeker/AppliedJobs";

const JobSeekerRoutesConfig = [
   { path: "profile", element: <Profile /> },
   { path: "profile/update", element: <UpdateProfile /> },
   { path: "applied-jobs", element: <AppliedJobs /> },
];

const JobSeekerRoutes = () => {
   return (
      <Routes>
         {JobSeekerRoutesConfig.map((route, index) => (
            <Route
               key={index}
               path={route.path}
               element={
                  <ProtectedRoute
                     element={route.element}
                     requiredRole={"job_seeker"}
                  />
               }
            />
         ))}
      </Routes>
   );
};

export default JobSeekerRoutes;
