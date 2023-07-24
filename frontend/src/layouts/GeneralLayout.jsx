import { Footer } from "./components";

const GeneralLayout = ({ children }) => {
  return (
    <div className="sm:-8  bg-[#f9fbfc] flex flex-col gap-5 h-screen">
      <div className="relative flex flex-row">
        <div className="flex mx-auto w-4/5 sm:pr-5 justify-center items-center h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GeneralLayout;
