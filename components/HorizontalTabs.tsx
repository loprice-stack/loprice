
import React from 'react'
import type { TabsContentProps } from 'tamagui'
import {
  Button,
  H5,
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  XStack,
  YStack,
  isWeb,
  useWindowDimensions,
} from 'tamagui'
import { TabsContent } from './TabContents'



export const HorizontalTabs = () => {
  const { width, height } = useWindowDimensions()
  return (
    <Tabs
      defaultValue="tab1"
      orientation='horizontal'
      flexDirection='column'
      width={width < 600 ? width : 800}
      height={height}
      rounded="$4"
      borderWidth="$0.25"
      borderColor="$borderColor"

    >

      <Tabs.List
       width={width < 600 ? width : 800}
        aria-label="Manage your account">
        <ScrollView horizontal>
          <Tabs.Tab
            activeStyle={{
              background: '$color4',
            }}
            flex={1}
            value="tab1"
          >
            <SizableText fontFamily="$body" text="center" ellipsis>
              Rooms
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            activeStyle={{
              background: '$color4',
            }}
            flex={1}
            value="tab2"
          >
            <SizableText fontFamily="$body" text="center" ellipsis>
              Houses
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            activeStyle={{
              background: '$color4',
            }}
            flex={1}
            value="tab3"
          >
            <SizableText fontFamily="$body" text="center" ellipsis>
              Apartments
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            activeStyle={{
              background: '$color4',
            }}
            flex={1}
            value="tab4"
          >
            <SizableText fontFamily="$body" text="center" ellipsis>
              Jt boxes
            </SizableText>
          </Tabs.Tab>
    
        </ScrollView>
      </Tabs.List>

    
      <TabsContent value="tab1">
        <H5>Rooms</H5>
      </TabsContent>

      <TabsContent value="tab2">
        <H5>Houses</H5>
      </TabsContent>

      <TabsContent value="tab3">
        <H5>Apartments</H5>
      </TabsContent>
            <TabsContent value="tab4">
        <H5>Jt boxes</H5>
      </TabsContent>
    </Tabs>
  )
}