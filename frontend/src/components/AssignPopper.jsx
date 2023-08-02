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
import { assignLevel2Approver } from "../contract";
import { toast } from "react-toastify";
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";

export default function AssignPopper({ docId, owner }) {
  const [visible, setVisible] = React.useState(false);
  const [users, setUser] = React.useState([]);
  const [tableSelect, setTableSelect] = React.useState([]);
  const id = useSelector((state) => state.userState.id);
  const userSelected = useMemo(() => {
    return users.filter((item) => tableSelect.includes(item.id));
  }, [tableSelect]);
  console.log(userSelected);
  const handler = () => setVisible(true);
  const handleSubmit = async () => {
    const myPromise = new Promise((resolve, reject) => {
      // console.log(docId);
      assignLevel2Approver({
        _id: docId,
        level2Approvers: userSelected.map((item) => item.walletAddress),
      }).then((hash) => {
        // setIsLoading(true);
        // console.log(hash);
        resolve(hash);
        axiosAssignDocument({
          documentId: docId,
          userIds: userSelected.map((item) => item._id),
          txHash: hash,
        })
          .then((res) => {
            setIsLoading(false);
            // console.log(res);
            setNeedRefresh((pre) => pre + 1);
            resolve(hash);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });

    toast.promise(
      myPromise,
      {
        pending: "Draft is being assigned",
        success: {
          render({ data }) {
            return `Assign draft successfully:  ${data}`;
          },
        },
        error: {
          render({ data }) {
            return `Assign draft error:  ${data}`;
          },
        },
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
    // axiosAssignDocument({ documentId: docId, userIds: userSelected });
  };
  const closeHandler = () => {
    setVisible(false);
  };
  React.useEffect(() => {
    axiosDepartmentUser()
      .then((res) => {
        setUser(
          res.data
            .filter((item) => item._id !== id && item._id != owner)
            .map((item, idx) => {
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
      <Tooltip content="Chuyển cấp trên">
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
            Nộp cho{" "}
            <Text b size={18}>
              Cấp trên
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Table
            onSelectionChange={(e) => {
              setTableSelect([...e]);
            }}
            aria-label="Example static collection table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="multiple"
          >
            <Table.Header>
              <Table.Column key="name">HỌ VÀ TÊN</Table.Column>
              <Table.Column key="role">VỊ TRÍ</Table.Column>
              <Table.Column key="address">CƠ QUAN</Table.Column>
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
          <LoginModal
            scFunction={assignLevel2Approver}
            scData={{
              _id: docId,
              level2Approvers: userSelected.map((item) => item.walletAddress),
            }}
            axiosFunction={axiosAssignDocument}
            axiosData={{
              documentId: docId,
              userIds: userSelected.map((item) => item._id),
              // txHash: hash,
            }}
            closeHandler={closeHandler}
          >
            <Button auto flat color="default">
              Chuyển
            </Button>
          </LoginModal>

          <Button auto flat color="error" onPress={closeHandler}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
