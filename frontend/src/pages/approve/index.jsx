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
import { encryptLinkToBytes32, formattedDateTime } from "../../utils";
import AssignPopper from "../../components/AssignPopper";
import CustomDatepicker from "../../components/CustomDatePicker";
import CustomMenu from "../../components/CustomMenu";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { decideDraft } from "../../contract";
import LoginModal from "../../components/LoginModal";

const DetailCell = ({ id, title, createdBy, time, deadlineApprove }) => {
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-4 w-full px-3 py-2 rounded-xl items-end min-w-[100px] sm:min-w-[150px] md:min-w-[200px]">
      <div className="col-span-2 lg:col-span-1">
        <p className="font-bold text-sm text-gray-800 flex whitespace-pre-line max-w-[300px]">
          {title}
        </p>
        <p className="text-gray-400 text-xs ">Tiêu đề</p>
      </div>
      <div className="col-span-1  hidden xl:flex flex-col">
        <p className="font-bold text-sm text-gray-800 whitespace-pre-line break-all">
          {createdBy}
        </p>
        <p className="text-gray-400 text-xs hidden lg:flex flex-col">
          Người tạo
        </p>
      </div>
      <div className="col-span-1 hidden lg:block">
        <p className="font-bold text-sm text-gray-800 flex whitespace-pre-line max-w-[300px]">
          {formattedDateTime(deadlineApprove)}
        </p>
        <p className="text-gray-400 text-xs whitespace-pre-line">
          Hạn chốt quyết định
        </p>
      </div>
      <div className="col-span-1 hidden xl:flex flex-col">
        <p className="font-bold text-sm text-gray-800 line-clamp-4 whitespace-pre-line">
          {formattedDateTime(time)}
        </p>
        <p className="text-gray-400 text-xs">Ngày tạo</p>
      </div>
    </div>
  );
};

export const StateCell = ({ secretState, urgencyState }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="grid md:grid-cols-2 grid-flow-row gap-1 px-4 py-2 rounded-2xl justify-center w-[250px]">
        <div className="col-span-1 flex flex-col items-center bg-orange-50 p-1 rounded-xl whitespace-pre-line text-center gap-1">
          <p className="font-bold text-sm text-gray-800">{secretState}</p>
          <p className="text-gray-500 text-xs">Độ Mật</p>
        </div>
        <div className="col-span-1 flex flex-col items-center bg-orange-50 p-1 rounded-xl whitespace-pre-line text-center gap-1">
          <p className="font-bold text-sm text-gray-800">{urgencyState}</p>
          <p className="text-gray-500 text-xs">Độ khẩn</p>
        </div>
      </div>
    </div>
  );
};

