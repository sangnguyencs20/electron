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
const TimeLineTable = ({ receiver }) => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{
          borderTop: "5px",
          borderTopStyle: "solid",
          borderTopColor: "rgb(33, 150, 243)",
          color: "black",
        }}
        // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date="July 16, 2023 - Present"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<CheckCircleIcon />}
      >
        <h3 className="vertical-timeline-element-title text-blue-gray-100">
          Creative Director
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Status: <span className={styles.status}>Approve</span>
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{
          borderTop: "5px",
          borderTopStyle: "solid",
          borderTopColor: "rgb(33, 150, 243)",
          color: "black",
        }}
        date="July 15, 2023"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<CheckCircleIcon />}
        // icon={<WorkIcon />}
      >
        <h3 className="vertical-timeline-element-title">Art Director</h3>
        <h4 className="vertical-timeline-element-subtitle">
          San Francisco, CA
        </h4>
        <p>
          Status: <span className={styles.status}>Approve</span>
        </p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="April 2013"
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
          Content Marketing for Web, Mobile and Social Media
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
        <p>
          Status: <span className={styles.statusReject}>Reject</span>
        </p>
        <p className={styles.title}>
          Reasson:
          <span className={styles.content}>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            placeat. Eos similique praesentium voluptatum incidunt error soluta
            earum quia culpa porro quas distinctio commodi, veritatis ipsum odit
            suscipit voluptatibus unde.
          </span>
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="July 14, 2023"
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
          Agile Development Scrum Master
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Certification</h4>
        <p>
          Status: <span className={styles.statusReject}>Reject</span>
        </p>
        <p className={styles.title}>
          Reasson:
          <span className={styles.content}>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            placeat. Eos similique praesentium voluptatum incidunt error soluta
            earum quia culpa porro quas distinctio commodi, veritatis ipsum odit
            suscipit voluptatibus unde.
          </span>
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="July 13, 2023"
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
          Bachelor of Science in Interactive Digital Media Visual Imaging
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
        <p>
          Status: <span className={styles.statusReject}>Reject</span>
        </p>
        <p className={styles.title}>
          Reasson:
          <span className={styles.content}>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            placeat. Eos similique praesentium voluptatum incidunt error soluta
            earum quia culpa porro quas distinctio commodi, veritatis ipsum odit
            suscipit voluptatibus unde.
          </span>
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        date="July 8, 2023 - Submit"
        icon={<ChevronDoubleUpIcon />}
      />
    </VerticalTimeline>
  );
};
export default TimeLineTable;
