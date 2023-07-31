import {
  Button,
  Col,
  Grid,
  Modal,
  Pagination,
  Row,
  Table,
  Text,
  Textarea,
  Tooltip,
  User,
  useInput,
} from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { ChatBubbleLeftEllipsisIcon as Comment } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { StyledBadge } from "./StyledBadge";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import axios from "axios";
import { axiosGetComment } from "../api";
const CommentModal = ({ docId }) => {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axiosGetComment(docId, page).then((res) => console.log(res));
  }, []);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("");

  const columns = [
    { name: "HỌ TÊN", uid: "name" },
    { name: "GÓP Ý", uid: "comment" },
    { name: "NGÀY GÓP Ý", uid: "date" },
    { name: "TXHASH", uid: "txHash" },
  ];

  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
      comment: "ahaha",
      date: "29/05/2002",
      txHash: "0x138193",
    },
  ];
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", user.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {cellValue}
          </Text>
        );
    }
  };
  return (
    <div>
      <IconButton>
        <Comment
          onClick={handler}
          className="h-5 w-5 transition-transform group-hover:rotate-45"
        />
      </IconButton>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="fit"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            COMMENT{" "}
            <Text b size={18}>
              HISTORY
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Table
            aria-label="Example table with custom cells"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={users}>
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Pagination total={20} initialPage={1} />;
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
};

export default CommentModal;
