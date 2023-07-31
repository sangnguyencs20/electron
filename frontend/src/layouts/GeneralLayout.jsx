import { Footer } from "./components";

const GeneralLayout = ({ children }) => {
  return (
    <div className="flex mx-auto justify-center items-center">{children}</div>
  );
};

export default GeneralLayout;
