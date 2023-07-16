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
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { ArrowUturnDownIcon } from "@heroicons/react/24/outline";

export default function AssignPopper() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Tooltip content="Assign">
        <ArrowUturnDownIcon
          className="text-red-700 h-6 cursor-pointer m-1"
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
        // blur
      >
        {" "}
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Select{" "}
            <Text b size={18}>
              Employee
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
            </Table.Header>
            <Table.Body>
              <Table.Row key="1">
                <Table.Cell>Tony Reichert</Table.Cell>
                <Table.Cell>Employee</Table.Cell>
                <Table.Cell>Active</Table.Cell>
              </Table.Row>
              <Table.Row key="2">
                <Table.Cell>Zoey Lang</Table.Cell>
                <Table.Cell>Employee</Table.Cell>
                <Table.Cell>Paused</Table.Cell>
              </Table.Row>
              <Table.Row key="3">
                <Table.Cell>Jane Fisher</Table.Cell>
                <Table.Cell>Employee</Table.Cell>
                <Table.Cell>Active</Table.Cell>
              </Table.Row>
              <Table.Row key="4">
                <Table.Cell>William Howard</Table.Cell>
                <Table.Cell>Employee</Table.Cell>
                <Table.Cell>Vacation</Table.Cell>
              </Table.Row>
              <Table.Row key="5">
                <Table.Cell>William Howard</Table.Cell>
                <Table.Cell>Employee</Table.Cell>
                <Table.Cell>Vacation</Table.Cell>
              </Table.Row>
              <Table.Row key="6">
                <Table.Cell>William Howard</Table.Cell>
                <Table.Cell>Employee</Table.Cell>
                <Table.Cell>Vacation</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={5}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
          <Card css={{ mt: "10px", p: 10 }}>
            <Grid.Container>
              <Text b css={{ textTransform: "uppercase", color: "gray" }}>
                To date:{" "}
              </Text>
              <Grid.Container gap={4}>
                <Grid>
                  <Input width="186px" label="Time" type="time" />
                </Grid>
                <Grid>
                  <Input width="186px" label="Date" type="date" />
                </Grid>
              </Grid.Container>
            </Grid.Container>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto flat color="default" onPress={closeHandler}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
