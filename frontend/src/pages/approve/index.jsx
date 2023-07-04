import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { IconButton } from "../../components/IconButton";
import { EyeIcon } from "../../components/EyeIcon";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { useState } from "react";
import MyModal from "../../components/MyModal";
import RejectModal from "../../components/RejectModal";

const DetailCell = ({ id, title, createdBy, time }) => {
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-2 max-w-[200px]">
      <div className="col-span-1">
        <p className="font-bold text-sm text-slate-700">{id}</p>
        <p className="text-slate-400 text-xs">Id</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-slate-700">{createdBy}</p>
        <p className="text-slate-400 text-xs">Created By</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-slate-700">{title}</p>
        <p className="text-slate-400 text-xs">Title</p>
      </div>
      <div className="col-span-1">
        <p className="font-bold text-sm text-slate-700">{time}</p>
        <p className="text-slate-400 text-xs">Time</p>
      </div>
    </div>
  );
};

const StateCell = ({ secretState, urgencyState }) => {
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-0">
      <div className="col-span-1 flex flex-col items-center">
        <p className="font-bold text-sm text-slate-700">{secretState}</p>
        <p className="text-slate-400 text-xs">Secret State</p>
      </div>
      <div className="col-span-1 flex flex-col items-center">
        <p className="font-bold text-sm text-slate-700">{urgencyState}</p>
        <p className="text-slate-400 text-xs">Urgency State</p>
      </div>
    </div>
  );
};

