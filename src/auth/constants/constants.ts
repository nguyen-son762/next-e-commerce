export type InitialSignupValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phonenumber: string;
  confirmPassword: string;
};

export const FIELDS_INPUT_SIGNUP = [
  {
    name: "first_name",
    label: "Firstname",
  },
  {
    name: "last_name",
    label: "Lastname",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "phonenumber",
    label: "Phone number",
  },
  {
    name: "password",
    label: "Password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
  },
];

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
