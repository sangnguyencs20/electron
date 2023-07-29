import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { IconButton } from "./IconButton";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
export default function SubmitModal({ doc }) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
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
