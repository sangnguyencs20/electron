import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "/home",
    imgUrl: dashboard,
    link: "/home",
  },
  {
    name: "/draft",
    imgUrl: createCampaign,
    link: "/draft",
  },
  {
    name: "/approve",
    imgUrl: payment,
    link: "/approve",
  },
];
