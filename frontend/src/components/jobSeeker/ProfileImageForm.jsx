import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useUpdateProfileMutation } from "../../services/seekerService";

const ProfileImageForm = ({ setIsAddingPicture }) => {
   const { mutate } = useUpdateProfileMutation();
   const initialValues = {
      profile_photo: null,
   };

   const validationSchema = Yup.object({
      profile_photo: Yup.mixed()
         .nullable()
         .required("Profile photo is required")
         .test("fileSize", "File size is too large", (value) => {
            return value && value.size <= 2 * 1024 * 1024;
         })
         .test("fileFormat", "Unsupported Format", (value) => {
            return value && ["image/jpeg", "image/png"].includes(value.type);
         }),
   });

   const handleSubmit = (values) => {
      mutate(values, {
         onSuccess: () => {
            setIsAddingPicture(false);
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
         {({ setFieldValue }) => (
            <Form className="relative text-center">
               <IoMdCloseCircleOutline
                  size={18}
                  className="cursor-pointer text-orange-500 absolute right-0"
                  onClick={() => setIsAddingPicture(false)}
               />
               <input
                  type="file"
                  name="profile_photo"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                     setFieldValue("profile_photo", event.target.files[0]);
                  }}
                  className="border rounded-full text-sm w-full text-slate-500 file:p-2 file:rounded-full file:border-0 file:cursor-pointer file:text-violet-700 file:font-semibold mt-5"
               />
               <ErrorMessage
                  name="profile_photo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
               />

               <button
                  type="submit"
                  className="mt-3 px-3 py-1 rounded-full text-sm bg-indigo-500 text-white border  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
               >
                  Upload
               </button>
            </Form>
         )}
      </Formik>
   );
};

export default ProfileImageForm;
