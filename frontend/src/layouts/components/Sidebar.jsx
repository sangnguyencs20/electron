import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logo, sun } from "../../assets";
import { navlinks } from "../../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-white"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles} ${"hover:scale-125"}  ease-in duration-100 transform-gpu origin-center`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
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
    <div className="flex justify-between items-center flex-col sticky h-[85vh]">
      <div className="bg-blue-100 flex-1 flex flex-col justify-between items-center md:ring-1 md:ring-blue-50 md:hover:ring-slate-400 rounded-[20px] w-[76px] py-4 shadow-xl">
        <div className="flex flex-col justify-center items-center gap-3">
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
        </div>

        <Icon styles="bg-white shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
