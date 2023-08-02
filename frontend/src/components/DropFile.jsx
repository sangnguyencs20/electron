import useDrivePicker from "react-google-drive-picker";
import UploadToGoogleDrive from "./UploadToGoogleDrive";
import CircularIntegration from "./CircularIntegration";
import { useState, useRef, useEffect } from "react";

const DropFile = ({ file, setFile }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [openPicker, authResponse] = useDrivePicker();
  const handleOpenPicker = (e) => {
    e.preventDefault();
    openPicker({
      clientId:
        "426348910591-4a0b0riiavqo0f637nbktu0ffqfanm30.apps.googleusercontent.com",
      developerKey: "AIzaSyCpsIDvxtjA6ksXyIbFlWnGObysq9u5YaI",
      viewId: "DOCS",
      token: import.meta.env.VITE_REACT_GOOGLE_DRIVE_TOKEN, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
        }
        if (data.action === "picked") {
          setFile(data.docs[0].downloadUrl);
          handleButtonClick();
        }
      },
    });
  };
  return (
    <div className="flex-1 w-full flex flex-col">
      <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
        Nơi thả văn bản dự thảo (Yêu cầu)
      </span>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-800 dark:text-gray-800">
              <span className="font-semibold">Nhấn để tải văn bản</span> hoặc
              kéo thả
            </p>
            <p className="text-xs text-gray-900 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onClick={handleOpenPicker}
          />
        </label>
      </div>
      {file !== "" && (
        <div className="text-black w-1/3 h-32 py-2 pl-3 pr-2 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-10 flex justify-center items-center">
          <p
            className="w-4/5 text-[10px] text-slate-500 overflow-clip text-sty"
            onClick={() => {
              if (file !== "") window.open(file, "_blank");
            }}
          >
            {file}
          </p>

          <CircularIntegration
            loading={loading}
            success={success}
            handleButtonClick={handleButtonClick}
          />
        </div>
      )}
    </div>
  );
};

export default DropFile;
