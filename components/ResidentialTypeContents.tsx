
import React from 'react'
import { Check, ChevronDown, ChevronUp, Search } from '@tamagui/lucide-icons-2'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Label, ListItem, Select, Sheet, Theme, XStack, YGroup, YStack, getFontSize, useWindowDimensions } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import Contents800_2_flexdirection_no_bckgnd from './Contents800_2_flexdirection_no_bckgnd'
import { GLOBAL_COUNTRIES, RESIDENTIAL_ROOMS, RESIDENTIAL_TYPE, TANZANIA_REGIONS } from 'client/constants'
import { residentials } from 'client/AxiosHttpClient'


export function ResidentialTypeContents() {

    const [residentialst, setResidentialsT] = React.useState(RESIDENTIAL_TYPE);
    const [residentialt, setResidentialT] = React.useState("Type");

    const [rooms, setRooms] = React.useState(RESIDENTIAL_ROOMS);
    const [roomn, setRoomn] = React.useState("Rooms");
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
                    title="Residential"
                    subTitle={<ListItem.Subtitle>Choose residential type and rooms</ListItem.Subtitle>}
                />
            </YGroup.Item>
            <YGroup.Item>
                <ListItem gap="$3">
                    <XStack width={width < 600 ? width : 600} items="center" gap="$2">
                        <Contents800_2_flexdirection_no_bckgnd>
                            <Select
                                value={residentialt}
                                onValueChange={(text) => { setResidentialT(text); text == 'room' ? setRooms([{value: '1', label: '1' }]) : setRooms(RESIDENTIAL_ROOMS)  }}
                            // renderValue enables SSR support by providing the label synchronously
                            >
                                <Select.Trigger
                                    maxWidth={190}
                                    iconAfter={ChevronDown}
                                    borderRadius="$4"
                                    backgroundColor="$background"
                                >
                                    <Select.Value placeholder="Type" />
                                </Select.Trigger>

                                <Adapt
                                    //@ts-ignore
                                    when="maxMd"
                                    platform="touch">

                                    <Sheet
                                        native={true}
                                        modal
                                        dismissOnSnapToBottom
                                        //@ts-ignore
                                        transition="medium">
                                        <Sheet.Frame>
                                            <Sheet.ScrollView>
                                                <Adapt.Contents />
                                            </Sheet.ScrollView>
                                        </Sheet.Frame>
                                        <Sheet.Overlay
                                            bg="$shadowColor"
                                            //@ts-ignore
                                            transition="lazy"
                                            enterStyle={{ opacity: 0 }}
                                            exitStyle={{ opacity: 0 }}
                                        />
                                    </Sheet>
                                </Adapt>

                                <Select.Content>
                                    <Select.ScrollUpButton
                                        items="center"
                                        justify="center"
                                        position="relative"
                                        width="100%"
                                        height="$3"
                                    >
                                        <YStack z={10}>
                                            <ChevronUp size={20} />
                                        </YStack>
                                        <LinearGradient
                                            start={[0, 0]}
                                            end={[0, 1]}
                                            fullscreen
                                            colors={['$background', 'transparent']}
                                            rounded="$4"
                                        />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport
                                        minW={200}
                                        bg="$background"
                                        rounded="$4"
                                        borderWidth={1}
                                        borderColor="$borderColor"
                                    >
                                        <Select.Group>
                                            <Select.Label fontWeight="700">Type</Select.Label>
                                            {/* for longer lists memorizing these is useful */}
                                            {React.useMemo(
                                                () =>
                                                    residentialst.map((item, i) => {
                                                        return (
                                                            <Select.Item
                                                                index={i}
                                                                key={item.value}
                                                                value={item.value}
                                                            >
                                                                <Select.ItemText>{item.value}</Select.ItemText>
                                                                <Select.ItemIndicator marginLeft="auto">
                                                                    <Check size={16} />
                                                                </Select.ItemIndicator>
                                                            </Select.Item>
                                                        )
                                                    }),
                                                [residentialst]
                                            )}
                                        </Select.Group>
                                        {/* Native gets an extra icon */}
                                        <YStack
                                            position="absolute"
                                            r={0}
                                            t={16}
                                            items="center"
                                            justify="center"
                                            width={'$4'}
                                            pointerEvents="none"
                                        >
                                            <ChevronDown
                                                size={'$11'}
                                            />
                                        </YStack>
                                    </Select.Viewport>
                                    <Select.ScrollDownButton
                                        items="center"
                                        justify="center"
                                        position="relative"
                                        width="100%"
                                        height="$3"
                                    >
                                        <YStack z={10}>
                                            <ChevronDown size={20} />
                                        </YStack>
                                        <LinearGradient
                                            start={[0, 0]}
                                            end={[0, 1]}
                                            fullscreen
                                            colors={['transparent', '$background']}
                                            rounded="$4"
                                        />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select>

                            <Select
                                value={roomn}
                                onValueChange={(text) => { setRoomn(text) }}
                            // renderValue enables SSR support by providing the label synchronously
                            >
                                <Select.Trigger
                                    maxWidth={190}
                                    iconAfter={ChevronDown}
                                    borderRadius="$4"
                                    backgroundColor="$background"
                                >
                                    <Select.Value placeholder="Rooms" />
                                </Select.Trigger>

                                <Adapt
                                    //@ts-ignore
                                    when="maxMd"
                                    platform="touch">

                                    <Sheet
                                        native={true}
                                        modal
                                        dismissOnSnapToBottom
                                        //@ts-ignore
                                        transition="medium">
                                        <Sheet.Frame>
                                            <Sheet.ScrollView>
                                                <Adapt.Contents />
                                            </Sheet.ScrollView>
                                        </Sheet.Frame>
                                        <Sheet.Overlay
                                            bg="$shadowColor"
                                            //@ts-ignore
                                            transition="lazy"
                                            enterStyle={{ opacity: 0 }}
                                            exitStyle={{ opacity: 0 }}
                                        />
                                    </Sheet>
                                </Adapt>

                                <Select.Content>
                                    <Select.ScrollUpButton
                                        items="center"
                                        justify="center"
                                        position="relative"
                                        width="100%"
                                        height="$3"
                                    >
                                        <YStack z={10}>
                                            <ChevronUp size={20} />
                                        </YStack>
                                        <LinearGradient
                                            start={[0, 0]}
                                            end={[0, 1]}
                                            fullscreen
                                            colors={['$background', 'transparent']}
                                            rounded="$4"
                                        />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport
                                        minW={200}
                                        bg="$background"
                                        rounded="$4"
                                        borderWidth={1}
                                        borderColor="$borderColor"
                                    >
                                        <Select.Group>
                                            <Select.Label fontWeight="700">Rooms</Select.Label>
                                            {/* for longer lists memorizing these is useful */}
                                            {React.useMemo(
                                                () =>
                                                    rooms.map((item, i) => {
                                                        return (
                                                            <Select.Item
                                                                index={i}
                                                                key={item.value}
                                                                value={item.value}
                                                            >
                                                                <Select.ItemText>{item.value}</Select.ItemText>
                                                                <Select.ItemIndicator marginLeft="auto">
                                                                    <Check size={16} />
                                                                </Select.ItemIndicator>
                                                            </Select.Item>
                                                        )
                                                    }),
                                                [rooms]
                                            )}
                                        </Select.Group>
                                        {/* Native gets an extra icon */}
                                        <YStack
                                            position="absolute"
                                            r={0}
                                            t={16}
                                            items="center"
                                            justify="center"
                                            width={'$4'}
                                            pointerEvents="none"
                                        >
                                            <ChevronDown
                                                size={'$11'}
                                            />
                                        </YStack>
                                    </Select.Viewport>
                                    <Select.ScrollDownButton
                                        items="center"
                                        justify="center"
                                        position="relative"
                                        width="100%"
                                        height="$3"
                                    >
                                        <YStack z={10}>
                                            <ChevronDown size={20} />
                                        </YStack>
                                        <LinearGradient
                                            start={[0, 0]}
                                            end={[0, 1]}
                                            fullscreen
                                            colors={['transparent', '$background']}
                                            rounded="$4"
                                        />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select>
                        </Contents800_2_flexdirection_no_bckgnd>

                    </XStack>

                </ListItem>
            </YGroup.Item>

        </YGroup>

    )
}
