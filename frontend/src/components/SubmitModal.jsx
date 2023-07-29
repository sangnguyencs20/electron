import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  useInput,
} from "@nextui-org/react";
import { IconButton } from "./IconButton";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { submitDraft } from "../contract";
import { convertDateToSolidityTimestamp } from "../utils";
import { toast } from "react-toastify";
import { axiosSubmitMyDoc } from "../api";
export default function SubmitModal({ doc }) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const { value: time, setValue: setTime, reset, bindings } = useInput("");
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const handleSubmit = async () => {
    const myPromise = new Promise((resolve, reject) => {
      submitDraft({
        _id: doc._id,
        _deadlineApprove: convertDateToSolidityTimestamp(time),
      }).then((hash) => {
        console.log(hash);
        resolve(hash);
        // axiosSubmitMyDoc(doc._id,)
      });
    });
    toast.promise(myPromise, {
      pending: "Draft is being created",
      success: {
        render({ data }) {
          return `Create draft successfully:  ${data}`;
        },
      },
      error: "error",
    });
  };
  return (
    <div>
      <IconButton
        className={`${doc.status !== "Draft" && "cursor-not-allowed"}`}
        //   onClick={() => {
        //     // handleSubmit(doc._id);
        //   }}
        onClick={handler}
      >
        <ForwardToInboxOutlinedIcon
          color="#ff9900"
          className={
            doc.status === "Draft" ? "text-[#ff9900]" : "text-blue-gray-200"
          }
        />
      </IconButton>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Select{" "}
            <Text b size={18}>
              Deadline day
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            {...bindings}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Time"
            type="date"
            // contentLeft={<Mail fill="currentColor" />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            size="sm"
            flat
            color="default"
            onClick={() => handleSubmit()}
            css={{
              backgroundColor: "#CEE4FE !important",
              width: "20% !important",
              padding: "10px !important",
              height: "50px",
              borderRadius: "17px",
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
