import { Sidebar, Navbar, Footer } from "./components";

const DefaultLayout = ({ children }) => {
  return (
    <div className="sm:-8  bg-[#f9fbfc] min-h-screen flex flex-col gap-20">
      <div className="relative p-4 flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />

          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
