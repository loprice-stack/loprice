import { ChevronDown, X } from '@tamagui/lucide-icons-2'
import { setFullnameDialogOpen } from 'app/account/accountSlice';
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/redux/store';
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



export function FullnameEditDialog() {

    const dispatch = useAppDispatch();
    const userinfo = useAppSelector(state => state.account.userinfo)

    return (
        <Dialog
            modal
            open={userinfo.fullname_d_open}
            onOpenChange={undefined}
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
                        <Dialog.Title>Edit full name</Dialog.Title>
                        <Dialog.Description>
                            Make changes to your names. Click save when you're done.
                        </Dialog.Description>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="fname">
                                First name
                            </Label>
                            <Input flex={1} id="fname"  />
                        </Fieldset>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="sname">
                                Second name
                            </Label>
                            <Input flex={1} id="sname"  />
                        </Fieldset>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="lname">
                                Last name
                            </Label>
                            <Input flex={1} id="lname"  />
                        </Fieldset>

                        <XStack self="flex-end" gap="$4">

                            <Button theme="accent" aria-label="Close">
                                Save changes
                            </Button>

                        </XStack>

                        <Unspaced>

                            <Button onPress={() => dispatch(setFullnameDialogOpen(false))} position="absolute" r="$3" size="$2" circular icon={X} />

                        </Unspaced>
                    </Dialog.Content>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    )
}