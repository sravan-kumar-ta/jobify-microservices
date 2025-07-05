import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({
   name,
   label,
   type = "text",
   touched,
   errors,
   disabled,
   placeholder = "",
   className = null,
}) => (
   <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
         {label}
      </label>
      <Field
         type={type}
         name={name}
         id={name}
         disabled={disabled}
         placeholder={placeholder}
         className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
            touched[name] && errors[name]
               ? "border-red-500"
               : touched[name]
               ? "border-green-500"
               : "border-gray-300"
         }`}
      />
      <ErrorMessage
         name={name}
         component="div"
         className="text-red-500 text-sm mt-1"
      />
   </div>
);

export default InputField;
