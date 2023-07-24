import { Table, Row, Col, Tooltip, Pagination } from "@nextui-org/react";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { useEffect, useState } from "react";
import MyModal from "../../components/MyModal";
import RejectModal from "../../components/RejectModal";
import {
  axiosApproveDocument,
  axiosComingDocument,
  axiosGetReceiveDoc,
  axiosSubmitFeedback,
} from "../../api";
import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { Download } from "../../assets";
import { formattedDateTime } from "../../utils";
import AssignPopper from "../../components/AssignPopper";
import CustomDatepicker from "../../components/CustomDatePicker";
import CustomMenu from "../../components/CustomMenu";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const DetailCell = ({ id, title, createdBy, time }) => {
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-4 w-full px-3 py-2 rounded-xl items-end">
      <div className="col-span-1 justify-end">
        <p className="font-bold text-sm text-gray-800">{id}</p>
        <p className="text-gray-400 text-xs">Id</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-gray-800 whitespace-pre-line break-all">
          {createdBy}
        </p>
        <p className="text-gray-400 text-xs">Created By</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-gray-800 flex whitespace-pre-line max-w-[300px]">
          {title}
        </p>
        <p className="text-gray-400 text-xs ">Title</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-gray-800">
          {formattedDateTime(time)}
        </p>
        <p className="text-gray-400 text-xs">Time</p>
      </div>
    </div>
  );
};

export const StateCell = ({ secretState, urgencyState }) => {
  return (
    <div className="grid md:grid-cols-2 grid-flow-row gap-1 px-4 py-2 rounded-2xl mr-10 justify-center w-full">
      <div className="col-span-1 flex flex-col items-center bg-orange-50 p-1 rounded-xl whitespace-pre-line text-center gap-1">
        <p className="font-bold text-sm text-gray-800">{secretState}</p>
        <p className="text-gray-500 text-xs">Secret State</p>
      </div>
      <div className="col-span-1 flex flex-col items-center bg-orange-50 p-1 rounded-xl whitespace-pre-line text-center gap-1">
        <p className="font-bold text-sm text-gray-800">{urgencyState}</p>
        <p className="text-gray-500 text-xs">Urgency State</p>
      </div>
    </div>
  );
};

