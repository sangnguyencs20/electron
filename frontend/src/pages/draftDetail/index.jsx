import { Text } from "@nextui-org/react";
import React from "react";
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
  return (
    <div className="flex flex-col gap-10 ">
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
              Dự thảo Luật Bảo vệ Môi trường Đô thị
            </Text>
          </div>
        </div>
        <hr className="my-3 h-0.5 border-t-0 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-100 dark:opacity-50" />
      </div>

      <Tabs value="dashboard">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <Text
                className="flex items-center gap-2"
                b
                css={{
                  color: "black",
                }}
              >
                {label}
              </Text>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }, idx) => {
            console.log(idx);
            if (idx === 0)
              return (
                <TabPanel key={value} value={value}>
                  <DetailBox />
                </TabPanel>
              );
            else if (idx === 1)
              return (
                <TabPanel
                  key={value}
                  value={value}
                  className="flex justify-center"
                >
                  <div className="bg-blue-gray-50 p-4 w-full flex justify-between">
                    <Text className="max-w-[500px] text-[#2f4d6f] font-sans">
                      Công ty VBC
                    </Text>
                    <Text className="max-w-[500px] text-[#2f4d6f] font-sans">
                      Chấp nhận
                    </Text>
                    <Text className="max-w-[500px] text-[#2f4d6f] font-sans">
                      Transaction code
                    </Text>
                  </div>
                </TabPanel>
              );
            else if (idx === 2)
              return (
                <TabPanel
                  key={value}
                  value={value}
                  className="flex justify-end w-full"
                >
                  <div className="p-4 w-full flex flex-col items-center">
                    <CommentSection />
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
