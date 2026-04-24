import { CALL_STATE_HANGUP, CALL_STATE_INCOMMING } from 'utils/constants'
import { useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import { AlertDialog, Button, useWindowDimensions, XStack, YStack } from 'tamagui'
import { setRequireLoginDialogOpen } from './accountSlice';


export default function AccountAlertDialogy() {
    const { width, height } = useWindowDimensions();
    const router = useRouter();
    const { requirelogin_d_open } = useAppSelector(state => state.account)
    const dispatch = useAppDispatch();


    return (
        <AlertDialog open={requirelogin_d_open ? true : false} >

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
                    width={width < 600 ? width - 20 : 600}
                >
                    <YStack gap="$4">
                        <AlertDialog.Title>Login is required</AlertDialog.Title>
                        <AlertDialog.Description>
                            Please login with your account first. Or create one to get started.
                        </AlertDialog.Description>
                        <AlertDialog.Description>
                            Creating account is simple.
                            Just type your name or email, create and then you have the account
                        </AlertDialog.Description>
                        <XStack gap="$3" justify="flex-end">
                            <Button
                                onPress={
                                    //@ts-ignore
                                    () => {
                                        router.navigate('/account/login')
                                        dispatch(setRequireLoginDialogOpen(false))
                                    }}
                                theme="accent">Login</Button>
                            <Button
                                onPress={
                                    //@ts-ignore
                                    () => {
                                        router.navigate('/account/create')
                                        dispatch(setRequireLoginDialogOpen(false))
                                    }}
                                theme="accent">Create account</Button>
                            <Button onPress={
                                //@ts-ignore
                                () => dispatch(setRequireLoginDialogOpen(false))}
                            >Cancel</Button>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    )
}