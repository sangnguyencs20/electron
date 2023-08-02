import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { axiosHistoryDocument } from "../../api";
import { formattedDateTime, vietSub } from "../../utils";
const TimeLineTable = ({ receiver, timeSubmit }) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axiosHistoryDocument(receiver)
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => console.error(err));
  }, [receiver]);
  return (
    <div>
      <VerticalTimeline>
        {history?.map((item) => {
          if (item.receiver && item.status === "Approved")
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  borderTop: "5px",
                  borderTopStyle: "solid",
                  borderTopColor: "rgb(33, 150, 243)",
                  color: "black",
                }}
                // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
                date={`${formattedDateTime(item.time)}`}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<CheckCircleIcon />}
              >
                <div className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-blue-300 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-5 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-blue-700 group-hover:text-white font-medium">
                          {item.receiver.fullName}
                        </span>
                        <span> ({`${item.receiver.position}`})</span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-blue-500  bg-blue-400 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div
                          className={
                            "leading-[21px] mt-[10px] p-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          else if (item.receiver && item.status === "Rejected") {
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date={formattedDateTime(item.time)}
                iconStyle={{ background: "rgb(233, 30, 99)", color: "" }}
                icon={<XCircleIcon />}
                contentStyle={{
                  borderBottom: "5px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "rgb(233, 30, 99)",
                  color: "black",
                }}
              >
                <div className=" mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-pink-500 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-pink-300  border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-5 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-pink-700 group-hover:text-white font-medium">
                          {item.receiver.fullName}
                        </span>
                        <span> ({`${item.receiver.position}`})</span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-pink-500  bg-pink-400 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div className="mt-10 mb-5">
                          <span className="my-1 text-md capitalize font-bold block">
                            Góp ý :
                          </span>
                          <div class="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                            {item.comment}
                          </div>
                        </div>
                        <div
                          className={
                            "leading-[21px] mt-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Submitted") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "#ff9800", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Submit"}
                icon={<ChevronDoubleUpIcon />}
              >
                <div className=" mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-orange-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-orange-300 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-2 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-orange-700 group-hover:text-white font-medium"></span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-orange-500  bg-orange-300 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div
                          className={
                            "leading-[21px] mt-[10px] p-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Approved") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Submit"}
                icon={<ChevronDoubleUpIcon />}
              >
                <div className=" mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-orange-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-green-300 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-2 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-green-700 group-hover:text-white font-medium"></span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-green-500  bg-green-300 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div
                          className={
                            "leading-[21px] mt-[10px] p-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Rejected") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(244, 67, 54)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Rejected"}
                icon={<ChevronDoubleUpIcon />}
              >
                <div className=" mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-orange-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-red-300 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-2 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-red-700 group-hover:text-white font-medium"></span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-red-500  bg-red-300 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div
                          className={
                            "leading-[21px] mt-[10px] p-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Published") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "#68c1b9", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Published"}
                icon={<ChevronDoubleUpIcon />}
              >
                <div className=" mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-teal-300 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-orange-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-teal-300 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-2 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-teal-700 group-hover:text-white font-medium"></span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-teal-500  bg-teal-300 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div
                          className={
                            "leading-[21px] mt-[10px] p-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Finished") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "#9e9e9e", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Finished"}
                icon={<ChevronDoubleUpIcon />}
              >
                <div className=" mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-500 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-orange-900 hover:shadow-xl"></span>
                  <div className="group p-4 bg-white hover:bg-gray-800 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl duration-1000 ease-out hover:translate-y-2 transition-all">
                    <div className="items-center justify-between mb-3 sm:flex">
                      <div className="text-sm font-normal group-hover:text-white text-gray-800 lex dark:text-gray-300 leading-[21px]">
                        {"Dự thảo đã được "}
                        <span className="text-lg text-gray-700 group-hover:text-white font-medium"></span>
                        <a
                          href={`${
                            import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                          }/tx/${item.txHash}`}
                          target="_blank"
                          className="block w-fit rounded-lg mt-10 p-4 text-lg text-white group-hover:text-gray-500  bg-gray-800 group-hover:bg-white  font-semibold  dark:text-white hover:underline duration-500 group-hover:-translate-y-2 hover:shadow-2xl"
                        >
                          {vietSub(item.status)}
                        </a>
                        <div
                          className={
                            "leading-[21px] mt-[10px] p-[10px] max-w-[300px] overflow-hidden break-all text-white rounded-md translate-y-2 group-hover:translate-y-0 duration-1000 cursor-pointer hidden group-hover:block"
                          }
                          onClick={() => {
                            window.open(
                              `${
                                import.meta.env.VITE_REACT_SEPOLIA_EXPLORER
                              }/tx/${item.txHash}`,
                              "_blank"
                            );
                          }}
                        >
                          <span className="text-md capitalize font-bold block">
                            mã xác nhận:{" "}
                          </span>
                          <span className="group-hover:underline">
                            {item.txHash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          }
        })}
      </VerticalTimeline>
    </div>
  );
};
export default TimeLineTable;
