import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";
import Badge from "./screens/Badge";
import Hospital from "./screens/Hospital";
import Search from "./screens/Search";
import Trainer from "./screens/Trainer";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Image } from "react-native";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Search: {
      screen: Search,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => <Image
        source={require("../assets/search.png")}
        style={{ width: size * 1.5, height: size * 1.5, marginBottom: 15}}/>,
      },
    },
    Trainer: {
      screen: Trainer,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => <Image
        source={require("../assets/Trainer/Ash.png")}
        style={{ width: size * 1.5, height: size * 1.5, marginBottom: 15, marginTop: 5}}/>,
      },
    },
    Favorite: {
      screen: FavoritesScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => (
          <Image
            source={require("../assets/logo.png")}
            style={{ width: size * 3, height: size * 3, marginBottom: 40 }}
            resizeMode="contain"
          />
        ),
        tabBarIconStyle: { alignSelf: "center" },
      },
    },
    Badge: {
      screen: Badge,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => <Image
        source={require("../assets/Badge/Badge/Rainbow.png")}
        style={{ width: size * 1.5, height: size * 1.5, marginBottom: 15}}
        resizeMode="contain"
      />
      },
    },
    Hospital: {
      screen: Hospital,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => <Image
        source={require("../assets/PokeCenter.png")}
        style={{ width: size * 1.5, height: size * 1.5, marginBottom: 15}}/>,
      },
    },
  },
  screenOptions: {
    tabBarStyle: {
      height: 70,      
      paddingTop: 10,
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
