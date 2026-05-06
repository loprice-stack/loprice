import React from 'react'
import {
  Button,
  H5,
  Text,
  useWindowDimensions,
  Input,
  Form,
  Label,
  Spinner,
  AlertDialog,
  XStack,
  YStack
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { jidAsStringOf } from 'utils/utility'
import { axio2_api3 } from 'client/axio/axios'
import { LOPRICE_API_PRODUCTION_ENV_PUBLIC_KEY } from 'utils/constants'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import { updateEmail, updatePassword, updateUserId } from 'components/account/accountSlice'




export default function CreateAccount() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { width, height } = useWindowDimensions();
  const [isloading, setIsloading] = React.useState(false)
  const [isopen, setIsopen] = React.useState(false)
  const [errorm, setErrorm] = React.useState("")
  const { user_id, email, password } = useAppSelector(state => state.account.user)



  const create = async () => {

    if (user_id == "") {
      setErrorm("Please enter your name or email! ");
      setIsloading(false);
      setIsopen(true)
      return
    }

    if (password == "") {
      setErrorm("Please enter something for passwrd! ");
      setIsloading(false);
      setIsopen(true)
      return
    }

    let jid = await jidAsStringOf(user_id)
    dispatch(updateUserId(jid))
    setIsloading(true)
    axio2_api3(LOPRICE_API_PRODUCTION_ENV_PUBLIC_KEY)
      .post("/user2/",
        {
          user_id: jid,
          user_type: "citizen",
          email: email.includes("@") ? email : jid,
          password: password,
          access_level: 2, // 1=read only, 2=read and write, 3=read, write and update, 4=read,write,update and delete 
          logged_in: "string",
          token_facebook: "string",
          token_twitter: "string",
          token_google: "string",
          user_token: "string",
          image_url: "string"
        }, {})
      .then((response) => {

        const message: any = response.data.message;
        if (message) {
          if (message.includes("User created successfully")) {
            router.navigate({
              pathname: '/account/login',
              params: { _username: user_id, _password: password, from: 'signup_ui' }
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
        console.log(error);
        setIsloading(false)
        console.log(
          "--------------------------items error is running-------------------------------------"
        );
      });
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Create account", headerShown: true }} />
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
                <AlertDialog.Title>Signup failed!</AlertDialog.Title>
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

        <Contents800_2_flexdirection>
          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <Form
                onSubmit={() => create()}
                self={'center'} width={350} gap={'$4'}>
                <Label width={400} htmlFor="name">
                  <H5>Create new account</H5>
                </Label>
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Username'}
                  onChangeText={(text) => dispatch(updateUserId(text))}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Email'}
                  onChangeText={(text) => dispatch(updateEmail(text))}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Password'}
                  onChangeText={(text) => dispatch(updatePassword(text))}
                />
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button
                    size="$3" background="#04AA6D" >
                    <Spinner style={{ display: isloading ? 'flex' : 'none' }} size="small" color="$green10" />
                    <Button.Text fontSize={14} color={'white'}>Create</Button.Text>
                  </Button>
                </Form.Trigger>
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button
                    onPress={() => router.navigate('/account/login')}
                    size="$3" >
                    <Text fontSize={14}>I arleady have account</Text>
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