const StatusCell = ({ receiver, userId }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row w-full justify-center items-center gap-5 px-5 mx-2">
      {/* <span
        className={`${
          receiver.filter((item) => item.receiverId._id === userId)[0]
            ?.status === "Pending"
            ? "text-orange-500"
            : receiver.filter((item) => item.receiverId._id === userId)[0]
                ?.status === "Approved"
            ? "text-green-500"
            : "text-red-500"
        }
        ${
          receiver.filter((item) => item.receiverId._id === userId)[0]
            ?.status === "Pending"
            ? "bg-orange-100"
            : receiver.filter((item) => item.receiverId._id === userId)[0]
                ?.status === "Approved"
            ? "bg-green-100"
            : "bg-red-100"
        }  rounded-md  px-3 py-1 font-semibold text-center `}
      >
        {receiver.filter((item) => item.receiverId._id === userId)[0]?.status}
      </span>
      <div className="flex flex-col justify-center w-full text-center">
        <span className="font-bold text-sm text-gray-800">
          {receiver.filter((item) => item.receiverId._id === userId)[0]?.name}
        </span>
        <span className="text-gray-400 text-xs font-medium">
          {receiver.filter((item) => item.receiverId._id === userId)[0]?.time}
        </span>
      </div> */}
    </div>
  );
};
export const DescriptionCell = ({ description }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row max-w-[200px] justify-center items-center min-w-[150px] ml-5">
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <div className="col-span-2 mr-2">
          <p className="font-bold text-sm text-gray-800 line-clamp-4 max-h-[5.5rem] whitespace-pre-line ">
            {description}
          </p>
          <p className="text-gray-400 text-xs">Description</p>
        </div>
      </div>
    </div>
  );
};
export const FieldCell = ({ description }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row max-w-[200px] justify-center items-center min-w-[150px] ml-5">
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <div className="col-span-2 mr-2">
          <p className="font-bold text-sm text-gray-800 line-clamp-4 max-h-[5.5rem] whitespace-pre-line text-clip">
            {description}
          </p>
          <p className="text-gray-400 text-xs">Field</p>
        </div>
      </div>
    </div>
  );
};
export const FileCell = ({ link }) => {
  return (
    <div className="flex justify-start w-full">
      <Tooltip content="Download" color="warning" css={{ color: "white" }}>
        <IconButton
          onClick={() => {
            window.open(link, "_blank");
          }}
        >
          <Download />
        </IconButton>
      </Tooltip>
    </div>
  );
};
export default function Approve() {
  const id = useSelector((state) => state.userState.id);
  const [isReady, setISReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    axiosComingDocument(page)
      .then((res) => {
        console.log(res);
        setDocuments(
          res.data.map((item, idx) => {
            return { id: idx, ...item };
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [needRefresh]);
  console.log(needRefresh);
  const columns = [
    { name: "DOC DETAIL", uid: "detail" },
    { name: "CURRENT STATUS", uid: "status" },
    { name: "STATE", uid: "state" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "FILE", uid: "file" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const renderCell = (doc, columnKey) => {
    const cellValue = doc.documentId[columnKey];
    switch (columnKey) {
      case "detail":
        return (
          <DetailCell
            id={doc.documentId._id}
            title={doc.documentId.title}
            createdBy={doc.documentId.createdBy}
            time={
              doc.documentId.timeSubmit ? doc.documentId.timeSubmit : "time"
            }
          />
        );
      case "status":
        return <StatusCell receiver={doc.receiver} userId={id} />;
      case "state":
        return (
          <StateCell
            secretState={doc.documentId.secretState}
            urgencyState={doc.documentId.urgencyState}
          />
        );
      case "description":
        return <DescriptionCell description={doc.documentId.description} />;
      case "file":
        return <FileCell link={doc.documentId.fileLink} />;

      case "actions":
        return (
          <Row
            justify="center"
            align="center"
            className="w-[100px] ml-10 flex flex-nowrap gap-2"
          >
            <Col>
              <AssignPopper docId={doc.documentId._id} />
            </Col>
            <Col>
              <Tooltip content="Time Line">
                <MyModal
                  receiver={doc.documentId._id}
                  isSubmit={doc.status !== "Draft"}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip content="Approve" color="primary">
                <IconButton
                  onClick={() => {
                    console.log("Edit user", doc.documentId._id);
                    handleSubmit(doc.documentId._id);
                  }}
                >
                  <CheckCircleOutlineIcon className="text-green-500" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip
                content="Reject"
                color="error"
                onClick={() => console.log("Delete user", doc.id)}
              >
                <RejectModal
                  docId={doc.documentId._id}
                  setIsLoading={setIsLoading}
                  setNeedRefresh={setNeedRefresh}
                />
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  const handleSubmit = (docID) => {
    setIsLoading(true);
    axiosApproveDocument({
      documentId: docID,
      comment: "",
      status: "Approved",
    })
      .then((res) => {
        setIsLoading(false);
        setNeedRefresh((pre) => pre + 1);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };
  return (
    <div className="container">
      <CustomSugar customLoading={!setISReady} />
      {isLoading && <CustomRotatingSquare />}
      <AnimatePresence mode="popLayout">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Table
            aria-label="Example table with custom cells"
            sticked
            striped
            lined
            headerLined
            css={{
              height: "auto",
              maxWidth: "100%",
            }}
            className=" bg-white"
          >
            <Table.Header columns={columns} className="p-48 m-0 ">
              {(column) => (
                <Table.Column
                  key={column.uid}
                  // hideHeader={column.uid === "id"}
                  align={column.uid === "description" ? "start" : "center"}
                  className={" bg-blue-gray-50"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={documents} css={{ gap: "12px" }}>
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
              rowsPerPage={4}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
          <div className="flex w-full justify-end mt-10">
            <Pagination
              total={14}
              siblings={1}
              initialPage={1}
              controls
              onChange={(page) => {
                console.log(page);
                setPage(page);
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
