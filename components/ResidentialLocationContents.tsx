import React from 'react'
import { Check, Cloud, Moon, Search, ChevronDown, Sun, ChevronUp } from "@tamagui/lucide-icons-2";
import { ListItem, Text, useWindowDimensions, SelectProps, YGroup, Label, Select, Sheet, Theme, XStack, YStack, getFontSize, Adapt, ScrollView } from "tamagui";
import { SelectLocationContents } from './SelectLocationContents';



export default function ResidentialLocationContents() {


  const { width, height } = useWindowDimensions();


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
          title="Location"
          subTitle={<ListItem.Subtitle>Choose residential location</ListItem.Subtitle>}

        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem gap="$3">
          <XStack width={width < 600 ? width : 600} items="center" gap="$2">
             <SelectLocationContents/>

          </XStack>

        </ListItem>
      </YGroup.Item>

    </YGroup>
  )
}

