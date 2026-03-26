import * as React from 'react';
import { Animated, View, Platform, Text } from 'react-native';
import {
  useLinkBuilder,
  useTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountCard from 'components/AccountCard';
import { Avatar, Separator, useWindowDimensions } from 'tamagui';
import { Stack } from 'expo-router';
import Contents800 from 'components/Contents800';
import ListingTabBar from 'components/ListingTabBar';
import Apartments from './Apartments';
import FremShops from './FremShops';
import Houses from './Houses';
import Jitboxes from './Jtboxes';
import Rooms from './Rooms';
import ShortList from './ShortList';




const Tab = createMaterialTopTabNavigator();




export default function Listings() {

  const { width, height } = useWindowDimensions();


  return (
    <Contents800>
      <Tab.Navigator
        tabBar={(props) => <ListingTabBar {...props} />}>
        <Tab.Screen name="rooms" component={Rooms} />
        <Tab.Screen name="houses" component={Houses} />
        <Tab.Screen name="apartments" component={Apartments} />
        <Tab.Screen name="jtboxes" component={Jitboxes} />
        <Tab.Screen name="fremshops" component={FremShops} />
        <Tab.Screen name="shortlist" component={ShortList} />
      </Tab.Navigator>
    </Contents800>
  );
}






