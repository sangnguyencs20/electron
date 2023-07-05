import { Card, Text, Button, Row, Collapse } from "@nextui-org/react";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import { useEffect, useState } from "react";
export default function App({ title, createdBy, description }) {
  const [isShow, setIsShow] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 60000);
  }, []);

  return (
    <div className={"relative"}>
      <Card
        isHoverable
        isPressable
        css={{ mw: "330px" }}
        onMouseOver={() => setIsShow(false)}
      >
        <Card.Header className="flex justify-between gap-2 text-center">
          <Text b>{title}</Text>
          {!isExpand ? (
            <MarkEmailUnreadOutlinedIcon className="text-blue-600" />
          ) : (
            <DraftsOutlinedIcon className="text-blue-600" />
          )}
        </Card.Header>
        <Card.Body css={{ py: "$0" }}>
          <Collapse.Group>
            <Collapse
              title="Information"
              subtitle="More description about information"
              onClick={() => {
                setIsExpand((pre) => !pre);
              }}
            >
              <Text>{description}</Text>
              <p className="text-gray-400 text-xs">Description</p>
              <div className="mt-10 flex justify-between pl-5">
                <div
                  className={
                    "py-2 px-4 bg-blue-gray-50 flex justify-center items-center flex-col gap-2 rounded-lg min-w-[100px]"
                  }
                >
                  <p className="font-bold text-sm text-gray-700">
                    {createdBy.fullName}
                  </p>
                  <p className="text-gray-400 text-xs">Created By</p>
                </div>
                <div
                  className={
                    "py-2 px-4 bg-blue-gray-50 flex justify-center items-center flex-col gap-3 rounded-lg min-w-[100px]"
                  }
                >
                  <p className="font-bold text-sm text-gray-700 max-w-[105px] pr-1 whitespace-pre-line text-clip mr-1">
                    {createdBy.updatedAt}
                  </p>
                  <p className="text-gray-400 text-xs">To Date</p>
                </div>
              </div>
            </Collapse>
          </Collapse.Group>
        </Card.Body>
        <Card.Footer className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <Row justify="flex-end">
            <Button size="sm" light className="text-white hover:text-gray-100">
              Detail
            </Button>
            <Button
              size="sm"
              light
              className="text-gray-50 hover:text-gray-400"
            >
              Mark
            </Button>
          </Row>
        </Card.Footer>
      </Card>
      <span
        class={`animate-ping ${
          !isShow && "hidden"
        } absolute inline-flex h-[8px] w-[8px] rounded-full bg-blue-300 opacity-100   z-[500px] top-0 right-0`}
      ></span>
    </div>
  );
}
