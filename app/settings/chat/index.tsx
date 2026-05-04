import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import ChatSettings from 'components/settings/ChatSettings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { _message,  } from 'store/redux/store'

export default function Chat() {

  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Chat settings", headerShown: true }} />
      <Contents800_2_flexdirection>
        <ChatSettings />
      </Contents800_2_flexdirection>
    </View>
  )
}
