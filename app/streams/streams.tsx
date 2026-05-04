import Contents800 from 'components/Contents800'
import ListingTabBar from 'components/listings/ListingTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import LiveStreams from './livestreams'
import RecordedStreams from './recordedstreams'
import SearchStreams from './searchstreams'


const Tab = createMaterialTopTabNavigator();
export default function Streams() {

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
