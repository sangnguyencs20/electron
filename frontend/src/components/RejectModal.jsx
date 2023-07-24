import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Textarea,
  useInput,
  Spacer,
  Grid,
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import { axiosApproveDocument, axiosSubmitFeedback } from "../api";

export default function RejectModal({ docId, setIsLoading, setNeedRefresh }) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("");

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const handleSubmit = () => {
    setIsLoading(true);
    axiosApproveDocument({
      documentId: docId,
      comment: bindings.value,
      status: "Rejected",
    })
      .then((res) => {
        setIsLoading(false);
        setNeedRefresh((pre) => pre + 1);
      })
      .catch((err) => {
        setNeedRefresh((pre) => pre + 1);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <IconButton>
        <BlockIcon onClick={handler} className="text-red-400" />
      </IconButton>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Confirm the{" "}
            <Text b size={18}>
              Decision
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={1} css={{ mt: "4px", width: "100%" }}>
            <Grid css={{ width: "100%" }}>
              <Textarea
                bordered
                color="secondary"
                labelPlaceholder="Reason"
                {...bindings}
                css={{ mt: "4px", width: "100%" }}
              />
            </Grid>
          </Grid.Container>

          <Grid.Container gap={0.5}>
            <Grid>
              <Button auto flat size="sm" onPress={() => reset()}>
                Reset reason
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer css={{ paddingTop: "0px" }}>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            flat
            onPress={() => {
              handleSubmit();
              closeHandler();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
