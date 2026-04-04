import {
  SizableText,
  Tabs,
  useWindowDimensions,
} from 'tamagui'
import { TabsContent } from './TabContents'
import { CheckboxUnstyled } from './CheckboxUnstyled'


export const HorizontalTabs = () => {
  const { width, height } = useWindowDimensions()
  return (
    <Tabs
      defaultValue="tab1"
      orientation='horizontal'
      flexDirection='column'
      width={width < 600 ? width - 40 : 760}
      height={width / 1.5}
      rounded="$4"
      borderWidth="$0.25"
      borderColor="$borderColor"

    >
      <Tabs.List aria-label="Residential availability status">
        <Tabs.Tab items={'flex-start'} activeStyle={{ background: '$color3' }} value="tab1">
          <SizableText>Offer</SizableText>
        </Tabs.Tab>
        <Tabs.Tab items={'flex-start'} activeStyle={{ background: '$color3' }} value="tab2">
          <SizableText>On market</SizableText>
        </Tabs.Tab>
        <Tabs.Tab items={'flex-start'} activeStyle={{ background: '$color3' }} value="tab3">
          <SizableText>Rented</SizableText>
        </Tabs.Tab>
        <Tabs.Tab items={'flex-start'} activeStyle={{ background: '$color3' }} value="tab4">
          <SizableText>On payments</SizableText>
        </Tabs.Tab>
        <Tabs.Tab activeStyle={{ background: '$color3' }} value="tab5">
          <SizableText>On service</SizableText>
        </Tabs.Tab>
      </Tabs.List>


      <TabsContent value="tab1">
        <CheckboxUnstyled />
      </TabsContent>
      <TabsContent value="tab2">
        <CheckboxUnstyled />
      </TabsContent>
      <TabsContent value="tab3">
        <CheckboxUnstyled />
      </TabsContent>
      <TabsContent value="tab4">
        <CheckboxUnstyled />
      </TabsContent>
      <TabsContent value="tab5">
        <CheckboxUnstyled />
      </TabsContent>
    </Tabs>
  )
}