const StatusCell = ({ status }) => {
  return (
    <div className=" col-span-1 flex flex-col items-center bg-deep-orange-50 p-2 rounded-xl whitespace-pre-line text-center gap-1">
      <p className="font-bold text-sm text-gray-900">{status}</p>
      <p className="text-gray-500 text-xs">Hiện tại</p>
    </div>
  );
};
export const DescriptionCell = ({ description }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row max-w-[200px] justify-center items-center min-w-[150px] ml-5">
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <div className="col-span-2 mr-2">
          <p className="font-bold text-sm text-gray-800 line-clamp-4 whitespace-pre-line">
            {description}
          </p>
          <p className="text-gray-400 text-xs">Mô tả chi tiết</p>
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
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    axiosComingDocument(page)
      .then((res) => {
        console.log(res);
        setDocuments(
          res.data.allDocuments.map((item, idx) => {
            return { id: idx, ...item };
          })
        );
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [needRefresh, page]);
  console.log(needRefresh);
  const columns = [
    { name: "TỔNG QUÁT", uid: "detail" },
    { name: "TÌNH TRẠNG", uid: "status" },
    { name: "ĐỘ KHẨN", uid: "state" },
    { name: "MÔ TẢ", uid: "description" },
    { name: "TỆP", uid: "file" },
    { name: "HÀNH ĐỘNG", uid: "actions" },
  ];
  const renderCell = (doc, columnKey) => {
    // const cellValue = doc.document[columnKey];
    switch (columnKey) {
      case "detail":
        return (
          <DetailCell
            id={doc.document._id}
            title={doc.document.title}
            createdBy={doc.document.createdBy.fullName}
            deadlineApprove={doc.document.deadlineApprove}
            time={doc.document.timeSubmit ? doc.document.timeSubmit : "time"}
          />
        );
      case "status":
        return <StatusCell status={doc.currentStatus} />;
      case "state":
        return (
          <StateCell
            secretState={doc.document.secretState}
            urgencyState={doc.document.urgencyState}
          />
        );
      case "description":
        return <DescriptionCell description={doc.document.description} />;
      case "file":
        return <FileCell link={doc.document.fileLink} />;

      case "actions":
        return (
          <Row
            justify="center"
            align="center"
            className="w-[130px] ml-2 grid grid-cols-4 gap-1"
          >
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Details">
                <IconButton
                  onClick={() => {
                    navigate(`/draft/${doc.document._id}`);
                  }}
                >
                  <EyeIcon size={20} fill="#2196f3" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <AssignPopper docId={doc.document._id} />
            </Col>
            {/* <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Time Line">
                <MyModal
                  receiver={doc.document._id}
                  timeSubmit={doc.document.timeSubmit}
                  isSubmit={doc.status !== "Draft"}
                />
              </Tooltip>
            </Col> */}
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Approve" color="primary">
                <LoginModal
                  scFunction={decideDraft}
                  scData={{
                    _id: doc.document._id,
                    decide: true,
                    comment_hashed: encryptLinkToBytes32("", "123456"),
                  }}
                  axiosFunction={axiosApproveDocument}
                  axiosData={{
                    documentId: doc.document._id,
                    comment: "",
                    status: "Approved",
                  }}
                  setIsLoading={setIsLoading}
                  setNeedRefresh={setNeedRefresh}
                >
                  <IconButton>
                    <CheckCircleOutlineIcon className="text-green-500" />
                  </IconButton>
                </LoginModal>
              </Tooltip>

              {/* <Tooltip content="Approve" color="primary">
                <IconButton
                  onClick={() => {
                    console.log("Edit user", doc.document._id);
                    handleSubmit(doc.document._id);
                  }}
                >
                  <CheckCircleOutlineIcon className="text-green-500" />
                </IconButton>
              </Tooltip> */}
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip
                content="Reject"
                color="error"
                onClick={() => console.log("Delete user", doc.id)}
              >
                <RejectModal
                  docId={doc.document._id}
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
  const handleSubmit = async (docID) => {
    const myPromise = new Promise((resolve, reject) => {
      console.log(docID, encryptLinkToBytes32("", "123456"), true);
      decideDraft({
        _id: docID,
        decide: true,
        comment_hashed: encryptLinkToBytes32("", "123456"),
      })
        .then((hash) => {
          setIsLoading(true);
          console.log(hash);
          resolve(hash);
          axiosApproveDocument({
            documentId: docID,
            comment: "",
            status: "Approved",
            txHash: hash,
          }).then((res) => {
            setIsLoading(false);
            console.log(res);
            resolve(hash);
            setNeedRefresh((pre) => pre + 1);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(
      myPromise,
      {
        pending: "Draft is being decided",
        success: {
          render({ data }) {
            return `Decide draft:  ${data}`;
          },
        },
        error: {
          render({ data }) {
            return `Decide draft:  ${data}`;
          },
        },
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
    // axiosApproveDocument({
    //   documentId: docID,
    //   comment: "",
    //   status: "Approved",
    // })
    //   .then((res) => {
    //     setIsLoading(false);
    //     setNeedRefresh((pre) => pre + 1);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.error(err);
    //   });
  };
  return (
    <div className="container">
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
                    <Table.Cell
                      css={{
                        maxWidth: "700px",
                      }}
                    >
                      {renderCell(item, columnKey)}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <div className="flex w-full justify-end mt-10">
            <Pagination
              total={totalPages}
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
