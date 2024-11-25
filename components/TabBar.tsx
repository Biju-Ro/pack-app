import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Feather } from "@expo/vector-icons";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const icon = {
    index: (props: any) => (
      <Feather name="message-square" size={24} {...props} />
    ),
    events: (props: any) => <Feather name="calendar" size={24} {...props} />,
    profile: (props: any) => <Feather name="user" size={24} {...props} />,
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <View
              style={[
                styles.bubble,
                isFocused && styles.bubbleFocused, // Add red bubble when focused
              ]}
            >
              {icon[route.name]({
                color: isFocused ? "#fff" : "#222", // Icon color changes to white if focused
              })}
              <Text
                style={{
                  color: isFocused ? "#fff" : "#222", // Text color changes to white if focused
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  bubbleFocused: {
    backgroundColor: "red", // Red bubble when focused
  },
});
