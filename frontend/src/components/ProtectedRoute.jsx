import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element: Component, requiredRole }) => {
   const { user, updateUser } = useAuth();
   const { isLoading, error, refetch } = useUser({ enabled: false });

   const [isFetching, setIsFetching] = useState(false);
   const [hasFetched, setHasFetched] = useState(false);

   useEffect(() => {
      if (!user && localStorage.getItem("access_token")) {
         setIsFetching(true);
         refetch()
            .then((response) => {
               if (response.data?.role) {
                  updateUser(response.data);
                  setHasFetched(true);
               }
               setIsFetching(false);
            })
            .catch(() => {
               setIsFetching(false);
               setHasFetched(true);
            });
      } else {
         setHasFetched(true);
      }
   }, [user, refetch, updateUser]);

   if (isLoading || isFetching || !hasFetched) {
      return <div>Loading...</div>;
   }

   if (error || !user) {
      return <Navigate to="/login" />;
   }

   if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" />;
   }

   return Component;
};

export default ProtectedRoute;
