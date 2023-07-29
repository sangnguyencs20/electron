import { useRef, useState } from "react";
import Card from "./Card";
import { Tab } from "@headlessui/react";
import { Pagination } from "@nextui-org/react";
import { motion, useInView } from "framer-motion";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const DisplayDrafts = ({ documents }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const drafts = {
    Recent: documents,
    Popular: documents.filter((item) => item.secretState != "High"),
    Trending: documents.filter((item) => item.urgencyState != "Low"),
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="w-full px-2 sm:px-0"
    >
      <Tab.Group vertical>
        <div ref={ref}>
          <Tab.List
            className="flex space-x-1 rounded-xl bg-blue-900/20 p-1"
            ref={ref}
          >
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
        </div>
        <Tab.Panels className="mt-2">
          {Object.values(drafts).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -200 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="grid grid-flow-row sm:gird-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[20px] gap-[80px] w-full justify-center items-stretch"
              >
                {posts.map((item, idx) => {
                  return <Card {...item} />;
                })}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </motion.div>
  );
};

export default DisplayDrafts;
