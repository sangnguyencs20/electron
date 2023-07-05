import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  styled,
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
import { axiosGetDoc, axiosGetMyDoc, axiosSubmitMyDoc } from "../../api";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import CustomSugar from "../../components/CustomSugar";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import { Tab } from "@headlessui/react";
import { classNames } from "../../components/DisplayDrafts";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";

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
  variants: {
    type: {
      Accepted: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      Submitted: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      Draft: {
        bg: "$warningLight",
        color: "$warningLightContrast",
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
    Accepted: myDocuments.filter((item) => item.status == "Accepted"),
  };
  const [isReady, setISReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(0);
  const id = useSelector((state) => state.userState.id);
  useEffect(() => {
    axiosGetMyDoc(id)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setMyDocuments(
            res.data.map((item, idx) => {
              return { id: idx, ...item };
            })
          );
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [needRefresh]);

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "STATUS", uid: "status" },
    { name: "STATE", uid: "state" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "FILE", uid: "files" },

    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (doc, columnKey) => {
    const cellValue = doc[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {cellValue}
          </Text>
        );
      case "description":
        return <DescriptionCell description={doc.description} />;
      case "status":
        return <StyledBadge type={doc.status}>{cellValue}</StyledBadge>;
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
          <Row justify="flex-end" align="center" fluid className="md:w-[100px]">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", doc)}>
                  <EyeIcon size={20} fill="#2196f3" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Submit" isDisabled={doc.status !== "Draft"}>
                <IconButton
                  className={`${
                    doc.status !== "Draft" && "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    console.log("Edit user", doc.id);
                    handleSubmit(doc._id);
                  }}
                >
                  <ForwardToInboxOutlinedIcon
                    size={20}
                    color="#ff9900"
                    className={
                      //   `text-[${
                      //   doc.status === "Draft" ? "#ff9900" : "gray"
                      // }]`
                      doc.status === "Draft"
                        ? "text-[#ff9900]"
                        : "text-blue-gray-200"
                    }
                  />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
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
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const handleSubmit = (docId) => {
    console.log(id, docId);
    setIsLoading(true);
    axiosSubmitMyDoc(docId, id)
      .then((res) => {
        console.log(res);
        setNeedRefresh((pre) => pre + 1);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };
  return (
    <div className="w-full px-2 sm:px-0">
      <CustomSugar customLoading={!setISReady} />
      {isLoading && <CustomRotatingSquare />}
      <Tab.Group vertical>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
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
                css={{ height: "auto", minWidth: "100%" }}
                className="bg-white"
              >
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column
                      key={column.uid}
                      align={column.uid === "state" ? "center" : "start"}
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
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={5}
                  onPageChange={(page) => console.log({ page })}
                />
              </Table>
            </Tab.Panel>
          ))}
          <div className="flex w-full justify-end mt-36">
            {/* <Pagination total={5} initialPage={1} /> */}
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Draft;
