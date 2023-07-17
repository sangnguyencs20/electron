import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import CustomSugar from "../components/CustomSugar";
import DefaultSpeedDial from "../components/DefaultSpeedDial";
import { Sidebar, Navbar, Footer } from "./components";

const DefaultLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col gap-1">
      <Navbar />
      <div className="relative p-4 flex flex-row">
        <Sidebar />
        <div className="flex-1 max-sm:w-full max-w-screen-2xl mx-auto sm:pr-5 max-h-screen overflow-y-auto scrollbar-hide">
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
