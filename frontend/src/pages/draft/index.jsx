import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  styled,
  Pagination,
} from "@nextui-org/react";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DescriptionCell, FileCell, StateCell } from "../approve";
import DefaultSpeedDial from "../../components/DefaultSpeedDial";
import { useEffect, useState } from "react";
import {
  axiosGetDoc,
  axiosGetMyDoc,
  axiosPostFinishDocument,
  axiosPostPublishDocument,
  axiosSubmitMyDoc,
} from "../../api";
import { useSelector } from "react-redux";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { Tab } from "@headlessui/react";
import { classNames } from "../../components/DisplayDrafts";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { AnimatePresence, motion } from "framer-motion";
import StatusPopper from "../../components/StatusPopper";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import MyModal from "../../components/MyModal";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import SubmitModal from "../../components/SubmitModal";
import { hexToBytes20 } from "../../utils";
import { finish, publish } from "../../contract";
import { toast } from "react-toastify";
import CommentModal from "../../components/CommentModal";
import LoginModal from "../../components/LoginModal";
const StyledBadge = styled("span", {
  display: "inline-block",
  textTransform: "uppercase",
  padding: "$2 $3",
  margin: "0 2px",
  fontSize: "10px",
  fontWeight: "$bold",
  borderRadius: "14px",
  letterSpacing: "0.6px",
  lineHeight: 1,
  boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
  alignItems: "center",
  alignSelf: "center",
  color: "$white",
  width: "100px",
  textAlign: "center",
  paddingBlock: "10px",
  variants: {
    type: {
      Approved: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      Submitted: {
        bg: "$cyan500",
        color: "$cyan200",
      },
      Draft: {
        bg: "$warningLight",
        color: "$warningLightContrast",
      },
      Rejected: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      Published: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      Finished: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "Draft",
  },
});

const Draft = () => {
  const navigate = useNavigate();
  const [myDocuments, setMyDocuments] = useState([]);
  const dosObj = {
    All: myDocuments,
    Draft: myDocuments.filter((item) => item.status == "Draft"),
    Submitted: myDocuments.filter((item) => item.status == "Submitted"),
    Approved: myDocuments.filter((item) => item.status == "Approved"),
    Rejected: myDocuments.filter((item) => item.status == "Rejected"),
    Published: myDocuments.filter((item) => item.status == "Rejected"),
    Finished: myDocuments.filter((item) => item.status == "Rejected"),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [showText, setShowText] = useState(false);
  const id = useSelector((state) => state.userState.id);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    axiosGetMyDoc(page)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setMyDocuments(
            res.data.allDocuments.map((item, idx) => {
              return { id: idx, ...item };
            })
          );
          setTotalPages(res.data.totalPages);
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [needRefresh, page]);

  const columns = [
    { name: "TIÊU ĐỀ", uid: "title" },
    { name: "MỨC ĐỘ", uid: "status" },
    { name: "TRẠNG THÁI", uid: "state" },
    { name: "MÔ TẢ", uid: "description" },
    { name: "TỆP", uid: "files" },
    { name: "HÀNH ĐỘNG", uid: "actions" },
  ];

  const renderCell = (doc, columnKey) => {
    const cellValue = doc[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <Text
            b
            size={14}
            css={{ tt: "capitalize" }}
            className="flex md:w-[300px] whitespace-pre-line"
          >
            {cellValue}
          </Text>
        );
      case "description":
        return <DescriptionCell description={doc.description} />;
      case "status":
        return (
          <div className="w-full flex justify-center">
            <StyledBadge type={doc.status}>{cellValue}</StyledBadge>
          </div>
        );
      case "state":
        return (
          <StateCell
            secretState={doc.secretState}
            urgencyState={doc.urgencyState}
          />
        );
      case "files":
        return <FileCell link={doc.fileLink} />;
      case "actions":
        return (
          <Row
            justify="center"
            align="center"
            className="w-[130px] ml-2 grid grid-cols-4 gap-1"
          >
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Details" color={"primary"}>
                <IconButton
                  onClick={() => {
                    navigate(`/draft/${doc._id}`);
                  }}
                >
                  <EyeIcon size={20} fill="#2196f3" />
                </IconButton>
              </Tooltip>
            </Col>

            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Status" color="invert">
                <IconButton onClick={() => {}}>
                  <MyModal
                    timeSubmit={doc.timeSubmit}
                    receiver={doc._id}
                    isSubmit={doc.status !== "Draft"}
                    setNeedRefresh={setNeedRefresh}
                  />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Submit" isDisabled={doc.status !== "Draft"}>
                <SubmitModal
                  doc={doc}
                  setNeedRefresh={setNeedRefresh}
                  setIsLoading={setIsLoading}
                />
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip
                content="Delete Draft"
                color="error"
                onClick={() => console.log("Delete Draft", doc.id)}
                isDisabled={doc.status !== "Draft"}
              >
                <IconButton
                  className={`${
                    doc.status !== "Draft" && "cursor-not-allowed"
                  }`}
                >
                  <DeleteIcon
                    size={20}
                    fill={` ${doc.status === "Draft" ? "#FF0080" : "gray"}`}
                  />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip
                content="Publish"
                color="success"
                placement="bottomEnd"
                isDisabled={doc.status !== "Approved"}
              >
                <LoginModal
                  scFunction={publish}
                  scData={{
                    _id: doc._id,
                  }}
                  axiosFunction={axiosPostPublishDocument}
                  axiosData={{ docId: doc._id }}
                  setNeedRefresh={setNeedRefresh}
                  setIsLoading={setIsLoading}
                >
                  <IconButton
                    className={`${
                      doc.status === "Approved"
                        ? "text-green-500"
                        : "text-blue-gray-200"
                    } ${doc.status !== "Approved" && "cursor-not-allowed"}`}
                  >
                    <PublishRoundedIcon />
                  </IconButton>
                </LoginModal>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip
                content="Finish"
                color="primary"
                placement="bottomStart"
                onClick={() => {}}
                isDisabled={
                  doc.status !== "Approved" || doc.status !== "Published"
                }
              >
                <LoginModal
                  scFunction={finish}
                  scData={{
                    _id: doc._id,
                  }}
                  axiosFunction={axiosPostFinishDocument}
                  axiosData={{ docId: doc._id }}
                  setNeedRefresh={setNeedRefresh}
                  setIsLoading={setIsLoading}
                >
                  <IconButton
                    className={` ${
                      doc.status === "Approved"
                        ? "text-blue-600"
                        : "text-blue-gray-200"
                    } ${doc.status !== "Approved" && "cursor-not-allowed"}`}
                  >
                    <DoneAllRoundedIcon />
                  </IconButton>
                </LoginModal>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip
                content="Comment"
                color="primary"
                placement="bottomStart"
                isDisabled={
                  doc.status !== "Published" && doc.status !== "Finished"
                }
              >
                <CommentModal docId={doc._id} type={doc.status} />
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const handlePublish = (docId) => {
    const myPromise = new Promise((resolve, reject) => {
      publish({
        _id: docId,
      })
        .then((hash) => {
          setIsLoading(true);
          console.log(hash);
          resolve(hash);
          setIsLoading(false);
          axiosPostPublishDocument(docId)
            .then((res) => {
              setIsLoading(false);
              console.log(res);
              resolve(hash);
              setNeedRefresh((pre) => pre + 1);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(
      myPromise,
      {
        pending: "Draft is being published",
        success: {
          render({ data }) {
            return `Publish draft successfully:  ${data}`;
          },
        },
        error: {
          render({ data }) {
            return `Publish draft error:  ${data}`;
          },
        },
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
  };
  const handleFinish = (docId) => {
    const myPromise = new Promise((resolve, reject) => {
      finish({
        _id: docId,
      })
        .then((hash) => {
          setIsLoading(true);
          console.log(hash);
          resolve(hash);
          setIsLoading(false);
          // axiosApproveDocument({
          //   documentId: docID,
          //   comment: "",
          //   status: "Approved",
          //   txHash: hash,
          // }).then((res) => {
          //   setIsLoading(false);
          //   console.log(res);
          //   resolve(hash);
          //   setNeedRefresh((pre) => pre + 1);
          // });
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(
      myPromise,
      {
        pending: "Draft is being finished",
        success: {
          render({ data }) {
            return `Finish draft successfully:  ${data}`;
          },
        },
        error: {
          render({ data }) {
            return `Finish draft error:  ${data}`;
          },
        },
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
  };

  return (
    <div className="w-full px-2 sm:px-0">
      {isLoading && <CustomRotatingSquare />}
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -200 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex">
          <Button
            className="w-fit rounded-2xl flex justify-between px-2 gap-4 hover:bg-blue-100 "
            onMouseOver={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
            onClick={() => {
              navigate("/draft/create");
            }}
          >
            <PlusCircleIcon className="w-10 hover:scale-125 hover:text-blue-900 ease-in-out duration-700" />
            <AnimatePresence mode="sync">
              {showText && (
                <motion.span
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 200 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  Thêm Dự thảo
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            ></motion.div>
          </Button>
        </div>
        <Tab.Group vertical>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 overflow-x-scroll">
            {Object.keys(dosObj).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm  leading-5  ",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                    selected
                      ? "bg-white shadow text-blue-700 font-bold"
                      : "text-slate-700 hover:bg-white/[0.12] hover:text-slate-400 text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(dosObj).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                <Table
                  aria-label="Example table with custom cells"
                  sticked
                  striped={true}
                  lined
                  headerLined
                  css={{
                    height: "auto",
                    minWidth: "100%",
                    overflowX: "scroll",
                  }}
                  className="bg-white overflow-x-scroll"
                >
                  <Table.Header columns={columns}>
                    {(column) => (
                      <Table.Column
                        key={column.uid}
                        align={column.uid === "title" ? "start" : "center"}
                        className={"rounded-none bg-blue-gray-50"}
                      >
                        {column.name}
                      </Table.Column>
                    )}
                  </Table.Header>
                  <Table.Body items={posts}>
                    {(item) => (
                      <Table.Row>
                        {(columnKey) => (
                          <Table.Cell className={"max-w-[100px]"}>
                            {renderCell(item, columnKey)}
                          </Table.Cell>
                        )}
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Tab.Panel>
            ))}
            <div className="flex w-full justify-end mt-10">
              <Pagination
                total={totalPages}
                siblings={1}
                initialPage={1}
                controls
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </div>
  );
};

export default Draft;
