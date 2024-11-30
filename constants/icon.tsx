import { Feather } from "@expo/vector-icons";

export const icon = {
  index: (props: any) => <Feather name="message-square" size={24} {...props} />,
  events: (props: any) => <Feather name="calendar" size={24} {...props} />,
  profile: (props: any) => <Feather name="user" size={24} {...props} />,
};
