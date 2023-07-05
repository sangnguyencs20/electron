import { Popover, Button, Text } from "@nextui-org/react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
export default function Alert() {
  return (
    <Popover>
      <Popover.Trigger>
        <NotificationsActiveOutlinedIcon
          fontSize="large"
          className="cursor-pointer text-[100px]"
        />
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>This is the content of the popover.</Text>
      </Popover.Content>
    </Popover>
  );
}
