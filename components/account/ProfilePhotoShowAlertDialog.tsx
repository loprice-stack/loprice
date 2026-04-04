import { setProfilePhotoAlertDialogOpen } from 'app/account/accountSlice';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import { AlertDialog, Button, XStack, YStack, Image, useWindowDimensions } from 'tamagui'

export function ProfilePhotoShowAlertDialog() {

  const { width, height } = useWindowDimensions()
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    return (
        <AlertDialog  open={user.profileimage_a_d_open} >
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
                width={width < 600 ? width - 40 : undefined}
                    elevate
                    key="content"
                    transition={[
                        //@ts-ignore
                        'lazy',
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
                >
                    <YStack gap="$4">
                            <YStack items="center" gap="$6">


                                <Image
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                    width={270}
                                    height={400}
                                    onLoad={() => { }}
                                    onLayout={(e) => { }}
                                    onClick={() => alert("Profile")}
                                />



                            </YStack>
                   
                        <XStack gap="$3" justify="flex-end">
                            <AlertDialog.Cancel asChild>
                                <Button onPress={() => { dispatch(setProfilePhotoAlertDialogOpen(false)) }}>Ok</Button>
                            </AlertDialog.Cancel>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    )
}