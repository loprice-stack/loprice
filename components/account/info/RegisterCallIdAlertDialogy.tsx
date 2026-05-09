import { CALL_STATE_HANGUP, CALL_STATE_INCOMMING } from 'utils/constants'
import { useRouter } from 'expo-router'
import { _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store'
import { AlertDialog, Button, useWindowDimensions, XStack, YStack } from 'tamagui'
import { setRequireRegisterDialogOpen } from '../accountSlice';
import { useContext } from 'react';


export default function RegisterCallIdAlertDialogy() {
  const { width, height } = useWindowDimensions();
    const router = useRouter();
    const { requireregister_d_open, user } = useAppSelector(state => state.account)
    const dispatch = useAppDispatch();
  const videoCallContext = useContext(_videohandle)

    return (
        <AlertDialog  open={requireregister_d_open ? true : false} >

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
                     width={width < 600 ? width -20 : 600}
                >
                    <YStack gap="$4">
                        <AlertDialog.Title>Register is required</AlertDialog.Title>
                        <AlertDialog.Description>
                            You must register your caller id first o make a call
                            </AlertDialog.Description>

                            <XStack gap="$3" justify="flex-end">
                                <Button
                                    onPress={
                                        //@ts-ignore
                                        () => {
                                            //@ts-ignore
                                            videoCallContext.videohandle.register(user.user_id)
                                            dispatch(setRequireRegisterDialogOpen(false))
                                        }}
                                    theme="accent">Register</Button>

                                <Button onPress={
                                    //@ts-ignore
                                    () => {dispatch(setRequireRegisterDialogOpen(false))}}
                                >Cancel</Button>
                            </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    )
}