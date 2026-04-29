import { Phone, MessageSquare, Plus, Mail, MoreVertical, Delete, Info, RefreshCcw } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { YGroup, ListItem, Separator, Avatar, useWindowDimensions, XStack, ScrollView, Text, Menu, Spinner, YStack } from "tamagui";
import { CreateContactDialogy } from "./CreateContactDialogy";
import { _message, useAppDispatch, useAppSelector } from "store/redux/store";
import { ContactsObject, setContactIsLoading, setCreateContactDialogOpen, updateConctactList } from "./contactsSlice";
import { useContext, useEffect, useState } from "react";
import { deleteContacts, getContacts, parseContactGroupItems } from "client/xmpp/xmlutilty";
import { getJidLocal } from "utils/utility";
import { setCaller, setCallState } from "../calls/callsSlice";
import { CALL_STATE_START_CALL } from "utils/constants";
import { loadContacts } from "client/xmpp/xmppcontracts";


export default function GroupContacts() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { contacts, contact_type_openswitch, contact_isloading } = useAppSelector(state => state.contacts.roaster)
    const messageContext = useContext(_message)
    const { user_id, password} = useAppSelector(state => state.account.user)
    //const [isloading, setIsloading] = useState(false)

    useEffect(() => {
         loadContacts(contact_type_openswitch, messageContext, user_id, password)
    }, [])




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
                            <Menu.Separator />
                            <Menu.Item
                                cursor="pointer"
                                onPress={() => {            //@ts-ignore
                                    router.navigate('/conversations/contact/' + user_idd)
                                }}
                                key="mail">
                                <Menu.ItemTitle cursor="pointer">Mail</Menu.ItemTitle>
                                <Menu.ItemIcon
                                    androidIconName={"ic_menu_mail"}
                                    ios={{
                                        name: 'calendar',
                                        hierarchicalColor: '#000',
                                        // pointSize: 20,
                                    }}
                                >
                                    <Mail color="gray" size={14} />
                                </Menu.ItemIcon>
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item
                                cursor="pointer"
                                onPress={() => {
                                    deleteContacts(messageContext.xmpp, user_id, user_idd)
                                    loadContacts(contact_type_openswitch, messageContext, user_id, password)
                                    console.log("deleted succcesssfullly")
                                }}
                                key="delete">
                                <Menu.ItemTitle cursor="pointer" color="red">Delete</Menu.ItemTitle>
                                <Menu.ItemIcon
                                    androidIconName={"ic_menu_delete"}
                                    ios={{
                                        name: 'calendar',
                                        hierarchicalColor: '#000',
                                        // pointSize: 20,
                                    }}
                                >
                                    <Delete color="#e01111" size={14} />
                                </Menu.ItemIcon>
                            </Menu.Item>
                        </Menu.ScrollView>
                    </Menu.Content>
                </Menu.Portal>
            </Menu>
        )
    }



    return (
        <View style={{ flex: 1, marginTop: width < 600 ? undefined : 40, height: height }}>
            <ScrollView style={{ width: width < 600 ? width - 40 : 390, height: height }}>
                <CreateContactDialogy />
                <XStack gap={'$4'} style={{ alignContent: 'center', alignItems: 'center', width: width, height: 50 }}>
                    <Text >{contact_type_openswitch}</Text>
                    <Plus cursor="pointer"
                        onPress={() => dispatch(setCreateContactDialogOpen(true))} />
                </XStack>
                <Separator gap={'$10'} />
                <YStack
                    style={{ display: contact_isloading ? 'flex' : 'none', height: height - 60 }}
                    p="$3" gap="$4" items="center">
                    <Spinner size="large" color="$green11" />
                </YStack>
                <YStack
                    style={{ display: contact_isloading ? 'none' : contacts.length !== 0 ? 'none' : 'flex', height: height - 60 }}
                    p="$3" gap="$4" items="center">
                    <XStack
                        p="$3" gap="$4" items="center">
                        <Text >List is empty</Text>
                        <RefreshCcw
                            onPress={() =>  loadContacts(contact_type_openswitch, messageContext, user_id, password)}
                            cursor="pointer" color={'$accent6'} />
                    </XStack>
                </YStack>
                <YGroup
                    style={{ display: contact_isloading ? 'none' : 'flex' }}
                    self="center"
                    borderWidth={1}
                    borderColor="$borderColor"
                    rounded="$4"
                    overflow="hidden"
                    width={width < 600 ? width - 40 : 390}
                    size="$5"
                >
                    {contacts.map((contact: ContactsObject, index) => {
                        return (<YGroup.Item>
                            <ListItem
                                gap="$3"
                                title={contact.name ? contact.name : getJidLocal(contact.jid).toUpperCase()}
                                subTitle={contact.jid}
                                key={index.toString()}
                                icon={<Avatar
                                    cursor="pointer"
                                    circular size="$6">
                                    <Avatar.Image
                                        aria-label="Nate Wienert"
                                        src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
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
                                                    dispatch(setCaller(contact.jid))
                                                }}
                                            size={'$1'} />
                                        <MessageSquare
                                            cursor="pointer"
                                            onPress={
                                                () => {
                                                    //@ts-ignore
                                                    router.navigate('/conversations/messages')
                                                    dispatch(setCallState(CALL_STATE_START_CALL))
                                                    dispatch(setCaller(contact.jid))
                                                }}
                                            size={'$1'} />

                                        {MoreButtonsMenu(contact.jid)}

                                    </XStack>}
                            />
                            <Separator gap={'$10'} />
                        </YGroup.Item>)
                    })}
                </YGroup>
            </ScrollView>
        </View>
    )
}
