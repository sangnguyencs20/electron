import {
  Navbar,
  Button,
  Link,
  Text,
  useTheme,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import { Layout } from "./Layout";
import { AcmeLogo } from "./AcmeLogo";
import { ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearInfo } from "../../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Alert from "../../components/Alert";
import Ring from "./Ring";

export default function CustomNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useTheme();
  const username = useSelector((state) => state.userState.username);
  const handleClick = (e) => {
    console.log("clicked");
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
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="primary"
              onAction={(actionKey) => {
                if (actionKey === "logout") handleClick();
                if (actionKey === "profile") navigate("/profile");
              }}
            >
              <Dropdown.Item key="profiles" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {username}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="profile" withDivider>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item
                key="logout"
                withDivider
                color="error"
                css={{ width: "100%", textAlign: "start" }}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
