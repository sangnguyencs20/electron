import { useState } from "react";
import Card from "./Card";
import { Tab } from "@headlessui/react";
import { Pagination } from "@nextui-org/react";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const DisplayDrafts = ({ documents }) => {
  const drafts = {
    Recent: documents,
    Popular: documents.filter((item) => item.secretState != "High"),
    Trending: documents.filter((item) => item.urgencyState != "Low"),
  };
  console.log(drafts, documents);
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group vertical>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(drafts).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-bold leading-5  ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                  selected
                    ? "bg-white shadow text-blue-700 "
                    : "text-slate-700 hover:bg-white/[0.12] hover:text-slate-400 text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(drafts).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div className="flex flex-wrap mt-[20px] gap-[80px] w-full items-start justify-center">
                {posts.map((item, idx) => {
                  return (
                    <Card
                      title={item.title}
                      createdBy={item.createdBy}
                      description={item.description}
                    />
                  );
                })}
              </div>
            </Tab.Panel>
          ))}
          <div className="flex w-full justify-end mt-36">
            <Pagination total={5} initialPage={1} />
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DisplayDrafts;
