import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  Button as MuiButton,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import {
  Input,
  useInput,
  Grid,
  Card,
  Textarea,
  Checkbox,
  Loading,
  Popover,
  Row,
  Text,
  Button,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import AssignDropDown from "../../components/AssignDropDown";
import DropFile from "../../components/DropFile";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { toast } from "react-toastify";
import { axiosCreateDoc, axiosGetAllDepartment } from "../../api";
import { useSelector } from "react-redux";

export default function NewSignup() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const [departmentList, setDepartmentList] = React.useState([]);
  useEffect(() => {
    axiosGetAllDepartment()
      .then((res) => {
        console.log(res);
        setDepartmentList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleNext = () => {
    if (
      !isLastStep &&
      fullName !== "" &&
      secret != "" &&
      urgency != "" &&
      desc != ""
    )
      setActiveStep((cur) => cur + 1);
    else setNeedFill(true);
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  //---------page1--------
  const { value: fullName, reset, bindings } = useInput("");
  const {
    value: cccd,
    reset: cccdReset,
    bindings: cccdBindings,
  } = useInput("");
  const {
    value: phone,
    reset: phoneReset,
    bindings: phoneBindings,
  } = useInput("");
  const {
    value: address,
    reset: addressReset,
    bindings: addressBindings,
  } = useInput("");
  const {
    value: email,
    reset: emailReset,
    bindings: emailBindings,
  } = useInput("");
  const {
    value: department,
    reset: departmentReset,
    bindings: departmentBindings,
  } = useInput("Viet Nam Blockchain Corporation");
  console.log(department, departmentList);
  const {
    value: role,
    reset: roleReset,
    bindings: roleBindings,
  } = useInput("");
  const {
    value: desc,
    reset: descReset,
    bindings: descBindings,
  } = useInput("");
  const {
    value: birthday,
    reset: birthReset,
    bindings: birthBindings,
  } = useInput("");

  const [secret, setSecret] = React.useState("Neutral");
  const [urgency, setUrgency] = React.useState("Neutral");
  const [needFill, setNeedFill] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNeedFill(false);
    }, 3000);
  }, [needFill]);
  const handleSecret = (value) => {
    console.log(value);
    setSecret(value);
  };

  const validateTitle = (value, type = "") => {
    if (value === "" && needFill === true) {
      return 3;
    }
    if (value != "") return 2;
    return 1;
  };
  const returnHelper = (code) => {
    if (code == 3)
      return {
        text: "Yêu cầu nhập nội dung",
        color: "error",
      };
    if (code == 2)
      return {
        text: "Nội dung hợp lệ",
        color: "success",
      };
    return {
      text: "Request",
      color: "default",
    };
  };
  const helper = React.useMemo(() => {
    const code = validateTitle(fullName);
    return returnHelper(code);
  }, [fullName, needFill]);
  const cccdHelper = React.useMemo(() => {
    const code = validateTitle(cccd);
    return returnHelper(code);
  }, [cccd, needFill]);
  const birthHelper = React.useMemo(() => {
    const code = validateTitle(birthday);
    return returnHelper(code);
  }, [birthday, needFill]);
  const phoneHelper = React.useMemo(() => {
    const code = validateTitle(phone);
    return returnHelper(code);
  }, [phone, needFill]);
  const addressHelper = React.useMemo(() => {
    const code = validateTitle(address);
    return returnHelper(code);
  }, [address, needFill]);

  const emailHelper = React.useMemo(() => {
    const code = validateTitle(email);
    if (code == 3)
      return {
        text: "Yêu cầu nhập nội dung",
        color: "error",
      };
    if (code == 2)
      return {
        text: "Nội dung hợp lệ",
        color: "success",
      };
    return {
      text: "Request",
      color: "default",
    };
  }, [email, needFill]);
  const departmentHelper = React.useMemo(() => {
    const code = validateTitle(department);
    return returnHelper(code);
  }, [department, needFill]);
  const roleHelper = React.useMemo(() => {
    const code = validateTitle(role);
    return returnHelper(code);
  }, [role, needFill]);
  const descriptionHelper = React.useMemo(() => {
    const code = validateTitle(desc);
    return returnHelper(code);
  }, [desc, needFill]);

  //----page2------------------
  const {
    value: account,
    reset: accountReset,
    bindings: accountBindings,
  } = useInput("");
  const {
    value: password,
    reset: passwordReset,
    bindings: passwordBindings,
  } = useInput("");
  const {
    value: repassword,
    reset: repasswordReset,
    bindings: repasswordBindings,
  } = useInput("");
  const accountHelper = React.useMemo(() => {
    const code = validateTitle(account);
    return returnHelper(code);
  });
  const passwordHelper = React.useMemo(() => {
    const code = validateTitle(password);
    return returnHelper(code);
  });
  const repasswordHelper = React.useMemo(() => {
    const code = validateTitle(repassword);
    if (repassword !== "" && repassword !== password)
      return {
        text: "Mật khẩu không khớp",
        color: "error",
      };
    else {
      if (repassword !== "" && repassword === password)
        return {
          text: "Mật khẩu đã khớp",
          color: "success",
        };
    }
    return returnHelper(code);
  });

  //----page3-----------------handle submit
  const handleSubmit = async () => {
    // setIsLoading((pre) => !pre);
    console.log(
      fullName,
      address,
      cccd,
      birthday,
      phone,
      email,
      department,
      role,
      desc,
      account,
      password
    );
    // await axiosCreateDoc({
    //   fullName,
    //   secretState: secret,
    //   receiver: approvals.map((item) => {
    //     return item._id;
    //   }),
    //   description: desc,
    //   fileLink: file,
    // })
    //   .then((res) => {
    //     setTimeout(() => {
    //       setIsLoading((pre) => !pre);
    //       toast.success(`Tạo mới thành công`);
    //       setActiveStep(0);
    //       reset();
    //       setSecret("Neutral");
    //       setUrgency("Neutral");
    //       setDesc("");
    //       setApprovals([]);
    //       setConfirm(false);
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setIsLoading(false);
    //   });
  };
  const [confirm, setConfirm] = useState(false);
  //loading
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="w-full py-4 px-40">
      {<CustomSugar customLoading={false} />}
      {isLoading && <CustomRotatingSquare />}
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue" : "blue-gray"}
            >
              Thông tin cá nhân
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue" : "gray"}
              className="font-normal"
            >
              Họ và tên, số điện thoại, v.v
            </Typography>
          </div>
        </Step>
        <Step>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue" : "blue-gray"}
            >
              Tài khoản
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue" : "gray"}
              className="font-normal"
            >
              Điền tài khoản và mật khẩu
            </Typography>
          </div>
        </Step>
        <Step>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue" : "blue-gray"}
            >
              Summary
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue" : "gray"}
              className="font-normal"
            >
              Review information before submit
            </Typography>
          </div>
        </Step>
      </Stepper>
      <Card
        isHoverable
        className="mt-32 flex justify-center  py-10 px-5 rounded-lg "
      >
        <AnimatePresence mode="popLayout">
          {/* page1 */}
          {(activeStep == 0 || activeStep == 2) && (
            <motion.form
              aria-label="Detail"
              key={"page1"}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full pb-10 mb-10 border-b border-blue-gray-400"
            >
              <div className="flex  mb-6 mt-10 w-full justify-between">
                <div className="flex flex-wrap w-full mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Họ và tên
                  </label>
                  <Input
                    {...bindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={helper.color}
                    color={helper.color}
                    helperColor={helper.color}
                    helperText={helper.text}
                    type="email"
                    css={{
                      width: "95%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="flex flex-wrap mb-6 flex-col w-[95%]">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    CCCD/CMND
                  </label>
                  <Input
                    {...cccdBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={cccdHelper.color}
                    color={cccdHelper.color}
                    helperColor={cccdHelper.color}
                    helperText={cccdHelper.text}
                    type="email"
                    css={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </div>
              </div>
              <div className="flex  mb-6 mt-10 w-full justify-between">
                <div className="flex flex-wrap w-full mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ngày sinh
                  </label>
                  <Input
                    {...birthBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={birthHelper.color}
                    color={birthHelper.color}
                    helperColor={birthHelper.color}
                    helperText={birthHelper.text}
                    type="email"
                    css={{
                      width: "95%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="flex flex-wrap w-full mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Số điện thoại cá nhân
                  </label>
                  <Input
                    {...phoneBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={phoneHelper.color}
                    color={phoneHelper.color}
                    helperColor={phoneHelper.color}
                    helperText={phoneHelper.text}
                    type="email"
                    css={{
                      width: "95%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="flex flex-wrap w-[95%] mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Địa chỉ cá nhân
                  </label>
                  <Input
                    {...addressBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={addressHelper.color}
                    color={addressHelper.color}
                    helperColor={addressHelper.color}
                    helperText={addressHelper.text}
                    type="email"
                    css={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              <div className="flex  mb-6 mt-10 w-full justify-between">
                <div className="flex flex-wrap w-full mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Địa chỉ e-mail
                  </label>
                  <Input
                    {...emailBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={emailHelper.color}
                    color={emailHelper.color}
                    helperColor={emailHelper.color}
                    helperText={emailHelper.text}
                    type="email"
                    css={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap  mb-6 mt-10">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Làm việc tại
                  </label>
                  <div className="mt-5 flex gap-2">
                    <Select
                      variant="standard"
                      label="Cơ quan"
                      value={department}
                      {...departmentBindings}
                      error={department === "" && needFill == true}
                      success={department !== ""}
                    >
                      {/* {departmentList.map(({ name, abbr, _id }, idx) => {
                        console.log(name, abbr, _id);
                        return (
                          <Option key={name} value={name}>
                            {name}
                          </Option>
                        );
                      })} */}

                      <Option value="BK">Trương Dai hoc Bach Khoa HCM</Option>
                      <Option value="VBC">
                        Vietnam Blockchain Corporation
                      </Option>
                    </Select>
                    <Select
                      variant="standard"
                      label="Vị trí"
                      {...roleBindings}
                      color="blue-gray"
                      error={role === "" && needFill == true}
                      success={role !== ""}
                    >
                      <Option value={"1"}>A</Option>
                      <Option value={"2"}>B</Option>
                      <Option value={"3"}>C</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap flex-col  mb-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Mô tả cá nhân
                </label>
                <Textarea
                  {...descBindings}
                  className="w-full"
                  status={descriptionHelper.color}
                  color={descriptionHelper.color}
                  helperColor={descriptionHelper.color}
                  helperText={descriptionHelper.text}
                  rows={8}
                />
              </div>
            </motion.form>
          )}
          {/* page2 */}
          {(activeStep == 1 || activeStep == 2) && (
            <motion.form
              key={"page2"}
              aria-label="Approval"
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full pb-10 mb-10 border-b border-blue-gray-300"
            >
              <div className="flex  mb-6 mt-10 w-full justify-start">
                <div className="flex flex-wrap w-full mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tài khoản
                  </label>
                  <Input
                    {...accountBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={accountHelper.color}
                    color={accountHelper.color}
                    helperColor={accountHelper.color}
                    helperText={accountHelper.text}
                    type="text"
                    css={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              <div className="flex  mb-6 mt-10 w-full justify-between">
                <div className="flex flex-wrap w-full mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Mật khẩu
                  </label>
                  <Input.Password
                    {...passwordBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={passwordHelper.color}
                    color={passwordHelper.color}
                    helperColor={passwordHelper.color}
                    helperText={passwordHelper.text}
                    type="email"
                    css={{
                      width: "95%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="w-[95%] flex flex-wrap mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nhập lại mật khẩu
                  </label>
                  <Input.Password
                    {...repasswordBindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={repasswordHelper.color}
                    color={repasswordHelper.color}
                    helperColor={repasswordHelper.color}
                    helperText={repasswordHelper.text}
                    type="password"
                    css={{
                      maxWidth: "100%",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </motion.form>
          )}
          {/* page3 */}
          {activeStep == 2 && (
            <motion.div className="w-full justify-center flex flex-col gap-4 mx-4">
              <div>
                <Checkbox
                  onChange={() => {
                    setConfirm((pre) => !pre);
                  }}
                />
                <p className="text-sm text-gray-700 max-w-sm">
                  I confirm that I have read and understood{" "}
                  <span className="underline text-blue-600 cursor-pointer">
                    the terms and conditions of the application
                  </span>{" "}
                  and I am certain that I want to submit it{" "}
                </p>
              </div>
              <MuiButton
                className="text-white bg-blue-500 w-40 h-16 text-lg rounded-xl block m-auto"
                variant="filled"
                type="submit"
                aria-labelledby="submitButtonLabel"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                disabled={!confirm}
              >
                Submit
              </MuiButton>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      <div className="mt-10 flex justify-between">
        <MuiButton onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </MuiButton>
        <MuiButton onClick={handleNext} disabled={isLastStep}>
          Next
        </MuiButton>
      </div>
    </div>
  );
}
