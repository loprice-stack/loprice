import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import StreamsSettings from 'components/settings/stream/StreamsSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message, useAppSelector } from 'store/redux/store'
export default function General() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Streams settings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <StreamsSettings />
      </Contents800_2_flexdirection>
    </View>
  )
}
