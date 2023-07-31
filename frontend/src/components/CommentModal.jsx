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
const CommentModal = ({ docId, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isNeed, setIsNeed] = useState(0);
  console.log(comments);
  useEffect(() => {
    {
      setIsLoading(true);
      docId !== undefined &&
        axiosGetComment(docId, page)
          .then((res) => {
            setComments(
              res.data.allOpinions.map((item, idx) => {
                id: idx, { ...item };
              })
            );

            setTotalPages(res.data.totalPages);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
    }
  }, [page, docId, isNeed]);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const columns = [
    { name: "HỌ TÊN", uid: "name" },
    { name: "GÓP Ý", uid: "comment" },
    { name: "NGÀY GÓP Ý", uid: "date" },
    { name: "TXHASH", uid: "txHash" },
  ];

  const renderCell = (user, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {user.createdBy.fullName}
          </Text>
        );
      case "content":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {user.content}
              </Text>
            </Row>
          </Col>
        );
      case "date":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {user.createdAt}
          </Text>
        );

      case "txHash":
        return (
          <Text
            b
            size={14}
            css={{
              tt: "capitalize",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            className="hover:underline text-md cursor-pointer"
            onClick={() => {
              window.open(
                `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                  user.txHash
                }`,
                "_blank"
              );
            }}
          >
            {user.txHash}
          </Text>
        );
      default:
        return <></>;
    }
  };
  return (
    <div
      className={`${
        type == "Published" || type == "Finished" ? "opacity-100" : "opacity-60"
      }`}
    >
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
            <Table.Body items={comments}>
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Pagination
            initialPage={1}
            total={totalPages}
            siblings={1}
            controls
            onChange={(page) => {
              setPage(page);
            }}
          />
        </Modal.Body>
        <Modal.Footer css={{ paddingTop: "0px" }}>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentModal;
