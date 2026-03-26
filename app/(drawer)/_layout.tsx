
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from 'app/account';
import Login from 'app/account/login';
import Calls from 'app/calls/calls';
import Chats from 'app/chats/chats';
import Inmails from 'app/inmails/inmails';
import Listings from 'app/listings/listings';
import SettingsHome from 'app/settings/settings';
import Settings from 'app/settings/settings';
import Streams from 'app/streams/streams';
import React from 'react';




const Drawer = createDrawerNavigator();

export default function DrawerLayout() {

   const [isloggedin, setIsloggedin] = React.useState(false)
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#04AA6D',
       

      }}
    >
      <Drawer.Screen name="listings" component={Listings} options={{ title: 'Listings' }}/>
      <Drawer.Screen name="streams" component={Streams} options={{ title: 'Streams' }} />
      <Drawer.Screen name="calls" component={Calls} options={{ title: 'Calls' }} />
      <Drawer.Screen name="chats" component={Chats} options={{ title: 'Chats' }} />
      <Drawer.Screen name="inmails" component={Inmails} options={{ title: 'Inmails' }} />
      <Drawer.Screen name="account" component={isloggedin ? Account : Login} options={{ title: 'Account' }} />
      <Drawer.Screen name="settings" component={SettingsHome} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  );
}

