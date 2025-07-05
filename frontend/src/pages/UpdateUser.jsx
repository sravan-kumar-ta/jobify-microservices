import { Formik, Form } from "formik";
import { userUpdateValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthContext";
import { useUpdateUserMutation } from "../services/authService";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
   const { user } = useAuth();
   const { mutate, isLoading, isError, error } = useUpdateUserMutation();
   const navigate = useNavigate();

   const handleSubmit = (values, { setFieldError, setSubmitting }) => {
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );
      mutate(filteredValues, {
         onSuccess: () => {
            console.log("User updated successfully");
            navigate("/admin/dashboard/");
         },
         onError: (error) => {
            console.error("Error updating user:", error);

            if (error.response && error.response.data) {
               const errors = error.response.data;
               Object.keys(errors).forEach((field) => {
                  setFieldError(field, errors[field][0]);
               });
            }
         },
      });

      setSubmitting(false);
   };

   return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
         <h2 className="text-2xl font-bold mb-4">Update Admin Details</h2>
         <Formik
            initialValues={user}
            validationSchema={userUpdateValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
         >
            {({ touched, errors, isSubmitting }) => (
               <Form>
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
                  <div className="flex items-center justify-between">
                     <SubmitButton isSubmitting={isSubmitting} text="Update" />
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default UpdateUser;
