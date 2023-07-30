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
                  src="data:image/png;base64,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"
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
