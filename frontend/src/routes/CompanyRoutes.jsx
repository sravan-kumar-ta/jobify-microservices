import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import JobsList from "../pages/Company/JobsList";
import Applications from "../pages/Company/Applications";
import CompanyDashboard from "../pages/Company/CompanyDashboard";
import Chat from "../pages/Company/Chat";

const companyRoutesConfig = [
   { path: "dashboard", element: <CompanyDashboard /> },
   { path: "jobs", element: <JobsList /> },
   { path: "jobs/applications/:jobID", element: <Applications /> },
   { path: "connections", element: <Chat /> },
];

const CompanyRoutes = () => {
   return (
      <Routes>
         {companyRoutesConfig.map((route, index) => (
            <Route
               key={index}
               path={route.path}
               element={
                  <ProtectedRoute
                     element={route.element}
                     requiredRole={"company"}
                  />
               }
            />
         ))}
      </Routes>
   );
};

export default CompanyRoutes;
