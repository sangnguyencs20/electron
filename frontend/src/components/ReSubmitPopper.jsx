import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Tooltip,
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function ReSubmitPopper() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Tooltip content="Resubmit">
        <AttachFileIcon
          onClick={handler}
          className="text-black w-10"
          title="Resubmit"
        />
      </Tooltip>

      {/* <Button auto shadow onPress={handler}>
        Open modal
      </Button> */}
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
              File
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input width="100%" label="Input File" type="file" />

          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Confirm</Text>
            </Checkbox>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto flat onPress={closeHandler}>
            Resubmit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
