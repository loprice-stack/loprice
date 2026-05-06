import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import GeneralSettings from 'components/settings/general/GeneralSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message } from 'store/redux/store'

export default function General() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "General settings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <GeneralSettings />
      </Contents800_2_flexdirection>
    </View>
  )
}
