import { ChevronRight, LayoutList, Mail, MessagesSquare, Moon, Settings, Star, TvMinimalPlay, UserCog2, UserRoundCog, Video } from '@tamagui/lucide-icons-2'
import Account from 'app/account'
import Streams from 'app/streams/streams'
import { createContacts, getContacts } from 'client/xmpp/xmlutilty'
import Contents800 from 'components/Contents800'
import { HorizontalTabs } from 'components/listings/HorizontalTabs'
import { VerticalTabs } from 'components/listings/VerticalTabs '
import { Stack } from 'expo-router'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { _message, useAppSelector } from 'store/redux/store'
import {
  Separator,
  useWindowDimensions,
  YGroup,
  ListItem,
} from 'tamagui'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}



export default function SettingsHome() {

  const { width, height } = useWindowDimensions();
  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]
 const messageContext = useContext(_message)
  const { user_id } = useAppSelector(state => state.account.user)









  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Settings", headerShown: true }} />
      <Contents800>
        <View style={{ width: width < 600 ? width - 2 : 800 }}>
          <YGroup
            justify={'center'}
            items={'center'}
            borderWidth={1}
            borderColor="$borderColor"
            rounded="$4"
            width={width < 600 ? width - 2 : 400}
            size="$5"
          >
            <YGroup.Item>
              <ListItem
                onPress={() => {
                  console.log("-------create---contacts----clicked----")
                  getContacts(messageContext.xmpp, user_id).then((response) => {
                    console.log(response.toString())
                     console.log("-----------------------------response----------------------------------")
                  }).catch((error) => {
                    console.log(error.toString())
                     console.log("------------------------------error-------------------------------------")
                  })
                }}
                gap="$3"
                cursor="pointer"
                title="General"
                icon={Settings}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem
                gap="$3"
                cursor="pointer"
                title="Listings"
                icon={LayoutList}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem
                gap="$3"
                cursor="pointer"
                title="Streams"
                icon={TvMinimalPlay}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem
                gap="$3"
                cursor="pointer"
                title="Calls"
                icon={Video}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem
                gap="$3"
                cursor="pointer"
                title="Chat"
                icon={MessagesSquare}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem
                gap="$3"
                cursor="pointer"
                title="Inmail"
                icon={Mail}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem
                gap="$4"
                cursor="pointer"
                title="Account"
                icon={UserRoundCog}
                iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
          </YGroup>
        </View>
      </Contents800>
    </View>
  )
}
