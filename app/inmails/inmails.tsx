import { HorizontalTabs } from 'components/HorizontalTabs'
import { VerticalTabs } from 'components/VerticalTabs '
import React from 'react'
import {
  Button,
  H5,
  PortalProvider,
  Separator,
  SizableText,
  Tabs,
  XStack,
  YStack,
  isWeb,
  useTheme,
  useWindowDimensions,
} from 'tamagui'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}


export default function Inmails() {

  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]
  return (
         <PortalProvider>
    <YStack
      px="$1"
      items='center'
      {...(isWeb && {
        position: 'unset' as any,
      })}
    >
      {demo === 'horizontal' ? <HorizontalTabs /> : <VerticalTabs />}

      <XStack
        items="center"
        gap="$4"
        position="absolute"
        b="$3"
        l="$4"
        $max-xs={{ display: 'none' }}
      >
        <Button size="$2" onPress={() => setDemoIndex((x) => (x + 1) % demos.length)}>
          {demosTitle[demo]}
        </Button>
      </XStack>
     
    </YStack>
    </PortalProvider>
  )
}
