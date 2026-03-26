import { ChevronRight, LayoutList, Mail, MessagesSquare, Moon, Settings, Star, TvMinimalPlay, UserCog2, UserRoundCog, Video } from '@tamagui/lucide-icons-2'
import Account from 'app/account'
import Streams from 'app/streams/streams'
import Contents800 from 'components/Contents800'
import { HorizontalTabs } from 'components/HorizontalTabs'
import { VerticalTabs } from 'components/VerticalTabs '
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
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
              <ListItem title="General" subTitle="General app settings" icon={Settings} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem title="Listings" subTitle="Lists, searches, filters" icon={LayoutList} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem title="Streams" subTitle="Live, recorded, lists, searches views, filters" icon={TvMinimalPlay} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem title="Calls" subTitle="Video, audio, skin, themes" icon={Video} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem title="Chat" subTitle="Buble, Online status, Suscriptions" icon={MessagesSquare} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem title="Inmail" subTitle="Inbox, outbox, sent items" icon={Mail} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
              <ListItem title="Account" subTitle="Profile, name, coins" icon={UserRoundCog} iconAfter={ChevronRight} />
            </YGroup.Item>
            <Separator />
          </YGroup>
        </View>
      </Contents800>
    </View>
  )
}
