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
import { formattedDateTime } from "../../utils";
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
                <h3 className="vertical-timeline-element-title text-blue-gray-100">
                  {item.receiver.position}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {item.receiver.fullName}
                </h4>
                <p>
                  Status: <span className={styles.status}>{item.status}</span>
                </p>

                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          else if (item.receiver && item.status === "Rejected") {
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date={formattedDateTime(item.time)}
                iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
                icon={<XCircleIcon />}
                contentStyle={{
                  borderBottom: "5px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "rgb(233, 30, 99)",
                  color: "black",
                }}
              >
                <h3 className="vertical-timeline-element-title">
                  {item.receiver.position}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {item.receiver.fullName}
                </h4>
                <p>
                  Status:{" "}
                  <span className={styles.statusReject}>{item.status}</span>
                </p>
                <p className={styles.title}>
                  Reasson:
                  <span className={styles.content}> {item.comment}</span>
                </p>
                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Submitted") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Submit"}
                icon={<ChevronDoubleUpIcon />}
              >
                <p>
                  Status:{" "}
                  <span className={styles.statusSubmitted}>{item.status}</span>
                </p>
                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Approved") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Submit"}
                icon={<ChevronDoubleUpIcon />}
              >
                <p>
                  Status: <span className={styles.status}>{item.status}</span>
                </p>
                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Rejected") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Submit"}
                icon={<ChevronDoubleUpIcon />}
              >
                <p>
                  Status:{" "}
                  <span className={styles.statusRejected}>{item.status}</span>
                </p>
                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Published") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Published"}
                icon={<ChevronDoubleUpIcon />}
              >
                <p>
                  Status:{" "}
                  <span className={styles.statusPublished}>{item.status}</span>
                </p>
                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          } else if (item.status === "Finished") {
            return (
              <VerticalTimelineElement
                iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
                date={formattedDateTime(item.time) + " - Finished"}
                icon={<ChevronDoubleUpIcon />}
              >
                {" "}
                <p>
                  Status:{" "}
                  <span className={styles.statusFinished}>{item.status}</span>
                </p>
                <p>
                  txHash:{" "}
                  <div
                    className={styles.txHash}
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                          item.txHash
                        }`,
                        "_blank"
                      );
                    }}
                  >
                    <span>{item.txHash}</span>
                  </div>
                </p>
              </VerticalTimelineElement>
            );
          }
        })}
      </VerticalTimeline>
    </div>
  );
};
export default TimeLineTable;
