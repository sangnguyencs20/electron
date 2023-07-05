import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  styled,
} from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";

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
      Approved: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      Rejected: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      Pending: {
        bg: "$warningLight",
        color: "$warningLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "Pending",
  },
});

export default function TimeLineTable({ receiver }) {
  const columns = [
    { name: "RECEIVERID", uid: "_id" },
    { name: "STATUS", uid: "status" },
    { name: "TIME", uid: "time" },
  ];
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "_id":
        return (
          <Text size={12} color={"#687076"}>
            {user._id}
          </Text>
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
                {user.name}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;
      case "time":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;
    }
  };
  return (
    <Table
      aria-label="Example table with custom cells"
      sticked
      striped
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="single"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
            className={"rounded-none "}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={receiver}>
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
  );
}
