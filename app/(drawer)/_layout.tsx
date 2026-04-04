
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from 'app/account';
import Login from 'app/account/login';
import Conversations from 'app/conversations';
import Listings from 'app/listings/listings';
import SettingsHome from 'app/settings/settings';
import Streams from 'app/streams/streams';
import { useAppSelector } from 'store/redux/store';




const Drawer = createDrawerNavigator();

export default function DrawerLayout() {

const isloggedin = useAppSelector(state => state.account.user.user_token)
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#04AA6D',
       

      }}
    >
      <Drawer.Screen name="listings" component={Listings} options={{ title: 'Listings' }}/>
      <Drawer.Screen name="streams" component={Streams} options={{ title: 'Streams' }} />
      <Drawer.Screen name="calls" component={Conversations} options={{ title: 'Conversations' }} />
      <Drawer.Screen name="account" component={isloggedin ? Account : Login} options={{ title: 'Account' }} />
      <Drawer.Screen name="settings" component={SettingsHome} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  );
}

