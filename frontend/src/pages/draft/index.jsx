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
      Success: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      Pending: {
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
  const [isReady, setISReady] = useState(false);
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
  }, []);

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "STATUS", uid: "status" },
    { name: "FIELD", uid: "field" },
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
      case "field":
        return (
          <Text b size={14} css={{ tt: "capitalize", width: "200px" }}>
            {cellValue}
          </Text>
        );
      case "description":
        return <DescriptionCell description={"Lorem"} />;
      case "status":
        return <StyledBadge type="Draft">{cellValue}</StyledBadge>;
      case "state":
        return (
          <StateCell
            secretState={doc.secretState}
            urgencyState={doc.urgencyState}
          />
        );
      case "files":
        return <FileCell link={cellValue} />;
      case "actions":
        return (
          <Row justify="flex-end" align="center" fluid css={{ width: "100%" }}>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", doc)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Submit">
                <IconButton
                  onClick={() => {
                    console.log("Edit user", doc.id);
                    handleSubmit(doc._id);
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete Draft"
                color="error"
                onClick={() => console.log("Delete Draft", doc.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
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
    axiosSubmitMyDoc(docId, id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="w-full">
      {<CustomSugar customLoading={isReady} />}
      <Table
        aria-label="Example table with custom cells"
        sticked
        striped
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        className="bg-white"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              align={column.uid === "state" ? "center" : "start"}
              className={"rounded-none"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={myDocuments}>
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
    </div>
  );
};

export default Draft;
