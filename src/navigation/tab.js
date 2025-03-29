import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Trainer from "../navigation/screens/Trainer";
import Badge from "../navigation/screens/Badge";
import Search from "../navigation/screens/Search";
import FavoritesScreen from "../navigation/screens/FavoritesScreen";
import Hospital from "../navigation/screens/Hospital";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "white",
        ...styles.shadow,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 25,
          right: 25,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          marginRight: 10,
          marginLeft: 10,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Trainer"
        component={Trainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 25,
              }}
            >
              <Ionicons
                name="person"
                resizeMode="contain"
                size={25}
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 8,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Trainer
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 25,
              }}
            >
              <Ionicons
                name="search"
                resizeMode="contain"
                size={25}
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 8,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 20,
                left: 20,
              }}
            >
              <Image
                source={require("../assets/logo.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Badge"
        component={Badge}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 25,
              }}
            >
              <Ionicons
                name="nuclear-outline"
                resizeMode="contain"
                size={25}
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 9,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Badge
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Hospital"
        component={Hospital}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 25,
              }}
            >
              <Ionicons
                name="earth-outline"
                resizeMode="contain"
                size={25}
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 6,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Hospital
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
