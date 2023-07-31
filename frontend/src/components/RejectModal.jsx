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
import { encryptLinkToBytes32 } from "../utils";
import { decideDraft } from "../contract";
import { toast } from "react-toastify";
import LoginModal from "./LoginModal";

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
    const myPromise = new Promise((resolve, reject) => {
      console.log(docId, encryptLinkToBytes32(controlledValue, "123456"), true);
      decideDraft({
        _id: docId,
        decide: true,
        comment_hashed: encryptLinkToBytes32(controlledValue, "123456"),
      }).then((hash) => {
        setIsLoading(true);
        console.log(hash);
        resolve(hash);
        axiosApproveDocument({
          documentId: docId,
          comment: controlledValue,
          status: "Rejected",
          txHash: hash,
        }).then((res) => {
          setIsLoading(false);
          console.log(res);
          resolve(hash);
          setNeedRefresh((pre) => pre + 1);
        });
      });
    });

    toast.promise(myPromise, {
      pending: "Draft is being decided",
      success: {
        render({ data }) {
          return `Decide draft successfully:  ${data}`;
        },
      },
      error: {
        render({ data }) {
          return `Decide draft successfully:  ${data}`;
        },
      },
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
          <LoginModal
            scFunction={decideDraft}
            scData={{
              _id: docId,
              decide: true,
              comment_hashed: encryptLinkToBytes32(controlledValue, "123456"),
            }}
            axiosFunction={axiosApproveDocument}
            axiosData={{
              documentId: docId,
              comment: controlledValue,
              status: "Rejected",
              // txHash: hash,
            }}
            closeHandler={closeHandler}
          >
            <Button
              auto
              flat
              // onPress={() => {
              //   // handleSubmit();
              //   closeHandler();
              // }}
            >
              Submit
            </Button>
          </LoginModal>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
