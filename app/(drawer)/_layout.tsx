
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from 'app/account';
import Login from 'app/account/login';
import Listings from 'app/listings/listings';
import SettingsHome from 'app/settings/settings';
import Streams from 'app/streams/streams';
import { _session, _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store';
import { useWindowDimensions } from 'tamagui';
import Conversations from 'app/conversations';



const Drawer = createDrawerNavigator();

export default function DrawerLayout() {

  let remoteCandidates = [];
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { user_token } = useAppSelector(state => state.account.user)

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#04AA6D',
      }}
    >
      <Drawer.Screen name="listings" component={Listings} options={{ title: 'Listings' }} />
      <Drawer.Screen name="streams" component={Streams} options={{ title: 'Streams' }} />
      <Drawer.Screen name="conversations" component={Conversations} options={{ title: 'Conversations' }} />
      <Drawer.Screen name="account" component={user_token ? Account : Login} options={{ title: 'Account' }} />
      <Drawer.Screen name="settings" component={SettingsHome} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  );

























}

