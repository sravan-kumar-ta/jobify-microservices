import { Form, Formik } from "formik";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { companyFormValidationSchema } from "../../utils/validationSchemas";
import { useCreateCompanyQuery } from "../../services/companyService";

const initialValues = {
   title: "",
   location: "",
   description: "",
   website: "",
   established_date: "",
};

const CompanyForm = ({ onSuccess  }) => {
   const createCompanyMutation = useCreateCompanyQuery();

   const handleSubmit = async (
      values,
      { setSubmitting, setFieldError, resetForm }
   ) => {
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );

      createCompanyMutation.mutate(filteredValues, {
         onSuccess: () => {
            resetForm();
            onSuccess?.();
            console.log("Company created");
         },
         onError: (error) => {
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
      <Formik
         initialValues={initialValues}
         validationSchema={companyFormValidationSchema}
         onSubmit={handleSubmit}
      >
         {({ isSubmitting, touched, errors }) => (
            <Form className="max-w-lg mx-auto p-6 pt-1 bg-white rounded shadow-md mt-6 relative">
               <h1 className="text-center text-2xl my-4 font-bold">
                  Create Company
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
            </Form>
         )}
      </Formik>
   );
};

export default CompanyForm;
