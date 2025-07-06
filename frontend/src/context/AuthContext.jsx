import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   const updateUser = (newUser) => {
      setUser(newUser);
   };

   return (
      <AuthContext.Provider value={{ user, updateUser, setUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
