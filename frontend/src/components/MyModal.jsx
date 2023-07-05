import { Modal, useModal, Button, Text, Grid, Card } from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import CustomTable from "./CustomTable";
import TimeLineTable from "./TimeLineTable";

export default function MyModal({ receiver }) {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <EyeIcon
        size={20}
        fill="#979797"
        onClick={() => {
          setVisible(true);
        }}
      />
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18} css={{ fontWeight: "bold" }}>
            Time Line
          </Text>
        </Modal.Header>
        <Modal.Body>
          <TimeLineTable receiver={receiver} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
