//utils
import { Route, Routes } from "react-router-dom";
//route
import GeneralRoutes from "./list/GeneralRoutes";
import UserRoutes from "./list/UserRoutes";
//page
import NotFound from "../pages/notFound";
//layout
import { DefaultLayout, GeneralLayout } from "../layouts";

const RouterList = () => {
  return (
    <Routes>
      {GeneralRoutes.map((item, idx) => (
        <Route
          key={idx}
          path={item.path}
          element={
            <GeneralLayout>
              <item.element />
            </GeneralLayout>
          }
        />
      ))}
      {UserRoutes.map((item, idx) => (
        <Route
          key={idx}
          path={item.path}
          element={
            <DefaultLayout>
              <item.element />
            </DefaultLayout>
          }
        />
      ))}
      <Route path="/404" element={<NotFound />} />

      {/* Use if we have many role in system */}
      {/* <Route path="/user" element={<PrivateRoute roles={[ROLE.User]} />}>
        {UserRoutes.map((item, idx) => (
          <Route key={idx} path={item.path} element={<item.element />} />
        ))}
      </Route> */}
      {/* <Route path="*" element={<Login />} /> */}
    </Routes>
  );
};

export default RouterList;
