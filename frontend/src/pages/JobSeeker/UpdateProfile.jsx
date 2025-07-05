import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Form, Formik } from "formik";
import { userUpdateValidationSchema } from "../../utils/validationSchemas";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";
import { useUpdateUserMutation } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
   const { user } = useAuth();
   const initialValues = user;
   const { mutate } = useUpdateUserMutation();
   const navigate = useNavigate();

   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
      console.log(values);
      mutate(values, {
         onSuccess: () => {
            console.log("successfully");
            navigate("/job_seeker/profile/");
         },
         onError: (err) => {
            console.log(err.response.data);
            setErrors(err.response.data);
         },
      });
      setSubmitting(false);
   };

   return (
      <div className="lg:w-3/5 xl:w-2/6 md:w-1/5 mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
         <h2 className="text-2xl font-bold mb-4 text-center">
            Update User Details
         </h2>
         <hr />
         <Formik
            initialValues={initialValues}
            validationSchema={userUpdateValidationSchema}
            onSubmit={handleSubmit}
         >
            {({ touched, errors, isSubmitting }) => (
               <Form>
                  <div className="flex space-x-4 mt-2 justify-center">
                     <InputField
                        name="first_name"
                        label="First Name"
                        touched={touched}
                        errors={errors}
                     />
                     <InputField
                        name="last_name"
                        label="Last Name"
                        touched={touched}
                        errors={errors}
                     />
                  </div>
                  <InputField
                     name="username"
                     label="Username"
                     touched={touched}
                     errors={errors}
                     className="w-5/6 mx-auto"
                  />
                  <InputField
                     name="email"
                     label="Email"
                     type="email"
                     touched={touched}
                     errors={errors}
                     className="w-5/6 mx-auto"
                  />
                  <div className="flex items-center justify-between">
                     <SubmitButton
                        isSubmitting={isSubmitting}
                        text="Update Profile"
                     />
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default UpdateProfile;
