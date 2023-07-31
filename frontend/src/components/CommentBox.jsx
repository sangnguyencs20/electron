import { Card } from "@nextui-org/react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { formattedDateTime } from "../utils";
import { UserIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
const CommentBox = ({ item }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      ref={ref}
      className={`relative ease-in duration-1000 ${
        isInView ? "opacity-100" : "opacity-5"
      }`}
    >
      <Card
        isHoverable
        isPressable
        variant="bordered"
        className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 hover:shadow-lg hover:shadow-cyan-500/50"
      >
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white gap-1">
              <UserIcon className="w-5" />
              {item.createdBy.fullName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                {formattedDateTime(item.createdAt)}
              </time>
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
          <div
            id="dropdownComment1"
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Remove
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p className="text-gray-800 dark:text-gray-400">
          <ul className="ml-3 mt-3 flex flex-col gap-2 list-disc">
            {item.content.split(". ").map((item) => (
              <li className="">{item}</li>
            ))}
          </ul>
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            onClick={() => {
              window.open(
                `${import.meta.env.VITE_REACT_SEPOLIA_EXPLORER}/tx/${
                  item.txHash
                }`,
                "_blank"
              );
            }}
          >
            {/* <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg> */}
            Transaction code
            (0xbb2c813fb9b30fc8906ed4cec8bac1a4cbab46af57a75150e671b9286a4fc3d3)
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default CommentBox;
