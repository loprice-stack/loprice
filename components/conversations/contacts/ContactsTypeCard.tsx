import { ChevronRight, Group, Mail, MessageSquare, Plus, X } from "@tamagui/lucide-icons-2";
import Account from "app/account";
import { getContacts, parseContactItems, createContacts, parseContactGroups } from "client/xmpp/xmlutilty";
import { changeContactType, pushConctactGroupList, setCreateContactDialogOpen, setCreateContactGroupDialogOpen, updateConctactGroupList, updateConctactList } from "components/conversations/contacts/contactsSlice";
import { useContext, useEffect, useState } from "react";
import { _message, useAppDispatch, useAppSelector } from "store/redux/store";
import { YGroup, ListItem, useWindowDimensions, XStack, Text, ScrollView, Separator, Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, Unspaced } from "tamagui";
import { jidAsStringOf } from "utils/utility";
import { CreateContactGroupDialogy } from "./CreateContactGroupDialogy";

export default function ContactsTypeCard() {


    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();

    
    const { user_id } = useAppSelector(state => state.account.user)
    const { groups, create_contact_group_d_open } = useAppSelector(state => state.contacts.roaster)
    const messageContext = useContext(_message)


    useEffect(() => {
        loadContactsgGroups()
    }, [])


    function loadContactsgGroups() {
        getContacts(messageContext.xmpp, user_id)
            .then((iq) => {

                parseContactGroups(iq).then((groupss) => {

                    const uniqGroupss = groupss.filter((grp, index, self) =>
                        //@ts-ignore
                        index === self.findIndex((u) => u.name === grp.name)
                    );



                    dispatch(updateConctactGroupList(uniqGroupss))
                    console.log(groupss)
                    console.log("----------------------items---my--contacts---groups---------------------")
                }).catch((error) => {
                    dispatch(updateConctactGroupList([]))
                    console.log(error)
                    console.log("--------items---my--contacts---error---parsing---group---------")
                })
            }).catch((error) => {
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
                                onPress={() => dispatch(setCreateContactGroupDialogOpen(true))}
                                cursor="pointer"
                                style={{ alignSelf: 'flex-end' }} />
                        </XStack>
                    </ListItem>
                </YGroup.Item>
                <YGroup.Item>
                    <ListItem cursor="pointer" onPress={() => dispatch(changeContactType("My contacts"))} gap="$3" icon={MessageSquare} iconAfter={ChevronRight}>
                        My contacts
                    </ListItem>
                </YGroup.Item>
                <YGroup.Item>
                    <ListItem cursor="pointer" onPress={() => dispatch(changeContactType(" Loprice "))} gap="$3" icon={MessageSquare} iconAfter={ChevronRight}>
                        Loprice
                    </ListItem>
                </YGroup.Item>

                <ScrollView style={{ width: width < 600 ? width - 40 : 390 }}>
                    {groups.map((group: any, index) => {

                        return (<YGroup.Item>
                            <ListItem
                                cursor="pointer"
                                id={index.toString()}
                                onPress={
                                    () => {dispatch(changeContactType(group.name))
                                    dispatch(updateConctactList([]))}}
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
