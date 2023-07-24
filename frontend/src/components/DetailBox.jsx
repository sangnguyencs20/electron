import { Card, Text } from "@nextui-org/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
const DetailBox = ({ document }) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div className="bg-white rounded-lg flex flex-col gap-0 w-full justify-center px-40 py-10">
      <div className="flex justify-between gap-10">
        <CopyToClipboard
          text="tran van tai"
          onCopy={() => {
            setCopied(true);
            console.log("tran van tai");
          }}
          className="w-full"
        >
          <button>
            <Card
              isHoverable
              variant="flat"
              className="flex flex-col items-start w-full rounded-md p-4 bg-transparent cursor-pointe relative bg-white border border-black"
              onMouseEnter={() => {
                setShow((pre) => !pre);
              }}
              onMouseLeave={() => {
                setShow((pre) => !pre);
                setCopied(false);
              }}
            >
              <Text
                className={`text-light-blue-600 w-full font-bold uppercase ${
                  show ? "underline " : ""
                }`}
              >
                Title
              </Text>
              <p
                className={`ease-in-out duration-500 text-base leading-8 w-full  `}
              >
                {document?.title}
              </p>
              <ClipboardIcon
                className={`absolute h-5 w-5 right-4 ${
                  !show ? "opacity-0" : copied ? "opacity-0" : "opacity-100"
                } hover:shadow-black ease-in-out duration-500 transition-all `}
              />
              <ClipboardDocumentCheckIcon
                className={`absolute h-6 w-6 right-4 ${
                  !show ? "opacity-0" : !copied ? "opacity-0" : "opacity-100"
                }     hover:shadow-black ease-in-out duration-500 transition-all`}
              />
            </Card>
          </button>
        </CopyToClipboard>

        <Card
          isHoverable
          variant="flat"
          className="flex flex-col items-start w-full rounded-md p-4 bg-transparent cursor-pointe relative bg-white text-center border border-black"
        >
          <p className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-transparent bg-clip-text w-full font-bold uppercase">
            Author
          </p>
          <p className="w-full leading-8 ">{document?.createdBy?.fullName}</p>
        </Card>
      </div>
      <hr className="my-12 h-0.5 border-t-0 bg-black opacity-30 dark:opacity-50" />

      <Card isHoverable className="flex flex-col items-start w-full p-4">
        <p className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-transparent bg-clip-text font-bold uppercase">
          Description
        </p>
        <ul className="list-disc ml-12 mt-5 flex flex-col gap-5 pr-5">
          {document?.description?.split(". ").map((item) => {
            return (
              <li>
                <p className="leading-8 ">{item}</p>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default DetailBox;
