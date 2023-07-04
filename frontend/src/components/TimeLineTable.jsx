import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";

export default function TimeLineTable({ receiver }) {
  const columns = [
    { name: "_ID", uid: "_id" },
    { name: "ROLE", uid: "role" },
    { name: "TIME", uid: "time" },
    { name: "STATUS", uid: "status" },
  ];
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "_id":
        return (
          <Text size={12} color={"#687076"}>
            {user.id}
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

        return cellValue;
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
