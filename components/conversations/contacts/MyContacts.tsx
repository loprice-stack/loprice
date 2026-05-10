import { Phone, MessageSquare, Plus, Mail, MoreVertical, Delete, Info, RefreshCcw } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { YGroup, ListItem, Separator, Avatar, useWindowDimensions, XStack, ScrollView, Text, Spinner, YStack, Menu, AlertDialog, Button } from "tamagui";
import { CreateContactDialogy } from "./CreateContactDialogy";
import { _message, useAppDispatch, useAppSelector } from "store/redux/store";
import { ContactsObject, setCreateContactDialogOpen } from "./contactsSlice";
import { useContext, useEffect, useState } from "react";
import { deleteContacts } from "client/xmpp/xmlutilty";
import { getJidLocal } from "utils/utility";
import { setCaller, setCallState } from "../calls/callsSlice";
import { CALL_STATE_START_CALL } from "utils/constants";
import { loadContacts } from "client/xmpp/xmppcontracts";
import { setMessages } from "../messages/messagesSlice";


export default function MyContacts() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { contacts, contact_type_openswitch, contact_isloading } = useAppSelector(state => state.contacts.roaster)
    const messageContext = useContext(_message)
    const { user_id, password, user_token } = useAppSelector(state => state.account.user)
    const { caller } = useAppSelector(state => state.calls)
    const [open, setIsOpen] = useState(false)
    const [useriddd, setUserIddd] = useState("")

    useEffect(() => {
        loadContacts(messageContext, user_id, user_token, password, contact_type_openswitch)
    }, [])



    const MoreButtonsMenu = (user_idd) => {

        return (
            <Menu
                native
                offset={8}>
                <Menu.Trigger asChild>
                    <View >
                        <MoreVertical
                            cursor="pointer"
                            size={'$1'}
                            onPress={() => console.log("Menu pressed")}
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
                                onPress={() => {
                                    //@ts-ignore
                                    router.navigate('/conversations/contact/(public)' + '?' + 'user_id=' + user_idd)
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
                                    setIsOpen(true)
                                    setUserIddd(user_idd)
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
                <AlertDialog open={open} onOpenChange={() => setIsOpen(false)}>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay
                            key="overlay"
                            //@ts-ignore
                            transition="quick"
                            opacity={0.5}
                            backgroundColor="$background"
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                        <AlertDialog.Content
                            elevate
                            key="content"
                            transition={[
                                //@ts-ignore
                                'quick',
                                {
                                    opacity: {
                                        overshootClamping: true,
                                    },
                                },
                            ]}
                            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                            x={0}
                            scale={1}
                            opacity={1}
                            y={0}
                            width={width < 600 ? width - 20 : 400}

                        >
                            <YStack gap="$4">
                                <AlertDialog.Title>Delete contact!</AlertDialog.Title>
                                <AlertDialog.Description >
                                    Are you sure you want to delete {useriddd} contact. This will also unsubscribe to the contact.
                                </AlertDialog.Description>
                                <XStack gap="$3" justify="flex-end">

                                    <Button onPress={() => setIsOpen(false)} >Cancel</Button>

                                    <Button onPress={() => {
                                        deleteContacts(messageContext.xmpp, user_id, useriddd)
                                        loadContacts(messageContext, user_id, user_token, password, contact_type_openswitch)
                                        setIsOpen(false)
                                    }} theme='red_accent'>Delete</Button>
                                </XStack>
                            </YStack>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog>
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
                            onPress={() => loadContacts(messageContext, user_id, user_token, password, contact_type_openswitch)}
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
                                                    if (contact.jid !== caller) {
                                                        dispatch(setMessages([]))
                                                        console.log(contact.jid)
                                                        console.log(caller)
                                                        console.log("-------contact.jid-----caller------------------------")
                                                    }
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