const StatusCell = ({ receiver }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row max-w-[200px] justify-center items-center gap-5 min-w-[150px]">
      <span className="text-red-400 bg-rose-50 rounded-md max-w-fit px-3 py-1 font-semibold text-center">
        {receiver[0].status}
      </span>
      <div className="flex flex-col justify-center w-full">
        <span className="font-bold text-sm text-slate-700">
          {receiver[0].name}
        </span>
        <span className="text-slate-400 text-xs font-medium">
          {receiver[0].time}
        </span>
      </div>
    </div>
  );
};
const DescriptionCell = ({ description }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row max-w-[250px] justify-center items-center gap-5 min-w-[150px]">
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <div className="col-span-2">
          <p className="font-bold text-sm text-slate-700 line-clamp-4 max-h-[5.5rem] overflow-hidden">
            {description}
          </p>
          <p className="text-slate-400 text-xs">Description</p>
        </div>
      </div>
    </div>
  );
};
export const FileCell = ({ link }) => {
  return (
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
  );
};
export default function Approve() {
  const columns = [
    { name: "DOC DETAIL", uid: "detail" },
    { name: "CURRENT STATUS", uid: "status" },
    { name: "STATE", uid: "state" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "FILE", uid: "file" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const documents = [
    {
      id: 1,
      _id: "64a22e3077479251f1d682dc",
      title: "Tran Van Tai",
      createdBy: "64902cdceeb9f73cdf4e11b0",
      time: "29/05/2002",
      receiver: [
        {
          id: "64902cdceeb9f73cdf4e11b0",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "6499a74b9b59d0820d0062c9",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b3e3a76fcd1757c5685c",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b43952dd0f0a2e85e89a",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "64a1768f0c096167bfb31bf9",
          name: "Tran Van Tai",
          status: "noreply",
          time: "29/05/2002",
        },
      ],
      secretState: "Low",
      urgencyState: "Low",
      field: "dsadad",
      fileLink:
        "https://drive.google.com/file/d/1iGDYy48NldvwUxPl4Qi3T5oxsi2wSXbo/view?usp=drive_web",
    },
    {
      id: 1,
      _id: "64a22e3077479251f1d682dc",
      title: "Tran Van Tai",
      createdBy: "64902cdceeb9f73cdf4e11b0",
      time: "29/05/2002",
      receiver: [
        {
          id: "64902cdceeb9f73cdf4e11b0",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "6499a74b9b59d0820d0062c9",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b3e3a76fcd1757c5685c",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b43952dd0f0a2e85e89a",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "64a1768f0c096167bfb31bf9",
          name: "Tran Van Tai",
          status: "noreply",
          time: "29/05/2002",
        },
      ],
      secretState: "Low",
      urgencyState: "Low",
      field: "dsadad",
      fileLink:
        "https://drive.google.com/file/d/1iGDYy48NldvwUxPl4Qi3T5oxsi2wSXbo/view?usp=drive_web",
    },
    {
      id: 1,
      _id: "64a22e3077479251f1d682dc",
      title: "Tran Van Tai",
      createdBy: "64902cdceeb9f73cdf4e11b0",
      time: "29/05/2002",
      receiver: [
        {
          id: "64902cdceeb9f73cdf4e11b0",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "6499a74b9b59d0820d0062c9",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b3e3a76fcd1757c5685c",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b43952dd0f0a2e85e89a",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "64a1768f0c096167bfb31bf9",
          name: "Tran Van Tai",
          status: "noreply",
          time: "29/05/2002",
        },
      ],
      secretState: "Low",
      urgencyState: "Low",
      field: "dsadad",
      fileLink:
        "https://drive.google.com/file/d/1iGDYy48NldvwUxPl4Qi3T5oxsi2wSXbo/view?usp=drive_web",
    },
    {
      id: 1,
      _id: "64a22e3077479251f1d682dc",
      title: "Tran Van Tai",
      createdBy: "64902cdceeb9f73cdf4e11b0",
      time: "29/05/2002",
      receiver: [
        {
          id: "64902cdceeb9f73cdf4e11b0",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "6499a74b9b59d0820d0062c9",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b3e3a76fcd1757c5685c",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b43952dd0f0a2e85e89a",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "64a1768f0c096167bfb31bf9",
          name: "Tran Van Tai",
          status: "noreply",
          time: "29/05/2002",
        },
      ],
      secretState: "Low",
      urgencyState: "Low",
      field:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repudiandae distinctio fugiat tempora! Quidem, non deleniti ut, praesentium alias sit culpa quia temporibus dolorem distinctio deserunt officiis soluta architecto excepturi.",
      fileLink:
        "https://drive.google.com/file/d/1iGDYy48NldvwUxPl4Qi3T5oxsi2wSXbo/view?usp=drive_web",
    },
    {
      id: 1,
      _id: "64a22e3077479251f1d682dc",
      title: "Tran Van Tai",
      createdBy: "64902cdceeb9f73cdf4e11b0",
      time: "29/05/2002",
      receiver: [
        {
          id: "64902cdceeb9f73cdf4e11b0",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "6499a74b9b59d0820d0062c9",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b3e3a76fcd1757c5685c",
          name: "Tran Van Tai",
          status: "approved",
          time: "29/05/2002",
        },
        {
          id: "6499b43952dd0f0a2e85e89a",
          name: "Tran Van Tai",
          status: "rejected",
          time: "29/05/2002",
        },
        {
          id: "64a1768f0c096167bfb31bf9",
          name: "Tran Van Tai",
          status: "noreply",
          time: "29/05/2002",
        },
      ],
      secretState: "Low",
      urgencyState: "Low",
      field: "dsadad",
      fileLink:
        "https://drive.google.com/file/d/1iGDYy48NldvwUxPl4Qi3T5oxsi2wSXbo/view?usp=drive_web",
    },
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
            time={doc.time}
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
      case "description":
        return <DescriptionCell description={doc.field} />;
      case "file":
        return <FileCell link={doc.fileLink} />;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Time Line">
                <MyModal receiver={doc.receiver} />
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Approve" color="primary">
                <IconButton onClick={() => console.log("Edit user", doc.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Reject"
                color="error"
                onClick={() => console.log("Delete user", doc.id)}
              >
                <RejectModal />
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <div className="mt-20">
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
        className="p-0 m-0 rounded-none"
      >
        <Table.Header columns={columns} className="p-48 m-0">
          {(column) => (
            <Table.Column
              key={column.uid}
              // hideHeader={column.uid === "id"}
              align={column.uid === "state" ? "center" : "start"}
              className={"rounded-none p-4"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={documents} css={{ gap: "12px" }}>
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
          rowsPerPage={4}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </div>
  );
}
