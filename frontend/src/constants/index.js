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
    tooptip: "Trang Chủ",
  },
  {
    name: "/draft",
    imgUrl: createCampaign,
    link: "/draft",
    tooptip: "Dự thảo của tôi",
  },
  {
    name: "/approve",
    imgUrl: payment,
    link: "/approve",
    tooptip: "Kiểm duyệt dự thảo",
  },
];
