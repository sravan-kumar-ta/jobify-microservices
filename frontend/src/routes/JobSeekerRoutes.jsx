import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/JobSeeker/Profile";
import UpdateProfile from "../pages/JobSeeker/UpdateProfile";
import AppliedJobs from "../pages/JobSeeker/AppliedJobs";
import ChatRoom from "../pages/JobSeeker/ChatRoom";
import ChatList from "../pages/JobSeeker/ChatList";

const JobSeekerRoutesConfig = [
   { path: "profile", element: <Profile /> },
   { path: "profile/update", element: <UpdateProfile /> },
   { path: "applied-jobs", element: <AppliedJobs /> },
   { path: "connections", element: <ChatList /> },
   { path: "connections/:roomID/:userID", element: <ChatRoom /> },
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
