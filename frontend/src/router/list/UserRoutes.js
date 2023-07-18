import {
  Home,
  Draft,
  DraftDetail,
  DraftCreate,
  Approve,
  Profile,
} from "../../pages";
import Create from "../../pages/create";

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
  {
    path: "draft/:id",
    element: DraftDetail,
    title: "DraftDetail",
  },
  {
    path: "profile",
    element: Profile,
    title: "Profile",
  },
  {
    path: "newCreate",
    element: Create,
    title: "Create",
  },
];

export default UserRoutes;
