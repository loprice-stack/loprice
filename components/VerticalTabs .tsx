
import React from 'react'
import type { TabsContentProps } from 'tamagui'
import {
  H5,
  Separator,
  SizableText,
  Tabs,
  useWindowDimensions,
} from 'tamagui'
import { TabsContent } from './TabContents'



export const VerticalTabs = () => {
   const { width, height } = useWindowDimensions()
  return (
    <Tabs
      defaultValue="tab1"
      flexDirection="row"
      orientation="vertical"
      width={width < 600 ? width : width}
      height={height}
      rounded="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >
      <Tabs.List
       alignContent='flex-start'
       alignItems='flex-start'
      width={width < 600 ? 100 : 300}
       aria-label="Manage your account">
        <Tabs.Tab width={200} activeStyle={{ background: '$color3'  }} value="tab1">

          <SizableText>Listings</SizableText>
        </Tabs.Tab>
        <Tabs.Tab width={200} activeStyle={{ background: '$color3' }} value="tab2">
          <SizableText>Streams</SizableText>
        </Tabs.Tab>
        <Tabs.Tab width={200} activeStyle={{ background: '$color3' }} value="tab3">
          <SizableText>Settings</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator vertical />
      <TabsContent value="tab1">
        <H5 text="center">Listings</H5>
      </TabsContent>
      <TabsContent value="tab2">
        <H5 text="center">Streams</H5>
      </TabsContent>
      <TabsContent value="tab3">
        <H5 text="center">Settings</H5>
      </TabsContent>
    </Tabs>
  )
}

