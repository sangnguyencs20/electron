import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import { Layout } from "./Layout";
import { AcmeLogo } from "./AcmeLogo";
import { ButtonBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearInfo } from "../../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Alert from "../../components/Alert";
import Ring from "./Ring";

export default function CustomNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useTheme();

  const handleClick = (e) => {
    dispatch(clearInfo());
    navigate("/login");
  };
  return (
    <Layout>
      <Navbar shouldHideOnScroll isBordered={isDark} variant="sticky">
        <RouterLink to="/home" className="text-blue-400">
          <Navbar.Brand>
            <AcmeLogo />
            <Text b color="inherit" hideIn="xs">
              Electron
            </Text>
          </Navbar.Brand>
        </RouterLink>
        <Navbar.Content>
          <Navbar.Item>
            <Ring />
          </Navbar.Item>
          <Navbar.Link color="inherit" href="#">
            Profile
          </Navbar.Link>
          <Navbar.Item>
            <Button
              auto
              flat
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Log out
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
