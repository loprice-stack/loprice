import { H5, Separator, SizableText, Tabs, useWindowDimensions } from "tamagui"
import { TabsContent } from "./TabContents"

export default function ResidentialAvailabilitySearchTab() {
  const { width } = useWindowDimensions()

  return (
    <Tabs
      defaultValue="tab1"
      flexDirection="row"
      orientation="vertical"
      width={width < 600 ? width : 600}
      rounded="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >
      <Tabs.List  aria-label="Residential availability status">
        <Tabs.Tab activeStyle={{ background: '$color3' }} value="tab1">
          <SizableText>Offer</SizableText>
        </Tabs.Tab>
        <Tabs.Tab activeStyle={{ background: '$color3' }} value="tab2">
          <SizableText>On market</SizableText>
        </Tabs.Tab>
        <Tabs.Tab activeStyle={{ background: '$color3' }} value="tab3">
          <SizableText>Rented</SizableText>
        </Tabs.Tab>
        <Tabs.Tab activeStyle={{ background: '$color3' }} value="tab4">
          <SizableText>On payments</SizableText>
        </Tabs.Tab>
        <Tabs.Tab activeStyle={{ background: '$color3' }} value="tab5">
          <SizableText>On service</SizableText>
        </Tabs.Tab>
      </Tabs.List>






      <Separator vertical />
      <TabsContent value="tab1">
        <H5 text="center">Profile</H5>
      </TabsContent>
      <TabsContent value="tab2">
        <H5 text="center">Connections</H5>
      </TabsContent>
      <TabsContent value="tab3">
        <H5 text="center">Notifications</H5>
      </TabsContent>
    </Tabs>
  )
}


