import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { useEffect, useState } from "react";
import MyModal from "../../components/MyModal";
import RejectModal from "../../components/RejectModal";
import { axiosGetReceiveDoc, axiosSubmitFeedback } from "../../api";
import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";

const DetailCell = ({ id, title, createdBy, time }) => {
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-4 w-full px-3 py-2 rounded-xl">
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
        <p className="font-bold text-sm text-gray-800">{title}</p>
        <p className="text-gray-400 text-xs">Title</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-gray-800">{time}</p>
        <p className="text-gray-400 text-xs">Time</p>
      </div>
    </div>
  );
};

export const StateCell = ({ secretState, urgencyState }) => {
  return (
    <div className="grid md:grid-cols-2 grid-flow-row gap-1 px-4 py-2 rounded-2xl mr-10 justify-center w-full">
      <div className="col-span-1 flex flex-col items-center bg-blue-gray-50 p-2 rounded-xl">
        <p className="font-bold text-sm text-gray-800">{secretState}</p>
        <p className="text-gray-500 text-xs">Secret State</p>
      </div>
      <div className="col-span-1 flex flex-col items-center bg-orange-50 p-2 rounded-xl">
        <p className="font-bold text-sm text-gray-800">{urgencyState}</p>
        <p className="text-gray-500 text-xs">Urgency State</p>
      </div>
    </div>
  );
};

const StatusCell = ({ receiver }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row w-full justify-center items-center gap-5 px-5 mx-2">
      <span
        className={`${
          receiver[0].status === "Pending"
            ? "text-orange-500"
            : receiver[0].status === "Approved"
            ? "text-green-500"
            : "text-red-500"
        }
        ${
          receiver[0].status === "Pending"
            ? "bg-orange-100"
            : receiver[0].status === "Approved"
            ? "bg-green-100"
            : "bg-red-100"
        }  rounded-md  px-3 py-1 font-semibold text-center `}
      >
        {receiver[0].status}
      </span>
      <div className="flex flex-col justify-center w-full text-center">
        <span className="font-bold text-sm text-gray-800">
          {receiver[0].name}
        </span>
        <span className="text-gray-400 text-xs font-medium">
          {receiver[0].time}
        </span>
      </div>
    </div>
  );
};
export const DescriptionCell = ({ description }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row max-w-[200px] justify-center items-center min-w-[150px] ml-5">
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <div className="col-span-2 mr-2">
          <p className="font-bold text-sm text-gray-800 line-clamp-4 max-h-[5.5rem] whitespace-pre-line text-clip">
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
      <Button
        bordered
        color="primary"
        auto
        onClick={() => {
          window.open(link, "_blank");
        }}
      >
        Click me
      </Button>
    </div>
  );
};
export default function Approve() {
  const id = useSelector((state) => state.userState.id);
  const [isReady, setISReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    axiosGetReceiveDoc(id)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setDocuments(
            res.data.map((item, idx) => {
              return { id: idx, ...item };
            })
          );
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    { name: "DOC DETAIL", uid: "detail" },
    { name: "CURRENT STATUS", uid: "status" },
    { name: "STATE", uid: "state" },
    { name: "FIELD", uid: "field" },
    { name: "FILE", uid: "file" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const renderCell = (doc, columnKey) => {
    const cellValue = doc[columnKey];
    switch (columnKey) {
      case "detail":
        return (
          <DetailCell
            id={doc.id}
            title={doc.title}
            createdBy={doc.createdBy}
            time={doc.timeSubmit ? doc.timeSubmit : "time"}
          />
        );
      case "status":
        return <StatusCell receiver={doc.receiver} />;
      case "state":
        return (
          <StateCell
            secretState={doc.secretState}
            urgencyState={doc.urgencyState}
          />
        );
      case "field":
        return <FieldCell description={doc.field} />;
      case "file":
        return <FileCell link={doc.fileLink} />;

      case "actions":
        return (
          <Row justify="center" align="center" className="w-[100px] ml-10">
            <Col css={{ d: "flex", width: "100%" }}>
              <Tooltip content="Time Line">
                <MyModal
                  receiver={doc.receiver.map((item, idx) => {
                    return { id: idx, ...item };
                  })}
                />
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Approve" color="primary">
                <IconButton
                  onClick={() => {
                    console.log("Edit user", doc._id);
                    handleSubmit(doc._id);
                  }}
                >
                  <CheckCircleOutlineIcon className="text-green-500" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Reject"
                color="error"
                onClick={() => console.log("Delete user", doc.id)}
              >
                <RejectModal
                  docId={doc._id}
                  receId={id}
                  setIsLoading={setIsLoading}
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
    axiosSubmitFeedback(id, docID, {
      comment: "string",
      status: "Approved",
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };
  return (
    <div>
      <CustomSugar customLoading={!setISReady} />
      {isLoading && <CustomRotatingSquare />}
      <Table
        aria-label="Example table with custom cells"
        sticked
        striped
        lined
        headerLined
        css={{
          height: "auto",
          minWidth: "100%",
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
    </div>
  );
}
