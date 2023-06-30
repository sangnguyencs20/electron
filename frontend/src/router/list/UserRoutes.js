import { Login, Home, Draft, DraftDetail, DraftCreate } from "../../pages";

const UserRoutes = [
  {
    path: "home",
    element: Home,
    title: "Home",
  },
  {
    path: "draft",
    element: Draft,
    title: "Draft",
  },
  {
    path: "draft/:id",
    element: DraftDetail,
    title: "DraftDetail",
  },
  {
    path: "create",
    element: DraftCreate,
    title: "DraftDetail",
  },
];

export default UserRoutes;
