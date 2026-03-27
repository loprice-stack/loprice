import Contents800 from 'components/Contents800'
import { HorizontalTabs } from 'components/HorizontalTabs'
import { VerticalTabs } from 'components/VerticalTabs '
import React from 'react'
import {
  Button,
  H5,
  Separator,
  SizableText,
  Tabs,
  XStack,
  YStack,
  isWeb,
  Text,
  useWindowDimensions,
} from 'tamagui'

import Contents400_2_flex from 'components/Contents400_2_flex';

import ListingTabBar from 'components/ListingTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import LiveStreams from './livestreams'
import RecordedStreams from './recordedstreams'
import SearchStreams from './searchstreams'




const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}

const Tab = createMaterialTopTabNavigator();
export default function Streams() {

  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]

  const { width, height } = useWindowDimensions();


  return (
    <Contents800>
      <Tab.Navigator
        tabBar={(props) => <ListingTabBar {...props} />}>
        <Tab.Screen name="live" component={LiveStreams} />
        <Tab.Screen name="recorded" component={RecordedStreams} />
        <Tab.Screen name="search" component={SearchStreams} />
      </Tab.Navigator>
    </Contents800>
  )
}
