import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import { axiosSignUp } from "../../api";
//mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomSugar from "../../components/CustomSugar";
const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      ssn: "",
      department: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      position: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("require"),
      username: Yup.string().required("require"),
      password: Yup.string().min(5, "atLeast").required("require"),
      phoneNumber: Yup.string()
        // .matches(/^\d+$/, "phoneNumber must be numeric")
        .min(10, "phoneNumber must be at least 10 digits")
        .max(15, "phoneNumber must be at most 15 digits")
        .required("require"),
    }),
    onSubmit: async (values) => {
      handleSignIn(values);
    },
  });
  const handleSignIn = async (values) => {
    setLoading(true);
    await axiosSignUp(values)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {});
    setLoading(false);
  };
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-6 mx-auto md:h-screen">
      <CustomSugar customLoading={false} />
      {loading && <CircularIntegration />}
      <div className="flex flex-col min-h-screen dark:bg-gray-900 pt-5">
        <div className="justify-center items-center w-full bg-blue-100 rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-md xl:p-0 dark:bg-gray-800 border">
          <div className="p-6 w-full sm:p-8 lg:p-10">
            <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
              Create an account
            </h1>
            <p className="mb-3 text-gray-500 dark:text-gray-400">
              Join our community of designers and developers to get access to
              hundreds of UI components, plugins, resources, and design systems.
            </p>
            <form action="" className="mt-8" onSubmit={formik.handleSubmit}>
              {/* fullName && Address             */}
              <div className="flex flex-col mb-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                <div className="w-full">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="fullName"
                  >
                    Full name
                  </label>
                  <input
                    placeholder="Nguyen Van A"
                    name="fullName"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("fullName")}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    required
                    placeholder="Ho Chi Minh"
                    name="address"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("address")}
                  ></input>
                </div>
              </div>
              {/* ssn && department */}
              <div className="flex flex-col mb-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                <div className="w-full">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="ssn"
                  >
                    SSN
                  </label>
                  <input
                    placeholder="06412032103"
                    name="ssn"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("ssn")}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department
                  </label>
                  <FormControl variant="standard" className="w-full">
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...formik.getFieldProps("department")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"649958aedb17c980ea563b7a"}>
                        VBC
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* birthday && phoneNumber */}
              <div className="flex flex-col mb-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                <div className="w-full">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="dateOfBirth"
                  >
                    Date Of Birth
                  </label>
                  <input
                    required
                    placeholder="11/11/1911"
                    name="dateOfBirth"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("dateOfBirth")}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    required
                    placeholder="09001001"
                    name="phoneNumber"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("phoneNumber")}
                  ></input>
                </div>
              </div>
              {/* Email  */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  required
                  placeholder="name@company.com"
                  name="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("email")}
                ></input>
              </div>
              {/* Position */}
              <div className="mb-6">
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Position
                </label>
                <input
                  required
                  placeholder="resident"
                  name="position"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("position")}
                ></input>
              </div>
              {/* useName */}
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="@account"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("username")}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("password")}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="rePassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  name="rePassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    name="terms"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    I accept the
                    <Link
                      className="ml-1 text-blue-700 dark:text-blue-500 hover:underline hover:underline-offset-1"
                      to="/term-and-conditions"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                className="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center bg-blue-700 hover:bg-blue-500 hover:border-white border-4 ease-in duration-150 hover:shadow-md"
                type="submit"
              >
                <span className="flex justify-center items-center">
                  Create account
                </span>
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  className="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
                  to="/login/"
                >
                  Login here.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
