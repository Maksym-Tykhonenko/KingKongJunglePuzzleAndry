import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createContext, useState} from 'react';
import ActiveHome from '../../assets/svg/active-home.svg';
import NonActiveHome from '../../assets/svg/nonactive-home.svg';
import ActiveProfile from '../../assets/svg/active-profile.svg';
import NonActiveProfile from '../../assets/svg/nonactive-profile.svg';
import ActiveProgress from '../../assets/svg/active-progress.svg';
import NonActiveProgress from '../../assets/svg/nonactive-progress.svg';
import ActiveAwards from '../../assets/svg/active-awards.svg';
import NonActiveAwards from '../../assets/svg/nonactive-awards.svg';
import ActiveGame from '../../assets/svg/active-game.svg';
import NonActiveGame from '../../assets/svg/nonactive-game.svg';
import { BlurView } from '@react-native-community/blur';
import Home from './home';
import Profile from './profile';
import Progress from './progress';
import Awards from './awards';
import Game from './game';

interface TabContextType {
  points: number;
  setPoints: (name: number) => void;
  levels: number;
  setLevels: (name: number) => void;
  time: number;
  setTime: (name: number) => void;
  awards: number;
  setAwards: (name: number) => void;
}

export const TabContext = createContext<TabContextType>({
  points: 50,
  setPoints: () => {},
  levels: 0,
  setLevels: () => {},
  time: 0,
  setTime: () => {},
  awards: -1,
  setAwards: () => {},
});

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <BlurView style={[styles.blurContainer, { backgroundColor: 'rgba(2, 51, 10, 0.5)' }]} blurType="light" blurAmount={20}/>
        <View style={styles.innerTabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            return (
              <TouchableOpacity
                key={route.name}
                onPress={() => navigation.navigate(route.name)}
                style={styles.tabButton}
              >
                {options.tabBarIcon({ focused: isFocused })}
              </TouchableOpacity>
            );
          })}
        </View>
    </View>
  );
};

export default function Tabs() {
  const [points, setPoints] = useState<number>(50);
  const [time, setTime] = useState<number>(0);
  const [levels, setLevels] = useState<number>(0);
  const [awards, setAwards] = useState<number>(-1);

  return (
    <TabContext.Provider value={{ points, setPoints, time, setTime, levels, setLevels, awards, setAwards }}>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (focused ? <ActiveHome /> : <NonActiveHome />),
          }}
        />
        <Tab.Screen
          name="Progress"
          component={Progress}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (focused ? <ActiveProgress /> : <NonActiveProgress />),
          }}
        />
        <Tab.Screen
          name="Game"
          component={Game}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (focused ? <ActiveGame /> : <NonActiveGame />),
          }}
        />
        <Tab.Screen
          name="Awards"
          component={Awards}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (focused ? <ActiveAwards /> : <NonActiveAwards />),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (focused ? <ActiveProfile /> : <NonActiveProfile />),
          }}
        />
      </Tab.Navigator>
    </TabContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 20,
  },
  blurContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  innerTabBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
});
