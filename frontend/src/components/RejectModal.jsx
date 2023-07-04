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

export default function RejectModal() {
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

  return (
    <div>
      <IconButton>
        <DeleteIcon size={20} fill="#FF0080" onClick={handler} />
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
        <Modal.Body css={{ pt: "10px" }}>
          {/* <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Reason"
            contentLeft={<Mail fill="currentColor" />}
          /> */}
          <Grid.Container gap={2.5} css={{ mt: "4px", width: "100%" }}>
            <Grid>
              <Textarea
                bordered
                color="secondary"
                labelPlaceholder="Reason"
                {...bindings}
                css={{ mt: "4px", width: "300px" }}
              />
            </Grid>
          </Grid.Container>

          <Grid.Container gap={0.5}>
            <Grid>
              <Button auto flat size="sm" onPress={() => reset()}>
                Reset value
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto flat onPress={closeHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
