import { Popover, Button, Text } from "@nextui-org/react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Ring from "../layouts/components/Ring";
export default function Alert() {
  return (
    <Popover>
      <Popover.Trigger>
        <Ring />
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>This is the content of the popover.</Text>
      </Popover.Content>
    </Popover>
  );
}
