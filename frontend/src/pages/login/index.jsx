import React, { useEffect, useState } from "react";
//formik
import { useFormik } from "formik";

import { Link, useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";
//mui
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { axiosLogin } from "../../api";
import { saveInfo } from "../../state/user/userSlice";
import { toast } from "react-toastify";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { decryptPrivateKey, encryptPrivateKey } from "../../utils";
import { createConnectedContract } from "../../contract";
import { Checkbox } from "@nextui-org/react";
import { Button } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);
  const formik = useFormik(
    {
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object({
        password: Yup.string().min(5, "atLeast").required("require"),
        username: Yup.string().required("require"),
      }),
      onSubmit: async (values) => {
        handleSignIn(values);
      },
    },
    [user]
  );

  const handleSignIn = async (values) => {
    setLoading(true);

    await axiosLogin(values)
      .then((res) => {
        dispatch(
          saveInfo({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            id: res.data.user._id,
            password: res.data.user.password,
            hashedPrivateKey: res.data.user.hashedPrivateKey,
            username: res.data.user.username,
          })
        );
        const privateKey = decryptPrivateKey(
          res.data.user.hashedPrivateKey,
          values.password
        );
        createConnectedContract(privateKey);
        toast.success("Đăng nhập thành công");
        setLoading(false);
        setTimeout(() => {
          navigate(location.state?.from?.pathname || "/home");
        });
      }, 0)
      .catch((error) => {
        // toast.error("Đăng nhập thất bại");
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="relative flex items-center h-screen w-screen justify-center gap-28">
      {<CustomSugar customLoading={false} />}
      {loading && <CustomRotatingSquare />}
      <div className="w-full bg-white  max-w-xl">
        <div className="py-6 pl-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  " Chào",
                  300, // wait 1s before replacing "Mice" with "Hamsters"
                  "Chào mừng",
                  300,
                  "Chào mừng bạn",
                  300,
                  " Chào mừng bạn đến với",
                  300,
                ]}
                wrapper="span"
                speed={50}
                // style={{ fontSize: "2em", display: "inline-block" }}
                repeat={1}
              />
              <span className="block uppercase text-7xl font-medium py-4 -ml-10 mb-20 text-blue-500">
                Electron
              </span>
            </h1>
          </div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <Input
                className="p-10"
                size="lg"
                label="Tài khoản"
                error={
                  formik.touched.username && formik.errors.username
                    ? true
                    : false
                }
                {...formik.getFieldProps("username")}
              />
            </div>
            <div>
              <Input
                type="password"
                size="lg"
                label="Mật khẩu"
                className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                // name="password"
                // value={formik.values.password}
                {...formik.getFieldProps("password")}
              />
              {/* {formik.errors.password && (
                <p className="text-red-500">Mật khẩu tối thiểu 5 kí tự</p>
              )} */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-400 dark:text-gray-300"
                  >
                    Nhớ tài khoản
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Quên mật khẩu ?
              </a>
            </div>
            <Button
              variant="gradient"
              type="submit"
              className="bg-blue-600 text-white p-3 w-full rounded-lg"
            >
              Đăng nhập
            </Button>
            <p className="text-sm font-light text-black dark:text-gray-400">
              Bạn vẫn chưa có tài khoản?{"     "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Đăng kí tại đây
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-full h-screen overflow-hidden flex justify-center items-center">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
