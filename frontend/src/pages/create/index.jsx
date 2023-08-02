import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  axiosCheckPassword,
  axiosCreateDocument,
  axiosPostLog,
} from "../../api";
import { useSelector } from "react-redux";
import { createDraft } from "../../contract";
import {
  checkPassword,
  decryptPrivateKey,
  encryptLinkToBytes32,
  encryptPrivateKey,
  hashPassword,
  hexToBytes20,
} from "../../utils";

export default function Create() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const userId = useSelector((state) => state.userState.id);
  const handleNext = () => {
    if (
      !isLastStep &&
      title !== "" &&
      secret != "" &&
      urgency != "" &&
      desc != ""
    )
      setActiveStep((cur) => cur + 1);
    else setNeedFill(true);
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  //---------page1--------
  const { value: title, reset, bindings } = useInput("");
  const [secret, setSecret] = React.useState("Neutral");
  const [urgency, setUrgency] = React.useState("Neutral");
  const [needFill, setNeedFill] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNeedFill(false);
    }, 3000);
  }, [needFill]);
  const handleSecret = (value) => {
    setSecret(value);
  };
  const {
    value: desc,
    setValue: setDesc,
    reset: descReset,
    bindings: descBindings,
  } = useInput("");
  const validateTitle = (value) => {
    if (value === "" && needFill === true) {
      return 3;
    }
    if (value != "") return 2;
    return 1;
  };

  const helper = React.useMemo(() => {
    const code = validateTitle(title);
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
  }, [title, needFill]);
  //----page2------------------
  const [approvals, setApprovals] = React.useState([]);
  const [file, setFile] = React.useState("1313");
  //----page3-----------------handle submit
  const {
    value: password,
    setValue: setPrivateKey,
    reset: passwordReset,
    bindings: passwordBindings,
  } = useInput("");
  const hashedPassword = useSelector((state) => state.userState.password);
  const hashedPrivateKey = useSelector(
    (state) => state.userState.hashedPrivateKey
  );
  const closeHandler = useCallback(() => {
    setSecret("Neutral");
    setUrgency("Neutral");
    setNeedFill(false);
    passwordReset();
    setApprovals([]);
    descReset();
    reset();
    setConfirm(false);
    setFile("cant drop");
    setActiveStep(0);
  }, [
    setSecret,
    setUrgency,
    setNeedFill,
    passwordReset,
    descReset,
    reset,
    setFile,
    setActiveStep,
  ]);
  const handleSubmit = async () => {
    const myPromise = new Promise((resolve, reject) => {
      axiosCheckPassword({ password })
        .then(async (res) => {
          try {
            const createDocumentResponse = await axiosCreateDocument({
              title: form.title,
              receiver: form.approvals,
              fileLink: form.fileLink,
              description: form.description,
            });
            setIsLoading(false);
            createDraft(decryptPrivateKey(hashedPrivateKey, password), {
              _id: createDocumentResponse.data.documentId,
              _content_hashed: encryptLinkToBytes32(form.fileLink, password),
              _level1Approvers: form.approvals.map(
                (item) => item.walletAddress
              ),
            })
              .then((hash) => {
                console.log(hash);
                setIsLoading(true);
                axiosPostLog({
                  documentId: createDocumentResponse.data.documentId,
                  action: "CREATE",
                  txHash: hash,
                })
                  .then((res) => {
                    console.log(res);
                    setIsLoading(false);
                    closeHandler();
                    resolve(res.data.message + " " + "hash: " + hash);
                  })
                  .catch((err) => {
                    setIsLoading(false);
                    reject(err.message);
                  });
                // resolve(hash); // You can choose to resolve with some data here if needed.
              })
              .catch((err) => {
                reject(err.message);
              });
          } catch (error) {
            console.error(error);
            setIsLoading(false);
            reject(error); // You can choose to reject with an error here if needed.
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
    toast.promise(
      myPromise,
      {
        pending: "Dự thảo đang được tạo",
        success: {
          render({ data }) {
            return `Dự thảo được tạo thành công`;
          },
        },
        error: "Tạo dự thảo thất bại",
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
  };
  const [confirm, setConfirm] = useState(false);
  const id = useSelector((state) => state.userState.id);
  const form = useMemo(() => {
    return {
      title: title,
      secretStatus: secret,
      urgencyStatus: urgency,
      description: desc,
      approvals: approvals,
      fileLink: file,
      owner: id,
    };
  }, [title, secret, desc, approvals, file]);
  //loading
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="w-full py-4 px-5 lg:px-40">
      {<CustomSugar customLoading={false} />}
      {isLoading && <CustomRotatingSquare />}
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center translate-x-4">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue" : "blue-gray"}
              className={`text-md leading-[21px] font-semibold ${
                activeStep !== 0 && "hidden lg:flex"
              }`}
            >
              Chi tiết dự thảo
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue" : "gray"}
              className="text-sm leading-[21px] font-normal hidden md:block"
            >
              Điền chi tiết thông tin cần thiết
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue" : "blue-gray"}
              className={`text-md leading-[21px] font-semibold ${
                activeStep !== 1 && "hidden lg:flex"
              }`}
            >
              Người kiểm duyệt và văn bản
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue" : "gray"}
              className={`text-sm leading-[21px] font-normal hidden md:block ${
                activeStep !== 1 && "hidden lg:flex"
              }`}
            >
              Chọn người kiểm duyệt và nộp văn bản đính kèm
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue" : "blue-gray"}
              className={`text-md leading-[21px] font-semibold ${
                activeStep !== 2 && "hidden lg:flex"
              }`}
            >
              Xem xét lại
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue" : "gray"}
              className={`text-sm leading-[21px] font-normal hidden md:block ${
                activeStep !== 2 && "hidden lg:flex"
              }`}
            >
              Hoàn thiện thủ tục trước khi nộp
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
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
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
                  htmlFor="grid-password"
                >
                  Tiêu đề (* Bắt buộc)
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
                  // placeholder="Fill the draft title"
                  css={{
                    width: "50%",
                    display: "block",
                  }}
                />
              </div>
              <div className="flex  flex-wrap mx-3 mb-6 mt-10">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Mức độ khẩn của văn bản
                  </label>
                  <div className="mt-5 flex flex-col md:flex-row gap-10 md:gap-2">
                    <Select
                      variant="standard"
                      label="ĐỘ BÍ MẬT"
                      value={secret}
                      color="blue-gray"
                      error={secret === "" && needFill == true}
                      success={secret !== ""}
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
                      label="ĐỘ KHẨN CẤP"
                      value={urgency}
                      color="blue-gray"
                      error={urgency === "" && needFill == true}
                      success={urgency !== ""}
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
                  htmlFor="grid-city"
                >
                  Mô tả chi tiết về văn bản
                </label>
                <Textarea
                  {...descBindings}
                  className="w-full"
                  rows={8}
                  status={
                    needFill == true && desc === ""
                      ? "error"
                      : desc !== ""
                      ? "success"
                      : "default"
                  }
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
              <div className="flex flex-wrap mx-3 mb-6 flex-col z-50">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Người kiểm duyệt (* bắt buộc)
                </label>
                <AssignDropDown
                  selected={approvals}
                  setSelected={setApprovals}
                />
              </div>

              <div className="mt-7 flex flex-wrap flex-col mx-3 mb-2 z-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Nộp văn bản
                </label>
                <DropFile file={file} setFile={setFile} />
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
                <p className="text-sm text-gray-700 max-w-xs md:max-w-sm pr-2">
                  Tôi xác nhận rằng tôi đã đọc và hiểu{" "}
                  <span className="underline text-blue-600 cursor-pointer">
                    các điều khoản và điều kiện của ứng dụng
                  </span>{" "}
                  và tôi chắc chắn rằng tôi muốn gửi nó đi.{" "}
                </p>
              </div>

              <Popover
                shouldCloseOnBlur={true}
                triggerType="grid"
                isOpen={isOpen}
                onOpenChange={setIsOpen}
              >
                <Popover.Trigger>
                  <MuiButton
                    className="text-white bg-blue-500 w-40 h-16 text-md md:text-lg rounded-xl block m-auto"
                    variant="filled"
                    type="submit"
                    aria-labelledby="submitButtonLabel"
                    disabled={
                      !confirm ||
                      title === "" ||
                      secret === "" ||
                      urgency === "" ||
                      desc === "" ||
                      approvals.length === 0 ||
                      file === ""
                    }
                  >
                    Nộp
                  </MuiButton>
                </Popover.Trigger>
                <Popover.Content>
                  <Grid.Container
                    css={{
                      borderRadius: "14px",
                      paddingBlock: "2rem",
                      maxWidth: "330px",
                      gap: "20px",
                    }}
                  >
                    <Row justify="center" align="center">
                      <Text b>Xác nhận</Text>
                    </Row>
                    <Row
                      css={{
                        paddingInline: "10%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Input
                        type="password"
                        {...passwordBindings}
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        // contentLeft={<Password fill="currentColor" />}
                      />
                    </Row>
                    <Grid.Container justify="center" alignContent="center">
                      <Button
                        size="sm"
                        flat
                        color="default"
                        css={{
                          backgroundColor: "#CEE4FE !important",
                          width: "80% !important",
                          padding: "10px !important",
                          height: "50px",
                          borderRadius: "17px",
                        }}
                        onClick={(e) => {
                          handleSubmit();
                          setIsOpen(false);
                        }}
                      >
                        Xác nhận
                      </Button>
                    </Grid.Container>
                  </Grid.Container>
                </Popover.Content>
              </Popover>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      <div className="mt-10 flex justify-between">
        <MuiButton onClick={handlePrev} disabled={isFirstStep}>
          Trước
        </MuiButton>

        <MuiButton onClick={handleNext} disabled={isLastStep}>
          Sau
        </MuiButton>
      </div>
    </div>
  );
}
