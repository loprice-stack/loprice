import { Star, ChevronRight, Moon, Phone, MessageSquare, Plus, Mail, MoreVertical, Delete, Info } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { YGroup, ListItem, Separator, Avatar, useWindowDimensions, XStack, ScrollView, Text, Menu } from "tamagui";
import { CreateContactDialogy } from "./CreateContactDialogy";
import { setFullnameDialogOpen } from "components/account/accountSlice";
import { _message, useAppDispatch, useAppSelector } from "store/redux/store";
import { ContactsObject, setCreateContactDialogOpen, setMoreButtonsContactMenuOpen, updateConctactList } from "./contactsSlice";
import { useContext, useEffect } from "react";
import { deleteContacts, getContacts, parseContactGroupItems, parseContactItems } from "client/xmpp/xmlutilty";
import { getJidLocal } from "utils/utility";
import { setCaller, setCallState } from "../calls/callsSlice";
import { CALL_STATE_START_CALL } from "utils/constants";


export default function GroupContacts() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { contacts, contact_type_openswitch } = useAppSelector(state => state.contacts.roaster)
    const messageContext = useContext(_message)
    const { user_id } = useAppSelector(state => state.account.user)


    useEffect(() => {
        loadContacts(contact_type_openswitch)
    }, [])


    function loadContacts(grp) {
        getContacts(messageContext.xmpp, user_id)
            .then((iq) => {
                parseContactGroupItems(iq,grp).then((items) => {
                    dispatch(updateConctactList(items))
                    console.log(items)
                    console.log("----------------------items---my--contacts------------------------------------")
                })
            }).catch((error) => {
                console.log(error)
            })
    }




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
                                    <Mail color="gray" size={14} />
                                </Menu.ItemIcon>
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item
                                cursor="pointer"
                                onPress={() => { console.log("Delete clicked " + user_idd) }}
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
        <View style={{ flex: 1, marginTop: width < 600 ? undefined : 40 }}>

            <ScrollView style={{ width: width < 600 ? width - 40 : 390, height: "100%" }}>
                <CreateContactDialogy />

                <XStack gap={'$4'} style={{ alignContent: 'center', alignItems: 'center', width: width, height: 50 }}>
                    <Text >{contact_type_openswitch}</Text>
                    <Plus cursor="pointer"
                        onPress={() => dispatch(setCreateContactDialogOpen(true))} style={{ alignSelf: 'flex-end' }} />
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
                    {contacts.map((contact: ContactsObject) => (<YGroup.Item>
                        <ListItem
                            gap="$3"
                            title={contact.name ? contact.name : getJidLocal(contact.jid).toUpperCase()}
                            subTitle={contact.jid}
                            icon={<Avatar
                                cursor="pointer"
                                onPress={() => {
                                    deleteContacts(messageContext.xmpp, user_id, contact.jid)
                                    loadContacts('grp')
                                    console.log("deleted succcesssfullly")
                                }}
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
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'} />

                                    {MoreButtonsMenu(contact.jid)}

                                </XStack>}
                        />
                        <Separator gap={'$10'} />
                    </YGroup.Item>))}
                </YGroup>
            </ScrollView>
        </View>
    )
}


