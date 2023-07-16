import { Modal, useModal, Button, Text, Grid, Card } from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import CustomTable from "./CustomTable";
import TimeLineTable from "./TimeLine";

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
        class
      />
      <Modal
        width="1000px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        css={{ maxHeight: "900px" }}
        {...bindings}
      >
        <Modal.Header css={{ pb: "10px", bgColor: "$accents4" }}>
          <Text id="modal-title" size={18} css={{ fontWeight: "bold" }}>
            Time Line
          </Text>
        </Modal.Header>
        <Modal.Body css={{ bgColor: "#f3f3f3" }}>
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
