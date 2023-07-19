import React, { useState } from "react";
import {
  Stepper,
  Step,
  Button,
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
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import AssignDropDown from "../../components/AssignDropDown";
import DropFile from "../../components/DropFile";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { toast } from "react-toastify";
import { axiosCreateDoc } from "../../api";
import { useSelector } from "react-redux";

export default function Create() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => {
    !isLastStep && title !== "" && setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  //---------page1--------
  const { value: title, reset, bindings } = useInput("");
  const [secret, setSecret] = React.useState("");
  const [urgency, setUrgency] = React.useState("");
  const handleSecret = (value) => {
    console.log(value);
    setSecret(value);
  };
  const {
    value: desc,
    setValue: setDesc,
    reset: descReset,
    bindings: descBindings,
  } = useInput("");
  const validateEmail = (value) => {
    return value !== "";
  };

  const helper = React.useMemo(() => {
    const isValid = validateEmail(title);
    return {
      text: isValid ? "" : "Fill here",
      color: isValid ? "success" : "error",
    };
  }, [title]);
  //----page2------------------
  const [approvals, setApprovals] = React.useState([]);
  const [file, setFile] = React.useState("1313");
  //----page3-----------------handle submit
  const handleSubmit = async () => {
    setIsLoading((pre) => !pre);
    console.log(title, secret, urgency, desc, approvals, file);
    await axiosCreateDoc({
      title,
      secretState: secret,
      receiver: approvals.map((item) => {
        return { receiverId: item._id };
      }),
      description: desc,
      fileLink: file,
    })
      .then((res) => {
        setTimeout(() => {
          setIsLoading((pre) => !pre);
        }, 3000);
        console.log("313");
        toast.success(`Create: ${res.data._id}`);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };
  //loading
  const [isLoading, setIsLoading] = React.useState(false);
  const id = useSelector((state) => state.userState.id);
  return (
    <div className="w-full py-4 px-40">
      {<CustomSugar customLoading={false} />}
      {isLoading && <CustomRotatingSquare />}
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue" : "blue-gray"}
            >
              Draft Details
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue" : "gray"}
              className="font-normal"
            >
              Your title draft, status and description.
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue" : "blue-gray"}
            >
              Approval -- File
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue" : "gray"}
              className="font-normal"
            >
              Select Approval and upload file
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
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
              Review draft before submit
            </Typography>
          </div>
        </Step>
      </Stepper>
      <Card
        isHoverable
        className="mt-32 flex justify-center  py-10 px-5 rounded-lg "
      >
        <AnimatePresence mode="wait">
          {/* page1 */}
          {(activeStep == 0 || activeStep == 2) && (
            <AnimatePresence mode="popLayout">
              <motion.form
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: 200 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-full pb-10 mb-10 border-b border-blue-gray-400"
              >
                <div className="flex flex-wrap mx-3 mb-6 flex-col">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    title (* request)
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
                    // label="TITLE"
                    placeholder="Fill the draft title"
                    css={{
                      width: "50%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      status
                    </label>
                    <div className="mt-5 flex gap-2">
                      <Select
                        variant="standard"
                        label="SELECT SECRET"
                        value={secret}
                        onChange={(value) => {
                          handleSecret(value);
                        }}
                      >
                        <Option value="Low">Low</Option>
                        <Option value="Neutral">Neutral</Option>
                        <Option value="High">High</Option>
                      </Select>
                      <Select
                        variant="standard"
                        label="SELECT URGENCY"
                        value={urgency}
                        onChange={(value) => {
                          setUrgency(value);
                        }}
                      >
                        <Option value="Low">Low</Option>
                        <Option value="Neutral">Neutral</Option>
                        <Option value="High">High</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap flex-col mx-3 mb-2">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Description
                  </label>
                  <Textarea {...descBindings} className="w-full" rows={8} />
                </div>
              </motion.form>
            </AnimatePresence>
          )}
          {/* page2 */}
          {(activeStep == 1 || activeStep == 2) && (
            <motion.form
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full pb-10 mb-10 border-b border-blue-gray-300"
            >
              <div className="flex flex-wrap mx-3 mb-6 flex-col z-50">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  approval (* request)
                </label>
                <AssignDropDown
                  selected={approvals}
                  setSelected={setApprovals}
                />
              </div>

              <div className="mt-7 flex flex-wrap flex-col mx-3 mb-2 z-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  Submit File
                </label>
                <DropFile file={file} setFile={setFile} />
              </div>
            </motion.form>
          )}
          {/* page3 */}
          {activeStep == 2 && (
            <motion.div className="w-full justify-center flex flex-col gap-4 mx-4">
              <div>
                <Checkbox />
                <p className="text-sm text-gray-700 max-w-sm">
                  I confirm that I have read and understood{" "}
                  <span className="underline text-blue-600">
                    the terms and conditions of the application
                  </span>{" "}
                  and I am certain that I want to submit it{" "}
                </p>
              </div>
              <Button
                className="text-white bg-blue-500 w-40 h-16 text-lg rounded-xl block m-auto"
                variant="contained"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      <div className="mt-10 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
