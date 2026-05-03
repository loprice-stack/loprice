import { HorizontalTabs } from 'components/listings/HorizontalTabs'

import { VerticalTabs } from 'components/listings/VerticalTabs '
import React from 'react'
import {
  Button,
  H5,
  Text,
  useWindowDimensions,
  Input,
  Form,
  Label,
  AlertDialog,
  XStack,
  YStack,
  Spinner
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Link, Stack, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import Contents800 from 'components/Contents800'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import { axio2, axio2_api3 } from 'client/axio/axios'
import { updatePassword, updateUserId } from 'components/account/accountSlice'
import { LOPRICE_API_PRODUCTION_ENV_PUBLIC_KEY } from 'utils/constants'
import { jidAsStringOf } from 'utils/utility'



export default function NewPassword() {
  
  const { user_id, token } = useGlobalSearchParams<{ user_id: string; token: string }>();
  const router = useRouter()
  const { width, height } = useWindowDimensions();
  const { email, password, user_token } = useAppSelector(state => state.account.user)
  const [isloading, setIsloading] = React.useState(false)
  const [isopen, setIsopen] = React.useState(false)
  const [errorm, setErrorm] = React.useState("")
  const dispatch = useAppDispatch();

  const reset = async () => {

    console.log(user_id)
    console.log(token)
    console.log("-------------------------------------token---reset---------------------------------")
    if (password == "") {
      setErrorm("Please enter something for new passwrd! ");
      setIsloading(false);
      setIsopen(true)
      return
    }

    //let jid = await jidAsStringOf(user_id)
    dispatch(updateUserId(user_id))
    setIsloading(true)
    axio2(token)
      .post("/reset/user/password/",
        {
          email: email,
          user_id: user_id,
          password: password,
        }, {})
      .then((response) => {

        const message: any = response.data.message;
        if (message) {
          if (message.includes("User reset successfully")) {
                        setErrorm(response.data.message)
            setIsopen(true)
            dispatch(updatePassword(password))
            router.navigate({
              pathname: '/account/login',
              params: { _username: user_id, _password: password, from: 'forgot_ui' }
            })
          } else {
            setErrorm(response.data.message)
            setIsopen(true)
          }
        }
        console.log(response.data);
        setIsloading(false)
      })
      .catch((error) => {
        console.log(JSON.stringify(error.message)  + "(Anauthorized or Expired token)");
                    setErrorm(JSON.stringify(error.message)  + "(Unauthorized or Expired token)")
            setIsopen(true)
        setIsloading(false)
        console.log(
          "--------------------------items error is running-------------------------------------"
        );
      });
  }





  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Change account password", headerShown: true }} />
        <Contents800_2_flexdirection>
          <AlertDialog open={isopen} onOpenChange={() => setIsopen(false)}>
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
                  <AlertDialog.Title>Password reset message</AlertDialog.Title>
                  <AlertDialog.Description>
                    {errorm}
                  </AlertDialog.Description>
                  <XStack gap="$3" justify="flex-end">
                    <AlertDialog.Cancel asChild>
                      <Button theme="accent">Ok</Button>
                    </AlertDialog.Cancel>
                  </XStack>
                </YStack>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog>

          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <Form
                onSubmit={() => reset()}
                self={'center'} width={350} gap={'$4'}>
                <Label width={400} htmlFor="name">
                  <H5>Reset account password</H5>
                </Label>
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'New password'}
                  onChangeText={(text) => dispatch(updatePassword(text))}
                />
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button
                    size="$3" background="#04AA6D" >
                    <Spinner style={{ display: isloading ? 'flex' : 'none' }} size="small" color="$green10" />
                    <Button.Text fontSize={14} color={'white'}>Change</Button.Text>
                  </Button>
                </Form.Trigger>
              </Form>
            </View>
          </Contents400>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}
