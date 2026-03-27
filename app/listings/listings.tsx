import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useWindowDimensions } from 'tamagui';
import Contents800 from 'components/Contents800';
import ListingTabBar from 'components/ListingTabBar';
import Apartments from './apartments';
import FremShops from './fremshops';
import Houses from './houses';
import Jitboxes from './jtboxes';
import Rooms from './rooms';
import ShortList from './shortlist';
import ListingSearch from './searchlisting';








export default function Listings() {

  const Tab = createMaterialTopTabNavigator();

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
        <Tab.Screen name="search" component={ListingSearch} />
      </Tab.Navigator>
    </Contents800>
  );
}






