import { _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store'
import { AlertDialog, Button, useWindowDimensions, XStack, YStack } from 'tamagui'
import { setCallErrorDialogOpen } from './callsSlice';

export default function CallErrorAlertDialogy() {
  const { width, height } = useWindowDimensions();
    const {callerror_d_open, callerror_message } = useAppSelector(state => state.calls)
    const dispatch = useAppDispatch();

    return (
        <AlertDialog  open={callerror_d_open ? true : false} >

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
                        <AlertDialog.Title>Problem making a call</AlertDialog.Title>
                        <AlertDialog.Description>
                            {callerror_message}
                            </AlertDialog.Description>

                            <XStack gap="$3" justify="flex-end">

                                <Button onPress={
                                    //@ts-ignore
                                    () => {dispatch(setCallErrorDialogOpen(false))}}
                                >Ok</Button>
                            </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    )
}