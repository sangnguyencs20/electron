import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { axiosAllUser } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
export default function AssignDropDown({ selected, setSelected }) {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const id = useSelector((state) => state.userState.id);
  useEffect(() => {
    axiosAllUser()
      .then((res) => {
        setPeople(
          res.data
            .filter((item) => item._id !== id)
            .map((data) => ({
              _id: data._id,
              name: data.fullName,
              role: data.role,
              address: data.address,
              position: data.position,
              walletAddress: data.walletAddress,
            }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleDelete = (id) => {
    setSelected((prevPeople) => {
      return prevPeople.filter((person) => person._id !== id);
    });
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-gray-50 rounded-lg px-4 py-2">
      <div className=" top-16 w-full">
        <Combobox value={selected} onChange={setSelected} multiple>
          <div className="relative mt-1">
            <div className="relative w-2/5 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                placeholder="Search here"
                className="text-left relative w-full cursor-default  py-[10px] sm:px-[25px] px-[15px] shadow-2xl shadow-black bg-transparent font-epilogue text-gray-blue-400 text-[14px] placeholder:text-sm rounded-[10px] sm:min-w-[300px] focus:outline-none"
                displayValue={(people) =>
                  people[people.length - 1]?.name
                    ? people[people.length - 1]?.name
                    : ""
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-900"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              enter="transition ease-in duration-900"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="z-50 absolute mt-2 ml-4 p-2 max-h-60 w-fit overflow-auto rounded-lg bg-white text-base shadow-lg focus:outline-none sm:text-sm border-gray-300 border-[0.5px] hover:shadow-lg hover:shadow-blue-500/50 scrollbar-hide scroll-smooth">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative rounded-lg cursor-pointer select-none py-2 pr-4 ease-in-out transition-[background] duration-500 ${
                          active
                            ? "bg-gray-200 text-black scale-100"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            initial={{ opacity: 0, y: -200 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 200 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                            className="flex justify-start  border-b gap-1"
                          >
                            <span className="w-14 flex justify-center items-center">
                              {selected ? (
                                <div className="flex justify-center items-center bg-transparent rounded-full w-fit h-fit p-1">
                                  <CheckIcon
                                    className={` w-5 h-5 ${
                                      !active
                                        ? "text-blue-500"
                                        : "text-gray-700"
                                    }`}
                                    aria-hidden="true"
                                  />
                                </div>
                              ) : null}
                            </span>
                            <div className="flex flex-col items-start w-32">
                              <span
                                className={`block truncate ${
                                  selected
                                    ? "font-medium underline text-opacity-5"
                                    : "font-normal"
                                }
                          `}
                              >
                                {person.name}
                              </span>
                              <span
                                className={`text-[12px] ${
                                  active
                                    ? "text-light-blue-800 "
                                    : "text-blue-900"
                                }`}
                              >
                                Họ và tên
                              </span>
                            </div>
                            <div className="flex flex-col items-start w-32">
                              <span
                                className={`text-[12px] ${
                                  active
                                    ? "text-light-blue-100"
                                    : "text-light-blue-100"
                                } p-1 bg-blue-gray-600 rounded-md min-w-[50px] text-center`}
                              >
                                {person.position}
                              </span>
                              <span
                                className={`text-[12px] ${
                                  active
                                    ? "text-gray-700"
                                    : "text-gray-blue-900"
                                }`}
                              >
                                Vai trò
                              </span>
                            </div>

                            <div className="hidden md:flex flex-col items-start w-32">
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.address}
                              </span>
                              <span
                                className={`text-[12px] ${
                                  active
                                    ? "text-gray-700"
                                    : "text-light-blue-900"
                                }`}
                              >
                                Cơ quan
                              </span>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
            {selected.length > 0 && (
              <ul className="scrollbar-hide scroll-smooth mt-5 p-2 max-h-60 w-full h-fit overflow-auto rounded-md bg-slate-50 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {selected.map((person) => (
                  <AnimatePresence mode="popLayout">
                    <motion.li
                      key={person._id}
                      initial={{ opacity: 0, x: -200 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: 100 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="items-center rounded-lg cursor-default w-full py-2 pl-2 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 flex  hover:shadow-lg hover:shadow-gray-500/50 ease-out duration-500"
                    >
                      <CheckIcon
                        className="h-5 w-5 text-blue-500 mx-4"
                        aria-hidden="true"
                      />
                      <div className="flex justify-start border-b">
                        <div className="flex flex-col items-start w-32">
                          <span
                            className={`block truncate ${
                              selected ? "font-medium underline" : "font-normal"
                            }
                            `}
                          >
                            {person.name}
                          </span>
                          <span className={`text-[12px] `}>Họ và tên</span>
                        </div>
                        <div className="flex flex-col items-start w-32">
                          <span
                            className={`text-[12px]  p-1 bg-blue-gray-600 rounded-md text-white`}
                          >
                            {person.position}
                          </span>
                          <span className={`text-[12px] `}>Vị trí</span>
                        </div>

                        <div className="hidden md:flex flex-col items-start w-32">
                          <span className={`block truncate `}>
                            {person.address}
                          </span>
                          <span className={`text-[12px] `}>Cơ quan</span>
                        </div>
                      </div>
                      <TrashIcon
                        value={person.id}
                        className="h-5 w-5 hover:text-blue-950 cursor-pointer ml-auto"
                        aria-hidden="true"
                        onClick={(e) => {
                          handleDelete(person._id);
                        }}
                      />
                    </motion.li>
                  </AnimatePresence>
                ))}
              </ul>
            )}
          </div>
        </Combobox>
      </div>
    </div>
  );
}
