import { HorizontalTabs } from 'components/HorizontalTabs'
import { VerticalTabs } from 'components/VerticalTabs '
import React from 'react'
import {
  Button,
  H5,
  Separator,
  SizableText,
  Tabs,
  XStack,
  YStack,
  isWeb,
  Text,
  useWindowDimensions,
} from 'tamagui'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}


export default function Chats() {

  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]
  return (
    <YStack
      px="$1"
      items='center'
      {...(isWeb && {
        position: 'unset' as any,
      })}
    >
    <Text>Conversations</Text>
     
    </YStack>
  )
}
