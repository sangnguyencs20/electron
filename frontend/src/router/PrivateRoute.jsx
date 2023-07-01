import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DefaultLayout } from "../layouts";

const PrivateRoute = ({ children }) => {
  let location = useLocation();

  const { accessToken } = useSelector((state) => state.userState);
  const userState = useSelector((state) => state);
  console.log(accessToken);
  console.log(userState);
  if (accessToken == "") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <DefaultLayout children={children} />;
};

export default PrivateRoute;
