import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useStateContext } from "../context";
import { money } from "../../assets";
import FormField from "../../components/FormField";
import Loader from "../../components/Loader";
import { checkIfImage } from "../../utils";
import { Button } from "@mui/material";
import DropFile from "../../components/DropFile";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import AssignDropDown from "../../components/AssignDropDown";
import { axiosCreateDoc } from "../../api";
import ListBox from "../../components/ListBox";
import CustomSugar from "../../components/CustomSugar";
import { Sugar } from "react-preloaders";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { toast } from "react-toastify";

const DraftCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [secret, setSecret] = useState({ name: "Low" });
  const [urgency, setUrgency] = useState({ name: "Low" });
  const [file, setFile] = useState("");
  const [selected, setSelected] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      createdBy: useSelector((state) => state.userState.id),
      receiver: [],
      description: "",
    },
    // validationSchema: Yup.object({
    //   title: Yup.string().min(5, "atLeast").required("require"),
    //   urgencyState: Yup.string().required("require"),
    // }),
    onSubmit: async (values) => {
      setIsLoading(true);
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    const receiver = selected;
    const secretState = secret.name;
    const urgencyState = urgency.name;
    setIsLoading((pre) => !pre);

    await axiosCreateDoc({
      ...values,
      secretState: secretState,
      urgencyState: urgencyState,
      receiver: receiver,
      fileLink: file,
    })
      .then((res) => {
        setTimeout(() => {
          setIsLoading((pre) => !pre);
        }, 3000);
        toast.success(`Create: ${res.data._id}`);
        formik.resetForm();
        setFile("");
        setSelected([]);
        setSecret({ name: "Low" });
        setUrgency({ name: "Low" });
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-[white] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 shadow-md">
      {<CustomSugar customLoading={false} />}
      {isLoading && <CustomRotatingSquare />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-blue-300 rounded-[10px] shadow-md">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create Draft
        </h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Title *"
            placeholder="John Doe"
            inputType="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            name="title"
            {...formik.getFieldProps("title")}
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <ListBox
            title={"Secret State *"}
            selected={secret}
            setSelected={setSecret}
          />
          <ListBox
            title={"Urgency State *"}
            selected={urgency}
            setSelected={setUrgency}
          />
        </div>
        <FormField
          labelName="Description *"
          placeholder="Write detail about draft"
          isTextArea
          {...formik.getFieldProps("description")}
        />
        <div className="w-full ">
          <AssignDropDown selected={selected} setSelected={setSelected} />
        </div>
        <DropFile file={file} setFile={setFile} />
        <div className="flex justify-center items-center mt-[40px]">
          <Button
            className="text-white bg-blue-500 w-40 h-16 text-lg rounded-xl"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DraftCreate;
