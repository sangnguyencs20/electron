import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logo, sun } from "../../assets";
import { navlinks } from "../../constants";
import { motion } from "framer-motion";
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-white"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles} ${"hover:scale-125 hover:shadow-lg hover:shadow-cyan-500/50"}  ease-in duration-100 transform-gpu origin-center `}
    onClick={handleClick}
  >
    {!isActive ? (
      <img
        src={imgUrl}
        alt="fund_logo"
        className="w-1/2 h-1/2 hover:rotate-6"
      />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "text-white"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  let local = useLocation();
  const [isActive, setIsActive] = useState(local);
  console.log(isActive);

  return (
    <div className="flex justify-between items-center flex-col sticky h-fit md:h-[85vh]">
      <div className=" px-3 bg-blue-100 flex-1 flex flex-row md:flex-col justify-between items-center md:ring-1 md:ring-blue-50 md:hover:ring-slate-400 rounded-[20px] md:w-[76px] py-4 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex flex-row md:flex-col justify-center items-center gap-3"
        >
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </motion.div>

        <Icon styles="bg-white shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
