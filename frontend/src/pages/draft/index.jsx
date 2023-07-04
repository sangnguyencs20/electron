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
import { FileCell } from "../approve";

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
      active: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      paused: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      vacation: {
        bg: "$warningLight",
        color: "$warningLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "active",
  },
});

const Draft = () => {
  const navigate = useNavigate();

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "STATUS", uid: "status" },
    { name: "FILE", uid: "files" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const myDocument = [
    {
      id: 1,
      title: "string",
      createdBy: "string",
      receiver: ["string"],
      secretState: "Neutral",
      urgencyState: "Neutral",
      field: "string",
      fileLink: "string",
      status: "submited",
    },
    {
      id: 2,
      title: "string",
      createdBy: "string",
      receiver: ["string"],
      secretState: "Neutral",
      urgencyState: "Neutral",
      field: "string",
      file: "string",
      status: "submited",
    },
    {
      id: 3,
      title: "string",
      createdBy: "string",
      receiver: ["string"],
      secretState: "Neutral",
      urgencyState: "Neutral",
      field: "string",
      fileLink: "string",
      status: "submited",
    },
  ];
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <Text b size={14} css={{ tt: "capitalize" }}>
            {cellValue}
          </Text>
        );
      case "status":
        return (
          <Text b size={14} css={{ tt: "capitalize", width: "200px" }}>
            {cellValue}
          </Text>
        );
      case "files":
        return <FileCell link={cellValue} />;
      case "actions":
        return (
          <Row justify="flex-end" align="center" fluid css={{ width: "100%" }}>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Submit">
                <IconButton onClick={() => console.log("Edit user", user.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete Draft"
                color="error"
                onClick={() => console.log("Delete Draft", user.id)}
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
  return (
    <div className="w-full">
      <div className="w-full min-h-max flex justify-end pb-10 shadow-white">
        <Button
          className="bg-[#0ea5e9] flex justify-center items-center cursor-pointer"
          variant="contained"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create new Draft
        </Button>
      </div>
      <Table
        aria-label="Example table with custom cells"
        sticked
        striped
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              // hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
              className={"rounded-none "}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={myDocument}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
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
