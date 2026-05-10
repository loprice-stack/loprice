import { CALL_STATE_HANGUP, CALL_STATE_HANGUP_D, CALL_STATE_INCOMMING } from 'utils/constants'
import { useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import { AlertDialog, Button, XStack, YStack } from 'tamagui'
import { setCallContext, setCallState } from './callsSlice';
import { PhoneIncoming, PhoneOff } from '@tamagui/lucide-icons-2';

export default function CallAlertDialog() {

    const router = useRouter();
    const { caller, callstate, callcontext } = useAppSelector(state => state.calls)
    const dispatch = useAppDispatch();

    return (
        <AlertDialog open={callstate == CALL_STATE_INCOMMING ? (callcontext == 'call_ui' ? false : true) : false} >
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
                >
                    <YStack gap="$4">
                        <AlertDialog.Title>Incomming call</AlertDialog.Title>
                        <AlertDialog.Description>
                            {caller} calling...
                        </AlertDialog.Description>
                        <XStack gap="$3" justify="flex-end">
                            <Button onPress={
                                //@ts-ignore
                                () => {
                                    dispatch(setCallState(CALL_STATE_HANGUP_D))
                                    dispatch(setCallContext('call_ui'))
                                    //@ts-ignore
                                    router.navigate('/conversations/calls')

                                }}
                                theme='red_accent'
                            ><PhoneOff /></Button>
                            <Button
                                onPress={
                                    
                                    () => {
                                        //@ts-ignore
                                        router.navigate('/conversations/calls')
                                        dispatch(setCallContext('call_ui'))
                                    }}
                                theme='green_accent'><PhoneIncoming /></Button>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    )
}