import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

const UploadToGoogleDrive = () => {
  const [openPicker, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "426348910591-4a0b0riiavqo0f637nbktu0ffqfanm30.apps.googleusercontent.com",
      developerKey: "AIzaSyBbH14cY_qOTyh2Fvs3B-Alw-3lRObqZ_s",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };
  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
};

export default UploadToGoogleDrive;
