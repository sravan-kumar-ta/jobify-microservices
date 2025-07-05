import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin, useLogout } from "../services/authService";
import { Form, Formik } from "formik";
import { loginValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
   const [errorMessage, setErrorMessage] = useState("");
   const { mutateAsync: login } = useLogin();
   const { mutateAsync: logout } = useLogout();
   const { updateUser } = useAuth();
   const navigate = useNavigate();

   const location = useLocation();
   const username = location.state?.username || "";

   const initialValues = {
      username: username,
      password: "",
   };

   const handleSubmit = async (values) => {
      setErrorMessage("");

      const response = await login(values);
      if (response?.status && response.status === "success") {
         const role = response.user?.role;
         updateUser(response.user);
         if (role === "admin") {
            navigate("/admin/dashboard");
         } else if (role === "company") {
            navigate("/company/dashboard");
         } else if (role === "job_seeker") {
            navigate("/");
         } else {
            logout();
         }
      } else {
         setErrorMessage(response.data.detail);
      }
   };

   return (
      <div className="bg-gray-100 min-h-screen">
         <div className="pt-16">
            <Formik
               initialValues={initialValues}
               validationSchema={loginValidationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, touched, errors }) => (
                  <Form className="max-w-sm mx-auto p-16 pt-6 bg-white rounded shadow-md mt-10">
                     <h1 className="text-center text-2xl my-4 font-bold">
                        SignIn
                     </h1>
                     <hr />
                     <InputField
                        name="username"
                        label="Username"
                        touched={touched}
                        errors={errors}
                     />
                     <InputField
                        type="password"
                        name="password"
                        label="Password"
                        touched={touched}
                        errors={errors}
                     />

                     {errorMessage && (
                        <div className="text-red-500 text-center my-2">
                           {errorMessage}
                        </div>
                     )}

                     <div className="flex flex-col items-center justify-center">
                        <SubmitButton
                           isSubmitting={isSubmitting}
                           text="Login"
                        />
                        <span className="mt-2">
                           Don't have an account?&nbsp;&nbsp;
                           <Link
                              to={"/register"}
                              className="text-blue-600 border-b-2 border-blue-400 hover:text-blue-800"
                           >
                              Register
                           </Link>
                        </span>
                     </div>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default LoginForm;
