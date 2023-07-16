import React, { useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Table,
  Tooltip,
  Row,
  Grid,
  Card,
  Badge,
  Spacer,
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import {
  ArrowUturnDownIcon,
  CameraIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReSubmitPopper from "./ReSubmitPopper";
export default function StatusPopper() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Tooltip content="Status">
        <TimelineIcon
          className="text-black h-6 cursor-pointer m-1 rounded-[100px] border border-black"
          sx={{ padding: "2px", mx: "2px" }}
          onClick={handler}
        />
      </Tooltip>

      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width={"60%"}
        height={"1000px"}
        blur
      >
        {" "}
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Status
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Table
            aria-label="Example static collection table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="multiple"
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>ROLE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>RESUBMIT</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key="1">
                <Table.Cell>Tony Reichert</Table.Cell>
                <Table.Cell>VBC CEO</Table.Cell>
                <Table.Cell>
                  <Badge
                    enableShadow
                    disableOutline
                    color="success"
                    variant="bordered"
                    width="100px"
                  >
                    Approve
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <ReSubmitPopper />
                </Table.Cell>
              </Table.Row>
              <Table.Row key="2">
                <Table.Cell>Zoey Lang</Table.Cell>
                <Table.Cell>BK CEO</Table.Cell>
                <Table.Cell>
                  <Badge
                    enableShadow
                    disableOutline
                    color="error"
                    width="100px"
                    variant="bordered"
                  >
                    Error
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <ReSubmitPopper />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={3}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
          <Card css={{ mt: "10px", p: 10 }}>
            <Grid.Container>
              <Text b css={{ textTransform: "uppercase", color: "gray" }}>
                ReSubmit (MULTI)
              </Text>
              <Grid.Container gap={4}>
                <Grid>
                  <Input width="100%" label="Input File" type="file" />
                  <Spacer y={1} />
                  <Button bordered color="primary" flat>
                    Submit
                  </Button>
                </Grid>
              </Grid.Container>
            </Grid.Container>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
