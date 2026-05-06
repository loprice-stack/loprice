import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import ListingsSettings from 'components/settings/listing/ListingsSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message } from 'store/redux/store'

export default function Listings() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Listings settings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <ListingsSettings />
      </Contents800_2_flexdirection>
    </View>
  )
}
