import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useStateContext } from "../context";
import { money } from "../../assets";
import FormField from "../../components/FormField";
import Loader from "../../components/Loader";
import { checkIfImage } from "../../utils";
import { Button } from "@mui/material";
import DropFile from "../../components/DropFile";

const DraftCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checkIfImage(form.image, async (exists) => {
    //   if (exists) {
    //     setIsLoading(true);
    //     await createCampaign({
    //       ...form,
    //       target: ethers.utils.parseUnits(form.target, 18),
    //     });
    //     setIsLoading(false);
    //     navigate("/");
    //   } else {
    //     alert("Provide valid image URL");
    //     setForm({ ...form, image: "" });
    //   }
    // });
  };

  return (
    <div className="bg-[white] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 shadow-md">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-blue-300 rounded-[10px] shadow-md">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create Draft
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Title *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Draft Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Description *"
          placeholder="Write detail about draft"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-black ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div> */}

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Draft image *"
          placeholder="Place image URL of your draft"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <DropFile />
        <div className="flex justify-center items-center mt-[40px]">
          <Button
            className="text-white bg-blue-500 w-40 h-16 text-lg rounded-xl"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DraftCreate;
