import { useRegister } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const initialValues = {
   first_name: "",
   last_name: "",
   username: "",
   email: "",
   password: "",
   confirmPassword: "",
   role: "job_seeker",
};

const Register = () => {
   const { mutateAsync: register } = useRegister();
   const navigate = useNavigate();

   const handleSubmit = async (
      values,
      { setSubmitting, resetForm, setFieldError }
   ) => {
      const { status, data } = await register({
         first_name: values.first_name,
         last_name: values.last_name,
         username: values.username,
         email: values.email,
         password: values.password,
         role: values.role,
      });

      if (status === "success") {
         resetForm();
         navigate("/login", { state: { username: values.username } });
      } else if (status === "error") {
         if (typeof data === "object") {
            Object.keys(data).forEach((field) => {
               setFieldError(field, data[field][0]);
            });
         } else {
            setFieldError("general", data);
         }
      }

      setSubmitting(false);
   };

   return (
      <div className="bg-gray-100 min-h-screen">
         <div className="pt-1">
            <Formik
               initialValues={initialValues}
               validationSchema={registerValidationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, touched, errors }) => (
                  <Form className="max-w-md mx-auto p-6 pt-1 bg-white rounded shadow-md mt-10">
                     <h1 className="text-center text-2xl my-4 font-bold">
                        SignUp
                     </h1>
                     <hr />
                     <div className="flex space-x-4 mt-2">
                        <div className="w-1/2">
                           <InputField
                              name="first_name"
                              label="First Name"
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                        <div className="w-1/2">
                           <InputField
                              name="last_name"
                              label="Last Name"
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                     </div>
                     <InputField
                        name="username"
                        label="Username"
                        touched={touched}
                        errors={errors}
                     />
                     <InputField
                        name="email"
                        label="Email"
                        type="email"
                        touched={touched}
                        errors={errors}
                     />

                     <div className="mb-4">
                        <label
                           htmlFor="role"
                           className="block text-gray-700 font-bold mb-2"
                        >
                           Role
                        </label>
                        <Field
                           as="select"
                           name="role"
                           id="role"
                           className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                              touched.role && errors.role
                                 ? "border-red-500"
                                 : touched.role
                                 ? "border-green-500"
                                 : "border-gray-300"
                           }`}
                        >
                           <option value="job_seeker">Job Seeker</option>
                           <option value="company">Company</option>
                        </Field>
                        <ErrorMessage
                           name="role"
                           component="div"
                           className="text-red-500 text-sm mt-1"
                        />
                     </div>
                     <div className="flex space-x-4 mt-2">
                        <div className="w-1/2">
                           <InputField
                              name="password"
                              label="Password"
                              type="password"
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                        <div className="w-1/2">
                           <InputField
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                     </div>
                     <div className="flex flex-col items-center justify-center">
                        <SubmitButton
                           isSubmitting={isSubmitting}
                           text="Signup"
                        />
                        <span className="mt-2">
                           Already have an account?&nbsp;&nbsp;
                           <Link
                              to={"/login"}
                              className="text-blue-600 border-b-2 border-blue-400 hover:text-blue-800"
                           >
                              Login
                           </Link>
                        </span>
                     </div>

                     {/* Display general form error if exists */}
                     {errors.general && (
                        <div className="text-red-500 text-center mt-2">
                           {errors.general}
                        </div>
                     )}
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default Register;
