import { Footer } from "./components";

const GeneralLayout = ({ children }) => {
  return (
    <div className="sm:-8  bg-[#f9fbfc] flex flex-col gap-5 h-screen">
      <div className="relative flex flex-row">
        <div className="sm:flex hidden mr-10 relative"></div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GeneralLayout;
