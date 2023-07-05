import { Home, Draft, DraftDetail, DraftCreate, Approve } from "../../pages";

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
    path: "create",
    element: DraftCreate,
    title: "DraftDetail",
  },
  {
    path: "approve",
    element: Approve,
    title: "Approve",
  },
];

export default UserRoutes;
