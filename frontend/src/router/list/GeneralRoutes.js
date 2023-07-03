import { DraftDetail, Login, SignUp } from "../../pages";

const GeneralRouters = [
  {
    path: "login",
    element: Login,
    title: "Login",
  },
  {
    path: "signup",
    element: SignUp,
    title: "Signup",
  },
  {
    path: "draft/:id",
    element: DraftDetail,
    title: "DraftDetail",
  },
];

export default GeneralRouters;
