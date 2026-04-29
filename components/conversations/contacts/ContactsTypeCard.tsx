import { ChevronRight, Group, MessageSquare, Plus, RefreshCcw, X } from "@tamagui/lucide-icons-2";
import { getContacts, parseContactGroupItems, parseContactGroups } from "client/xmpp/xmlutilty";
import { changeContactTypeOpenSwitch, setContactGroupIsLoading, setCreateContactGroupDialogOpen, updateConctactGroupList, updateConctactList } from "components/conversations/contacts/contactsSlice";
import { useContext, useEffect } from "react";
import { _message, useAppDispatch, useAppSelector } from "store/redux/store";
import { YGroup, ListItem, useWindowDimensions, XStack, Text, ScrollView, Separator, YStack, Spinner } from "tamagui";
import { CreateContactGroupDialogy } from "./CreateContactGroupDialogy";
import { loadContacts } from "client/xmpp/xmppcontracts";

export default function ContactsTypeCard() {


    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();


    const { user_id, password } = useAppSelector(state => state.account.user)
    const { groups, contact_type_openswitch, contact_group_isloading } = useAppSelector(state => state.contacts.roaster)
    const messageContext = useContext(_message)


    useEffect(() => {
        loadContactsgGroups()
    }, [])


    function loadContactsgGroups() {
        dispatch(setContactGroupIsLoading(true))
        getContacts(messageContext.xmpp, user_id)
            .then((iq) => {

                parseContactGroups(iq).then((groupss) => {

                    const uniqGroupss = groupss.filter((grp, index, self) =>
                        //@ts-ignore
                        index === self.findIndex((u) => u.name === grp.name)
                    );


                    dispatch(setContactGroupIsLoading(false))
                    dispatch(updateConctactGroupList(uniqGroupss))
                    console.log(groupss)
                    console.log("----------------------items---my--contacts---groups---------------------")
                }).catch((error) => {
                    dispatch(setContactGroupIsLoading(false))
                    dispatch(updateConctactGroupList([]))
                    console.log(error)
                    console.log("--------items---my--contacts---error---parsing---group---------")
                })
            }).catch((error) => {
                dispatch(setContactGroupIsLoading(false))
                dispatch(updateConctactGroupList([]))
                console.log(error)
                console.log("-----------items---my--contacts--error--fetching--contacts-----------")
            })
    }





    return (
        <ScrollView style={{ marginTop: width < 600 ? 10 : 40, width: width < 600 ? width - 40 : 390, height: width < 600 ? 80 : height - 40 }}>
            <CreateContactGroupDialogy />
            <YGroup
                borderWidth={1}
                borderColor="$borderColor"
                rounded="$4"
                overflow="hidden"
                width={width < 600 ? width - 40 : 390}
                size="$4"
            >
                <YGroup.Item>
                    <ListItem
                        gap="$3" icon={Group}>
                        <XStack gap={'$4'} style={{ alignContent: 'center', alignItems: 'center', width: width, height: 50 }}>
                            <Text >Contact group</Text>
                            <Plus
                                onPress={() => {
                                    dispatch(setCreateContactGroupDialogOpen(true))
                                    dispatch(updateConctactGroupList([]))
                                    loadContactsgGroups()
                                }}
                                cursor="pointer"
                                style={{ alignSelf: 'flex-end' }} />
                            <XStack
                            >
                                <Spinner style={{ display: contact_group_isloading ? 'flex' : 'none' }} size="small" color="$green11" />
                                <RefreshCcw
                                    display={contact_group_isloading ? 'none' : 'flex'}
                                    onPress={() => loadContactsgGroups()}
                                    cursor="pointer" color={'$accent6'} />
                            </XStack>
                        </XStack>
                    </ListItem>
                </YGroup.Item>
                <YGroup.Item>
                    <ListItem
                        cursor="pointer"
                        onPress={
                            () => {
                                dispatch(changeContactTypeOpenSwitch("My contacts"))
                                dispatch(updateConctactList([]))
                                dispatch(updateConctactGroupList([]))
                                loadContactsgGroups()
                             loadContacts(contact_type_openswitch, messageContext, user_id, password)


                            }}
                        gap="$3" icon={MessageSquare}
                        iconAfter={ChevronRight}>
                        My contacts
                    </ListItem>
                </YGroup.Item>
                <YGroup.Item>
                    <ListItem cursor="pointer"
                        onPress={() => {
                            dispatch(changeContactTypeOpenSwitch(" Loprice "))
                            dispatch(updateConctactList([]))
                            dispatch(updateConctactGroupList([]))
                            loadContactsgGroups()
                        }} gap="$3" icon={MessageSquare} iconAfter={ChevronRight}>
                        Loprice
                    </ListItem>
                </YGroup.Item>

                <ScrollView style={{ width: width < 600 ? width - 40 : 390 }}>
                    {groups.map((group: any, index) => {

                        return (<YGroup.Item>
                            <ListItem
                                cursor="pointer"
                                key={index.toString()}
                                onPress={
                                    () => {
                                        dispatch(changeContactTypeOpenSwitch(group.name))
                                        dispatch(updateConctactList([]))
                                        loadContacts(contact_type_openswitch, messageContext, user_id, password)
                                        //dispatch(updateConctactGroupList([]))
                                        //loadContactsgGroups()
                                        console.log("Clicked " + group.name)
                                    }}
                                gap="$3"
                                icon={Group}
                                iconAfter={ChevronRight}>
                                {group.name}
                            </ListItem>
                            <Separator gap={'$10'} />
                        </YGroup.Item>)

                    })}
                </ScrollView>
            </YGroup>
        </ScrollView>

    )
}
