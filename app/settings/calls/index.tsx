import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import CallSettings from 'components/settings/CallSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message } from 'store/redux/store'

export default function Calls() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Calls setings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <CallSettings />
      </Contents800_2_flexdirection>
    </View>
  )
}
