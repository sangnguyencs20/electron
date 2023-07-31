import React from "react";
import { VBC } from "../../assets/index";
import Wave from "react-wavify";
const Footer = () => {
  return (
    <div className="mt-52">
      <Wave
        fill="#3B71CA"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      ></Wave>
      <div className="flex justify-center bg-[#3B71CA] text-white pb-20">
        <footer className="relative z-10 p-4">
          <div className="container">
            <div className="flex flex-wrap gap-10 justify-between">
              <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
                <div className="w-full">
                  <a href="/#" className="mb-6 inline-block max-w-[200px]">
                    <img src={VBC} alt="logo" className="max-w-full" />
                  </a>
                  <p className="text-[14px] leading-[21px]">
                    <span className="font-medium">
                      Vietnam Blockchain Corporation
                    </span>{" "}
                    - A leading pioneer of the Blockchain field in Vietnam aims
                    to create new value for high quality Vietnamese branded
                    products.
                  </p>
                </div>
              </div>

              <LinkGroup header="Về Công ty">
                <NavLink link="/#" label="Về VBC" />
                <NavLink link="/#" label="Lịch sử & Phát triển" />
                <NavLink link="/#" label="Dịch vụ" />
                <NavLink link="/#" label="Sản phẩm" />
              </LinkGroup>
              <LinkGroup header="Ngôn ngữ">
                <NavLink link="/#" label="English" />
                <NavLink link="/#" label="Tiếng Việt" />
              </LinkGroup>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;

const LinkGroup = ({ children, header }) => {
  return (
    <>
      <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
        <div className="w-full">
          <h4 className="text-[12px] md:text-[16px] font-medium leading-[24px]">
            {header}
          </h4>
          <ul>{children}</ul>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ link, label }) => {
  return (
    <div className="hover:translate-x-1 ease-out duration-1000">
      <li>
        <a
          href={link}
          className={`text-gray-300 hover:text-white  text-[10px] md:text-[14px] leading:[15px] md:leading-[21px]`}
        >
          {label}
        </a>
      </li>
    </div>
  );
};
