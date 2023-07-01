import useDrivePicker from "react-google-drive-picker";
import UploadToGoogleDrive from "./UploadToGoogleDrive";

const DropFile = ({ setFile }) => {
  const [openPicker, authResponse] = useDrivePicker();
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "426348910591-4a0b0riiavqo0f637nbktu0ffqfanm30.apps.googleusercontent.com",
      developerKey: "AIzaSyCpsIDvxtjA6ksXyIbFlWnGObysq9u5YaI",
      viewId: "DOCS",
      token:
        "ya29.a0AbVbY6N__nKMXTOOLdydq2mlJ3cNa4sb4WMEeTjUgonouuz2GRHz3BBIvfhxkJdHcKTiPYJn0Do3T39Cp9tWYMAHKd0RPsBJWwJRtoty5ZG7drT1sNQ2RLyDkUi-lL4jRQzDCTO1arJIGv4frS9H1QUc3-eKaCgYKAYQSARISFQFWKvPl9TmWwY-53A4XkIZiarfWuA0163", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        if (data.action === "picked") {
          setFile(data.docs[0].url);
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };
  return (
    <div className="flex-1 w-full flex flex-col">
      <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
        Drop file *
      </span>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
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
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
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
    </div>
  );
};

export default DropFile;
