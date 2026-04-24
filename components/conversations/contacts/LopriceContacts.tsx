import {  Phone, MessageSquare,Info, MoreVertical } from "@tamagui/lucide-icons-2";
import {  View } from "react-native";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import { YGroup, ListItem, Separator, Avatar, useWindowDimensions, XStack, ScrollView, Text, Menu } from "tamagui";
import { setCaller, setCallState } from "../calls/callsSlice";
import { CALL_STATE_START_CALL } from "utils/constants";
import { useRouter } from "expo-router";

export default function LopriceContacts() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { contacts, more_buttons_contact_menu_open } = useAppSelector(state => state.contacts.roaster)


    const MoreButtonsMenu = (user_idd) => {

        return (
            <Menu
                offset={8}>
                <Menu.Trigger asChild>
                    <View >
                        <MoreVertical
                            cursor="pointer"
                            size={'$1'}
                        /></View>
                </Menu.Trigger>
                <Menu.Portal zIndex={100}>
                    <Menu.Content
                        //@ts-ignore
                        transition="100ms"
                        borderRadius="$4"
                        enterStyle={{ scale: 0.9, opacity: 0, y: -5 }}
                        exitStyle={{ scale: 0.95, opacity: 0, y: -3 }}
                        boxShadow="0 4px 5px $shadowColor"
                    >
                        <Menu.Arrow size="$4" borderWidth={1} borderColor="$borderColor" />
                        <Menu.ScrollView
                            //@ts-ignore
                            padding={5}>
                            <Menu.Item
                                cursor="pointer"
                                onPress={() => {            //@ts-ignore
                                    router.navigate('/conversations/contact/mail')
                                }}
                                key="info">
                                <Menu.ItemTitle cursor="pointer">Mail</Menu.ItemTitle>
                                <Menu.ItemIcon
                                    androidIconName={"ic_menu_mail"}
                                    ios={{
                                        name: 'calendar',
                                        hierarchicalColor: '#000',
                                        // pointSize: 20,
                                    }}
                                >
                                    <Info color="gray" size={14} />
                                </Menu.ItemIcon>
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item
                                cursor="pointer"
                                onPress={() => {            //@ts-ignore
                                    router.navigate('/conversations/contact/' + user_idd)
                                }}
                                key="info">
                                <Menu.ItemTitle cursor="pointer">Info</Menu.ItemTitle>
                                <Menu.ItemIcon
                                    androidIconName={"ic_menu_info"}
                                    ios={{
                                        name: 'calendar',
                                        hierarchicalColor: '#000',
                                        // pointSize: 20,
                                    }}
                                >
                                    <Info color="gray" size={14} />
                                </Menu.ItemIcon>
                            </Menu.Item>
                        </Menu.ScrollView>
                    </Menu.Content>
                </Menu.Portal>
            </Menu>
        )
    }



    return (
        <View style={{ flex: 1, marginTop: width < 600 ? undefined : 40 }}>
            <ScrollView style={{ width: width < 600 ? width - 40 : 390, height: height }}>
                <XStack gap={'$4'} style={{ alignContent: 'center', alignItems: 'center', width: width, height: 50 }}>
                    <Text>Loprice</Text>
                </XStack>
                <YGroup
                    self="center"
                    borderWidth={1}
                    borderColor="$borderColor"
                    rounded="$4"
                    overflow="hidden"
                    width={width < 600 ? width - 40 : 390}
                    size="$5"
                >
                    <YGroup.Item>
                        <ListItem

                            title="Loprice Limited"
                            subTitle="loprice@loprice.co.tz"
                            icon={<Avatar
                                cursor="pointer"
                                onPress={() => console.log("mail clicked")}
                                circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src={require('assets/images/favicon.png')}
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={
                                <XStack gap="$4">

                                    <Phone
                                        cursor="pointer"
                                        onPress={
                                            () => {
                                                //@ts-ignore
                                                router.navigate('/conversations/calls')
                                                dispatch(setCallState(CALL_STATE_START_CALL))
                                                dispatch(setCaller("loprice@loprice.co.tz"))
                                            }}
                                        size={'$1'} />
                                    <MessageSquare
                                        cursor="pointer"
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'} />

                                    {MoreButtonsMenu("loprice@loprice.co.tz")}
                                </XStack>}

                        />
                    </YGroup.Item>

                    <Separator />
                    <YGroup.Item>
                        <ListItem

                            title="Accounts"
                            subTitle="accounts@loprice.co.tz"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={
                                <XStack gap="$4">

                                    <Phone cursor="pointer"
                                        onPress={

                                            () => {
                                                //@ts-ignore
                                                router.navigate('/conversations/calls')
                                                dispatch(setCallState(CALL_STATE_START_CALL))
                                                dispatch(setCaller("accounts@loprice.co.tz"))
                                            }}
                                        size={'$1'}
                                    />

                                    <MessageSquare cursor="pointer"
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'}
                                    />

                                    {MoreButtonsMenu("accounts@loprice.co.tz")}
                                </XStack>}

                        />
                    </YGroup.Item>

                    <Separator />
                    <YGroup.Item>
                        <ListItem

                            title="Customer care"
                            subTitle="customercare@loprice.co.tz"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={
                                <XStack gap="$4">

                                    <Phone cursor="pointer"
                                        onPress={

                                            () => {
                                                //@ts-ignore
                                                router.navigate('/conversations/calls')
                                                dispatch(setCallState(CALL_STATE_START_CALL))
                                                dispatch(setCaller("customercare@loprice.co.tz"))
                                            }}
                                        size={'$1'}
                                    />

                                    <MessageSquare cursor="pointer"
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'}
                                    />
                                    {MoreButtonsMenu("customercare@loprice.co.tz")}
                                </XStack>}
                        />
                    </YGroup.Item>
                </YGroup>
            </ScrollView>
        </View>
    )
}