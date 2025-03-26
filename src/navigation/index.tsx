import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Trainer from './screens/Trainer';
import Badge from './screens/Badge';
import Search from './screens/Search';
import Hospital from './screens/Hospital';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Search: {
      screen: Search,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => (
          <Ionicons name="search" size={24}  />
        ),
      },
    },
    Trainer: {
      screen: Trainer,
      options: {
        headerShown: false,
        
        tabBarIcon: ({ size }) => (
          <Ionicons name="man" size={24}  />
        ),
      },
    },
    Badge: {
      screen: Badge,
      options: {
        headerShown: false,
        tabBarIcon: ({ size }) => (
          <Ionicons name="ribbon" size={24}  />
        ),
      },
    },
    Hospital: {
      screen: Hospital,
      options: {
        headerShown: false,
        tabBarIcon: ({size }) => (
          <Ionicons name="medkit" size={24}  />
        ),
      },
    }
    
  },

});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
