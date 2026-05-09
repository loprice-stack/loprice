import { X } from "@tamagui/lucide-icons-2"
import { Dialog, Adapt, Sheet, Fieldset, Label, Input, XStack, Unspaced, Button } from "tamagui"
import { pushConctactGroupList, setCreateContactGroupDialogOpen } from "./contactsSlice"
import { useAppDispatch, useAppSelector } from "store/redux/store"
import { useState } from "react"

export const CreateContactGroupDialogy = () => {

    const { groups, create_contact_group_d_open } = useAppSelector(state => state.contacts.roaster)
    const [name, setName] = useState('')
    const dispatch = useAppDispatch();
    
    return (
        <Dialog
            modal
            open={create_contact_group_d_open ? true : false}

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
                        <Dialog.Title>Create contact group</Dialog.Title>
                        <Dialog.Description>
                            Create a roaster group  (eg. Friends, Customers, Family etc)
                        </Dialog.Description>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="fname">
                                Group name
                            </Label>
                            <Input onChangeText={(text) => setName(text)} flex={1} id="fname" />
                        </Fieldset>
                        <XStack self="flex-end" gap="$4">
                            <Button
                                onPress={() => {
                                    const grp = { name: name }

                                    dispatch(pushConctactGroupList(grp))
                                    dispatch(setCreateContactGroupDialogOpen(false))
                                }}
                                theme="accent" aria-label="Close">
                                Create
                            </Button>
                        </XStack>
                        <Unspaced>
                            <Button onPress={() => dispatch(setCreateContactGroupDialogOpen(false))} position="absolute" r="$3" size="$2" circular icon={X} />
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    )
}

