import { Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import CommentSection from "../../components/CommentSection";
import DetailBox from "../../components/DetailBox";
import { axiosDocument } from "../../api";
import { useLocation } from "react-router-dom";
import { CustomPreloader } from "react-preloaders";
import CustomRotatingSquare from "../../components/CustomRotatingSquare";
import TimeLineTable from "../../components/TimeLine";
const DraftDetail = () => {
  const data = [
    {
      label: "Description",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Exercitationem quam saepe officiis, eum corrupti cupiditate tempore.
      Inventore a assumenda minima provident, fuga facere molestiae,
      laboriosam fugiat deserunt rerum quos sequi`,
    },
    {
      label: "Status",
      value: "profile",
      icon: UserCircleIcon,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Comments",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  const docId = useLocation().pathname.split("/")[2];
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axiosDocument(docId)
      .then((res) => {
        setDocument(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [docId]);
  return (
    <div className="flex flex-col gap-10 ">
      {isLoading && <CustomRotatingSquare />}
      <div>
        <div className="w-full flex justify-start">
          <div className="max-w-2xl whitespace-pre-line mt-5">
            <Text
              h1
              size={30}
              color="#005C97"
              weight="bold"
              className="font-sans subpixel-antialiased"
            >
              {document.title}
            </Text>
          </div>
        </div>
        <hr className="my-3 h-0.5 border-t-0 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-100 dark:opacity-50" />
      </div>

      <Tabs value="dashboard">
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              disabled={label === "Comments" && !document.isPublished}
            >
              <h1 className="block font-sans text-xl font-semibold leading-tight tracking-normal text-black antialiased uppercase">
                {label}
              </h1>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }, idx) => {
            console.log(idx);
            if (idx === 0)
              return (
                <TabPanel key={value} value={value}>
                  <DetailBox document={document} />
                </TabPanel>
              );
            else if (idx === 1)
              return (
                <TabPanel
                  key={value}
                  value={value}
                  className="flex justify-center w-full"
                >
                  <div className="bg-blue-gray-50 p-4 w-full rounded-xl">
                    {document && <TimeLineTable receiver={docId} />}
                  </div>
                </TabPanel>
              );
            else if (idx === 2)
              return (
                <TabPanel
                  key={value}
                  value={value}
                  className={`flex justify-end w-full`}
                  disabled={document.isPublished === true}
                >
                  <div className={`p-4 w-full flex flex-col items-center `}>
                    <CommentSection docId={document._id} />
                  </div>
                </TabPanel>
              );
            // <TabPanel key={value} value={value}>
            //   {desc}
            // </TabPanel>;
          })}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default DraftDetail;
