import { Form, Formik } from "formik";
import React from "react";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { companyFormValidationSchema } from "../../utils/validationSchemas";
import { IoCloseSharp } from "react-icons/io5";
import { useUpdateCompanyMutation } from "../../services/companyService";

const CompanyUpdate = ({ initialValues, onClick }) => {
   const { mutate, isLoading, isError, error } = useUpdateCompanyMutation();

   const handleSubmit = async (values) => {
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );
      mutate(filteredValues, {
         onSuccess: () => {
            onClick(true);
            // console.log("Company updated successfully");
         },
         onError: (error) => {
            console.error("Error updating company:", error);
         },
      });
   };

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={companyFormValidationSchema}
         onSubmit={handleSubmit}
      >
         {({ isSubmitting, touched, errors }) => (
            <Form className="max-w-lg mx-auto p-6 pt-1 bg-white rounded shadow-md mt-6 relative">
               <h1 className="text-center text-2xl my-4 font-bold">
                  Update Company
               </h1>
               <hr />
               <div className="flex space-x-11 mt-2">
                  <InputField
                     name="title"
                     label="Title"
                     touched={touched}
                     errors={errors}
                  />
                  <InputField
                     name="location"
                     label="Location"
                     touched={touched}
                     errors={errors}
                  />
               </div>
               <div className="flex space-x-11 mt-2">
                  <InputField
                     name="website"
                     label="Website"
                     touched={touched}
                     errors={errors}
                  />
                  <InputField
                     name="established_date"
                     label="Established Date"
                     touched={touched}
                     errors={errors}
                     type="date"
                  />
               </div>
               <InputField
                  name="description"
                  label="Description"
                  touched={touched}
                  errors={errors}
               />
               <div className="flex items-center justify-between">
                  <SubmitButton isSubmitting={isSubmitting} text="Submit" />
               </div>

               <button
                  onClick={onClick}
                  className="absolute top-2 right-2 rounded-full bg-zinc-100 p-1 text-2xl text-red-400 hover:bg-zinc-200 hover:text-red-600 shadow-xl transition-shadow duration-300"
               >
                  <IoCloseSharp />
               </button>
            </Form>
         )}
      </Formik>
   );
};

export default CompanyUpdate;
