import { Card, Text, Button, Row, Collapse } from "@nextui-org/react";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formattedDateTime } from "../utils";

export default function App({
  title,
  createdBy,
  description,
  timeSubmit,
  _id,
}) {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 60000);
  }, []);
  return (
    <div
      ref={ref}
      className={`relative ease-in duration-1000 ${
        isInView ? "opacity-100" : "opacity-50"
      }`}
    >
      <Card
        isHoverable
        isPressable
        css={{ mw: "330px" }}
        onMouseOver={() => setIsShow(false)}
        className="hover:shadow-lg hover:shadow-cyan-500/50"
      >
        <Card.Header className="flex justify-between gap-2 text-center w-full">
          <Text
            b
            css={{
              h: "60px",
              display: "block",
              width: "100%",
            }}
            className="whitespace-pre-line text-clip"
          >
            {title}
          </Text>
          {!isExpand ? (
            <MarkEmailUnreadOutlinedIcon className="text-blue-600" />
          ) : (
            <DraftsOutlinedIcon className="text-blue-600" />
          )}
        </Card.Header>
        <Card.Body css={{ py: "$0" }}>
          <Collapse.Group>
            <Collapse
              title="Mô tả"
              subtitle="Mở rộng thẻ để xem chi tiết"
              onClick={() => {
                setIsExpand((pre) => !pre);
              }}
            >
              <Text>{description}</Text>
              <p className="text-gray-400 text-xs">Mô tả</p>
              <div className="mt-10 flex justify-between items-stretch pl-5">
                <div
                  className={
                    "py-2 bg-blue-gray-50 flex justify-between text-center items-center flex-col gap-2 rounded-lg min-w-[100px]"
                  }
                >
                  <p className="font-bold text-sm text-gray-700 w-[80px] overflow-clip break-all">
                    {createdBy.fullName}
                  </p>
                  <p className="text-gray-400 text-xs">Người tạo</p>
                </div>
                <div
                  className={
                    "py-2 px-4 bg-blue-gray-50 flex justify-between text-center items-center flex-col gap-3 rounded-lg min-w-[100px]"
                  }
                >
                  <p className="font-bold text-sm text-gray-700 max-w-[105px] pr-1 whitespace-pre-line text-clip mr-1">
                    {formattedDateTime(timeSubmit)}
                  </p>
                  <p className="text-gray-400 text-xs">Ngày tạo</p>
                </div>
              </div>
            </Collapse>
          </Collapse.Group>
        </Card.Body>
        <Card.Footer className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <Row justify="flex-end">
            <Button
              size="sm"
              light
              className="text-white hover:text-gray-100"
              onClick={() => {
                navigate(`/draft/${_id}`);
              }}
            >
              Chi tiết
            </Button>
            <Button
              size="sm"
              light
              className="text-gray-50 hover:text-gray-400 cursor-not-allowed"
            >
              Mark
            </Button>
          </Row>
        </Card.Footer>
      </Card>
      <span
        className={`animate-ping ${
          !isShow && "hidden"
        } absolute inline-flex h-[8px] w-[8px] rounded-full bg-blue-300 opacity-100   z-[500px] top-0 right-0`}
      ></span>
    </div>
  );
}
