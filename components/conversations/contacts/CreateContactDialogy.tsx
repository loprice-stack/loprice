import { ChevronDown, X } from '@tamagui/lucide-icons-2'
import { createContacts, getContacts, parseContactGroupItems, parseContactItems } from 'client/xmpp/xmlutilty';
import { setFullnameDialogOpen, updateFirstname, updateLastname, updatesecondname } from 'components/account/accountSlice';
import { useContext, useState } from 'react'
import { _message, useAppDispatch, useAppSelector } from 'store/redux/store';
import {
    Adapt,
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    Paragraph,
    Select,
    Sheet,
    TooltipSimple,
    Unspaced,
    View,
    XGroup,
    XStack,
} from 'tamagui'
import { jidAsStringOf } from 'utils/utility';
import { setCreateContactDialogOpen, updateConctactList } from './contactsSlice';



export function CreateContactDialogy() {

    const dispatch = useAppDispatch();
    const userinfo = useAppSelector(state => state.account.userinfo)
    const messageContext = useContext(_message)
    const { create_contact_d_open, contact_type_openswitch } = useAppSelector(state => state.contacts.roaster)
    const { user_id } = useAppSelector(state => state.account.user)
    const [account, setAccount] = useState('')
    const [name, setName] = useState('')




    function loadContacts(grp) {

        getContacts(messageContext.xmpp, user_id)
            .then((iq) => {
                parseContactGroupItems(iq, grp).then((items) => {
                    dispatch(updateConctactList(items))
   
                    console.log(items)
                    console.log("----------------------items---loaded--from---goups---------------------------------")
                })
            }).catch((error) => {

                console.log(error)
            })
    }











    return (
        <Dialog
            modal
            open={create_contact_d_open ? true : false}
           
        >
            <Adapt
                //@ts-ignore
                when="maxMd" platform="touch">
                <Sheet
                    //@ts-ignore
                    transition="medium"
                    zIndex={200000}
                    modal
                    dismissOnSnapToBottom
                    unmountChildrenWhenHidden
                >
                    <Sheet.Frame p="$4" gap="$4">
                        <Adapt.Contents />
                    </Sheet.Frame>
                    <Sheet.Overlay
                        bg="$background"
                        opacity={0.5}
                        //@ts-ignore
                        transition="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>


            <Dialog.Portal>
                <Dialog.Overlay
                    bg="$background"
                    opacity={0.5}
                    animateOnly={['transform', 'opacity']}
                    transition={[
                        //@ts-ignore
                        'quicker',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Dialog.FocusScope focusOnIdle>
                    <Dialog.Content
                        transition={[
                            //@ts-ignore
                            'quicker',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: 20, opacity: 0 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        gap="$4"
                    >
                        <Dialog.Title>Create contact</Dialog.Title>
                        <Dialog.Description>
                            Create a roaster of people to communicate with
                        </Dialog.Description>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="fname">
                                Account
                            </Label>
                            <Input onChangeText={(text) => setAccount(text)} flex={1} id="fname" />
                        </Fieldset>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="sname">
                                Name
                            </Label>
                            <Input onChangeText={(text) => setName(text)} flex={1} id="sname" />
                        </Fieldset>



                        <XStack self="flex-end" gap="$4">

                            <Button
                                onPress={() => {
                                    let jidaccount = jidAsStringOf(account)
                            
                                    if (contact_type_openswitch.toLowerCase() !== "loprice"){
                                    createContacts(messageContext.xmpp, user_id, jidaccount, name, contact_type_openswitch)
                                    dispatch(setCreateContactDialogOpen(false))
                                    loadContacts(contact_type_openswitch)
                                    }

                                }}

                                theme="accent" aria-label="Close">
                                Create
                            </Button>

                        </XStack>

                        <Unspaced>

                            <Button onPress={() => dispatch(setCreateContactDialogOpen(false))} position="absolute" r="$3" size="$2" circular icon={X} />

                        </Unspaced>
                    </Dialog.Content>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    )
}