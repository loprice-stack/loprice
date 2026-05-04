import Contents400_2_display from 'components/Contents400_2_display'
import Contents400_3 from 'components/Contents400_3'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import AccountSettings from 'components/settings/AccountSettings'
import CallSettings from 'components/settings/CallSettings'
import ChatSettings from 'components/settings/ChatSettings'
import GeneralSettings from 'components/settings/GeneralSettings'
import ListingsSettings from 'components/settings/ListingsSettings'
import SettingsTypeCard from 'components/settings/SettingsTypeCard'
import StreamsSettings from 'components/settings/StreamsSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message, useAppSelector } from 'store/redux/store'
import {
  Separator,
  useWindowDimensions
} from 'tamagui'
import { SETTINGS_TYPE_ACCOUNT, SETTINGS_TYPE_CALLS, SETTINGS_TYPE_CHAT, SETTINGS_TYPE_GENERAL, SETTINGS_TYPE_INMAIL, SETTINGS_TYPE_LISTINGS, SETTINGS_TYPE_STREAMS } from 'utils/constants'



export default function SettingsHome() {

  const { width, height } = useWindowDimensions();
  const { settingstype } = useAppSelector(state => state.settings)





  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Settings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <Contents400_3>
          <SettingsTypeCard />
        </Contents400_3>
        <Separator display={width < 600 ? 'none' : 'flex'} vertical={width < 600 ? false : true} my={15} gap={'$8'} />
        <Contents400_2_display>
          {settingstype == SETTINGS_TYPE_GENERAL
            ? <GeneralSettings /> : settingstype == SETTINGS_TYPE_LISTINGS
            ? <ListingsSettings /> : settingstype == SETTINGS_TYPE_STREAMS
            ? <StreamsSettings /> : settingstype == SETTINGS_TYPE_CALLS
            ? <CallSettings /> : settingstype == SETTINGS_TYPE_CHAT
            ? <ChatSettings /> : settingstype == SETTINGS_TYPE_ACCOUNT
              ? <AccountSettings /> : <GeneralSettings />}
        </Contents400_2_display>
      </Contents800_2_flexdirection>
    </View>
  )
}
