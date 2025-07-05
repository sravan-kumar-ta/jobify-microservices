import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
   first_name: Yup.string().required("First name is required"),
   last_name: Yup.string().required("Last name is required"),
   username: Yup.string().required("Username is required"),
   email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
   role: Yup.string().required("Role is required"),
   password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
});

const loginValidationSchema = Yup.object().shape({
   username: Yup.string().required("Username is required"),
   password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
});

const userUpdateValidationSchema = registerValidationSchema.omit([
   "role",
   "password",
   "confirmPassword",
]);

const companyFormValidationSchema = Yup.object().shape({
   title: Yup.string().required("Title is required."),
   location: Yup.string().required("Location is required."),
   website: Yup.string().notRequired(),
   established_date: Yup.date().nullable().notRequired(),
});

const JobFormValidationSchema = Yup.object().shape({
   title: Yup.string().required("Title is required."),
   salary: Yup.number().notRequired(),
   vacancy: Yup.number().required("Vacancy is required."),
   description: Yup.string().required("Description is required."),
   employment_type: Yup.string().required("Employment type is required."),
   last_date_to_apply: Yup.date().notRequired(),
});

const ExperienceValidationSchema = Yup.object().shape({
   job_title: Yup.string().required("Title is required."),
   company: Yup.string().required("Company name is required."),
   start_date: Yup.date().required("Start date is required."),
   end_date: Yup.date()
      .nullable()
      .when("is_current", {
         is: false,
         then: (schema) =>
            schema
               .required("End date is required for non-current experiences.")
               .min(
                  Yup.ref("start_date"),
                  "End date must be after the start date."
               ),
         otherwise: (schema) => schema.nullable(),
      }),
   is_current: Yup.boolean().default(false),
});

export {
   registerValidationSchema,
   loginValidationSchema,
   companyFormValidationSchema,
   JobFormValidationSchema,
   userUpdateValidationSchema,
   ExperienceValidationSchema,
};
