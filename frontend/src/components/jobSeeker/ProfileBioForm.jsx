import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUpdateProfileMutation } from "../../services/seekerService";

const ProfileBioForm = ({ setIsAddingBio, profile = null }) => {
   const { mutate } = useUpdateProfileMutation();
   const initialValues = {
      bio: profile.bio || "",
   };

   const validationSchema = Yup.object({
      bio: Yup.string().max(100, "Bio must be 100 characters or less"),
   });

   const handleSubmit = (values) => {
      mutate(values, {
         onSuccess: () => {
            setIsAddingBio(false);
         },
         onError: (err) => {
            console.log(err);
         },
      });
   };

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
      >
         {() => (
            <Form className="text-right">
               <Field
                  as="textarea"
                  name="bio"
                  rows="3"
                  className="w-full border border-slate-300 p-1 rounded-md focus:outline-none focus:border-sky-200 focus:ring-sky-300 focus:ring-1 sm:text-sm"
               />
               <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm mt-1"
               />

               <div className="flex justify-end mt-1">
                  <button
                     type="button"
                     onClick={() => setIsAddingBio(false)}
                     className="mr-2 px-3 py-1 rounded-full text-sm text-indigo-500 border border-indigo-600 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                     Clear
                  </button>

                  <button
                     type="submit"
                     className="px-3 py-1 rounded-full text-sm bg-indigo-500 text-white border  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                     Update Bio
                  </button>
               </div>
            </Form>
         )}
      </Formik>
   );
};

export default ProfileBioForm;
