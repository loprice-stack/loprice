import {  X } from '@tamagui/lucide-icons-2'
import { setFullnameDialogOpen, setNationalityDialogOpen, updateFirstname, updateNationality} from 'app/account/accountSlice';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import {
    Adapt,
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    Sheet,
    Unspaced,
    XStack,
} from 'tamagui'



export function NationalityEditDialog() {

    const dispatch = useAppDispatch();
    const userinfo = useAppSelector(state => state.account.userinfo)

    return (
        <Dialog
            modal
            open={userinfo.nationality_d_open}
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
                        <Dialog.Title>Edit nationality</Dialog.Title>
                        <Dialog.Description>
                            Make changes to your nationality. Click save when you're done.
                        </Dialog.Description>
                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="fname">
                                Nationality
                            </Label>
                            <Input onChangeText={(text) => dispatch(updateNationality(text))} flex={1} id="fname" />
                        </Fieldset>
                        <XStack self="flex-end" gap="$4">
                            <Button theme="accent" aria-label="Close">
                                Save changes
                            </Button>
                        </XStack>
                        <Unspaced>
                            <Button onPress={() => dispatch(setNationalityDialogOpen(false))} position="absolute" r="$3" size="$2" circular icon={X} />
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    )
}