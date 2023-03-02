import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
// import ExerciseSvg from '@assets/exercise.svg';
import ProfileSvg from '@assets/profile.svg';

import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Platform } from 'react-native';

type AppRoutes = {
  home: undefined;
  history: undefined;
  exercise: undefined;
  profile: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = () => {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator 
      initialRouteName='exercise' 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: colors.gray[600],
        }
      }}
    >
      <Screen 
        name="home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => {
            return <HomeSvg fill={color} width={iconSize} height={iconSize} />
          }
        }}
      />

      <Screen 
        name="history" 
        component={History} 
        options={{
          tabBarIcon: ({ color }) => {
            return <HistorySvg fill={color} width={iconSize} height={iconSize} />
          }
        }}
      />

      <Screen 
        name="exercise" 
        component={Exercise}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => {
            return <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          }
        }}
      />
    </Navigator>
  )
}
