import { Breadcrumbs } from "@material-tailwind/react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CustomBreadcrumbs() {
  const local = useLocation();
  useEffect(() => {}, [local]);
  const arrayLocal = local.pathname.split("/").filter((item) => item !== "");
  const len = arrayLocal.length;
  const vietSub = (english) => {
    if (english == "approve") return "duyệt";
    if (english == "draft") return "bản thảo";
    if (english == "home") return "trang chủ";
    if (english == "create") return "tạo bản thảo";
    return english;
  };
  return (
    <Breadcrumbs className="mb-2 md:mb-10 bg-white">
      <Link to="/home" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
      {arrayLocal.map((item, idx) => {
        let link = "";
        for (let i = 0; i <= idx; i++) link = link + "/" + arrayLocal[i];
        return (
          <Link
            to={link}
            className={`${idx !== len - 1 && "opacity-60"}`}
            key={link}
          >
            <span>{vietSub(arrayLocal[idx]).toLocaleUpperCase()}</span>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
