import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import CustomSugar from "../components/CustomSugar";
import DefaultSpeedDial from "../components/DefaultSpeedDial";
import { Sidebar, Navbar, Footer } from "./components";

const DefaultLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col gap-1">
      <Navbar />
      <div className="relative p-4 flex flex-col gap-10 md:gap-2 lg:gap-1 lg:flex-row">
        <Sidebar />
        <div className="flex-1 sm:w-full lg:max-w-screen-2xl mx-auto sm:pr-5 max-h-screen overflow-x-scroll scrollbar-hide">
          <CustomBreadcrumbs />
          {children}
        </div>
        <DefaultSpeedDial />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
