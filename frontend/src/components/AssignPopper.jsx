import React, { useMemo, useState } from "react";
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
import { axiosAssignDocument, axiosDepartmentUser } from "../api";

export default function AssignPopper({ docId }) {
  const [visible, setVisible] = React.useState(false);
  const [users, setUser] = React.useState([]);
  const [tableSelect, setTableSelect] = React.useState([]);
  const userSelected = useMemo(() => {
    return users
      .filter((item) => tableSelect.includes(item.id))
      .map((item) => item._id);
  }, [tableSelect]);
  const handler = () => setVisible(true);
  const handleSubmit = async () => {
    axiosAssignDocument({ documentId: docId, userIds: userSelected });
  };
  const closeHandler = () => {
    setVisible(false);
    console.log("closed", userSelected);
  };
  React.useEffect(() => {
    axiosDepartmentUser()
      .then((res) => {
        setUser(
          res.data.map((item, idx) => {
            return { id: idx, ...item };
          })
        );
      })
      .catch();
  }, []);
  const renderCell = (doc, columnKey) => {
    switch (columnKey) {
      case "name":
        return doc.fullName;
      case "role":
        return doc.position;
      case "address":
        return doc.address;
    }
    return "";
  };
  return (
    <div>
      <Tooltip content="Assign">
        <ArrowUturnDownIcon
          className="text-red-700 h-6 cursor-pointer m-1 rotate-180"
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
            onSelectionChange={(e) => {
              console.log("Selected Rows:", [...e]), setTableSelect([...e]);
            }}
            aria-label="Example static collection table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="multiple"
          >
            <Table.Header>
              <Table.Column key="name">NAME</Table.Column>
              <Table.Column key="role">ROLE</Table.Column>
              <Table.Column key="address">ADDRESS</Table.Column>
            </Table.Header>
            <Table.Body items={users} css={{ gap: "12px" }}>
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell css={{ maxWidth: "700px" }}>
                      {renderCell(item, columnKey)}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={5}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="default"
            onPress={async () => {
              await handleSubmit();
              closeHandler();
            }}
          >
            Assign
          </Button>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
