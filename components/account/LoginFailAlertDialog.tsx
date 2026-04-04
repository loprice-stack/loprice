import { AlertDialog, Button, XStack, YStack } from 'tamagui'

export const LoginFailAlertDialog = (open: boolean, erromessage: string) => {




  return (
    <AlertDialog open={open} native>
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
            <AlertDialog.Title>Login failed!</AlertDialog.Title>
            <AlertDialog.Description>
              {erromessage}
            </AlertDialog.Description>

            <XStack gap="$3" justify="flex-end">
              <AlertDialog.Action asChild>
                <Button theme="accent">Ok</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}