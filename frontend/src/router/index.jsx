import { Route, Routes, Navigate } from "react-router-dom";
import GeneralRoutes from "./list/GeneralRoutes";
import UserRoutes from "./list/UserRoutes";
import NotFound from "../pages/notFound";
import { DefaultLayout, GeneralLayout } from "../layouts";
import store from "../state";
import { Home } from "../pages";
import PrivateRoute from "./PrivateRoute";

const RouterList = () => {
  // Check if user is logged in
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
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
            <PrivateRoute>
              <item.element />
            </PrivateRoute>
          }
        />
      ))}
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default RouterList;
