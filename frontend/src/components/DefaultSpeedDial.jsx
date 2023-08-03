import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function DefaultSpeedDial() {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal hover:font-bold",
  };

  return (
    <div className="fixed w-full right-20 bottom-20 z-50 bg-blue-gray-200">
      <div className="absolute bottom-0 right-0">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="bg-blue-gray-50 rounded-full">
            <Link to="/draft/create">
              <SpeedDialAction className="relative">
                <Square3Stack3DIcon className="h-5 w-18" />
                <Typography {...labelProps}>Tạo dự thảo</Typography>
              </SpeedDialAction>
            </Link>
            <Link to="/home">
              <SpeedDialAction className="relative">
                <HomeIcon className="h-5 w-5" />
                <Typography {...labelProps}>Về trang chủ</Typography>
              </SpeedDialAction>
            </Link>
            <SpeedDialAction className="relative">
              <CogIcon className="h-5 w-5 hover:font-bold" />
              <Typography {...labelProps}>Cài đặt</Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}
