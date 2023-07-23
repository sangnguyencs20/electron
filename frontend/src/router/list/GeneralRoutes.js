import { DraftDetail, Login, SignUp, NewSignup } from "../../pages";

const GeneralRouters = [
  {
    path: "login",
    element: Login,
    title: "Login",
  },
  {
    path: "signup",
    element: NewSignup,
    title: "Signup",
  },
  {
    path: "newsignup",
    element: NewSignup,
    title: "NewSignup",
  },
];

export default GeneralRouters;
