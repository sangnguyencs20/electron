import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { axiosAllUser } from "../api";

export default function AssignDropDown({ selected, setSelected }) {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axiosAllUser()
      .then((res) => {
        console.log(res);
        setPeople(
          res.data.map((data) => ({
            id: data._id,
            name: data.fullName,
            role: data.role,
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
    console.log(id);
    setSelected((prevPeople) => {
      return prevPeople.filter((person) => person.id !== id);
    });
  };

  return (
    <div className="flex-1 w-full flex flex-col">
      <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
        Receiver *
      </span>
      <div className=" top-16 w-full">
        <Combobox value={selected} onChange={setSelected} multiple>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="text-left relative w-full cursor-default  py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                displayValue={(people) =>
                  people[people.length - 1]?.name
                    ? people[people.length - 1]?.name
                    : "Search here ..."
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
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-400 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
            {selected.length > 0 && (
              <ul className="mt-5 max-h-60 w-full overflow-auto rounded-md bg-slate-50  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {selected.map((person) => (
                  <li
                    key={person.id}
                    className=" cursor-default w-full border-none py-2 pl-2 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 flex hover:bg-blue-300 hover:text-white"
                  >
                    <CheckIcon
                      className="h-5 w-5 text-blue-500"
                      aria-hidden="true"
                    />
                    <span className="w-[30%] font-medium ml-10">
                      {person.name}
                    </span>
                    <span className="w-[30%]">{person.role}</span>
                    <TrashIcon
                      value={person.id}
                      className="h-5 w-5 hover:text-blue-950 cursor-pointer ml-auto"
                      aria-hidden="true"
                      onClick={(e) => {
                        handleDelete(person.id);
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Combobox>
      </div>
    </div>
  );
}
