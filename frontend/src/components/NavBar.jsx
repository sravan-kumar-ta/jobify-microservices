import { NavLink } from "react-router-dom";
import { useGetUserQuery, useLogout } from "../services/authService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavBar = () => {
   const { mutateAsync: logout } = useLogout();
   const { data: user, isLoading } = useGetUserQuery();

   const handleLogout = () => {
      logout();
   };

   let links = [];
   const role = user?.role;
   if (role) {
      if (role === "admin") {
         links.push({ href: "/admin/dashboard", text: "Dashboard" });
      } else if (role === "job_seeker") {
         links.push({ href: "/", text: "Home" });
         links.push({ href: "/job_seeker/applied-jobs", text: "Applications" });
         links.push({ href: "/job_seeker/profile", text: "Profile" });
      } else if (role === "company") {
         links.push({ href: "/company/dashboard", text: "Dashboard" });
         links.push({ href: "/company/jobs", text: "Jobs" });
         links.push({ href: "/company/connections", text: "Chats" });
      }
   } else {
      links.push({ href: "/signup", text: "Signup" });
      links.push({ href: "/login", text: "Login" });
   }

   if (isLoading) {
      return (
         <nav className="bg-gray-800 p-4 sticky top-0 z-50 shadow-xl">
            <div className="container flex items-center justify-center mx-auto">
               <Skeleton width={55} height={25} className="mr-5" />
               <Skeleton width={55} height={25} className="mr-5" />
               <Skeleton width={55} height={25} className="mr-5" />
               <Skeleton width={55} height={25} className="mr-5" />
            </div>
         </nav>
      );
   }

   return (
      <nav className="bg-gray-800 p-4 sticky top-0 z-50 shadow-xl">
         <div className="container flex items-center justify-center mx-auto">
            <div className="flex-col">
               {links.map((link, index) => (
                  <NavLink
                     key={index}
                     to={link.href}
                     className={({ isActive }) =>
                        isActive
                           ? "text-white bg-blue-500 px-3 py-2 rounded mx-1 md:mx-5"
                           : "text-white hover:bg-gray-700 px-3 py-2 rounded bg-gray-900 mx-1 md:mx-5"
                     }
                  >
                     {link.text}
                  </NavLink>
               ))}

               {role && (
                  <button
                     onClick={handleLogout}
                     className="text-white hover:bg-red-500 px-3 py-2 rounded bg-gray-900 mx-1 md:mx-5"
                  >
                     Logout
                  </button>
               )}
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
