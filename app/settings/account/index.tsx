import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import AccountSettings from 'components/settings/AccountSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message } from 'store/redux/store'

export default function Account() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Acoount settings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <AccountSettings />
      </Contents800_2_flexdirection>
    </View>
  )
}
