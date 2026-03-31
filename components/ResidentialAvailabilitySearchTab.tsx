import { H5, ListItem, Separator, SizableText, Tabs, useWindowDimensions, XStack, YGroup } from "tamagui"
import { TabsContent } from "./TabContents"
import { Search } from "@tamagui/lucide-icons-2"
import Contents800_2_flexdirection_no_bckgnd from "./Contents800_2_flexdirection_no_bckgnd"
import { VerticalTabs } from "./VerticalTabs "
import { HorizontalTabs } from "./HorizontalTabs"

export default function ResidentialAvailabilitySearchTab() {
  const { width } = useWindowDimensions()

  return (

    <YGroup
      self="center"
      borderColor="$borderColor"
      rounded="$4"
      overflow="hidden"
      width={width < 600 ? width : 800}
      size="$4"
    >
      <YGroup.Item>
        <ListItem
          gap="$3"
          icon={Search}
          title="Availability"
          subTitle={<ListItem.Subtitle>Choose residential availability and other amneties</ListItem.Subtitle>}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem gap="$3">
          <XStack width={width < 600 ? width : 600} items="center" gap="$2">
            <Contents800_2_flexdirection_no_bckgnd>
              {width < 600 ? <HorizontalTabs /> : <VerticalTabs />}
            </Contents800_2_flexdirection_no_bckgnd>

          </XStack>

        </ListItem>
      </YGroup.Item>

    </YGroup>



  )
}


