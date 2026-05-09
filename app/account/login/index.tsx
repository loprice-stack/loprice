import React, { useContext } from 'react'
import {
  Button,
  H5,
  Separator,
  Text,
  useWindowDimensions,
  Image,
  Input,
  Form,
  Label,
  YStack,
  Spinner,
  AlertDialog,
  XStack,
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import Contents400_2 from 'components/Contents400_2'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { updateLoginStatus, updatePassword, updateUserId } from '../../../components/account/accountSlice'
import { accountLogin } from 'client/AxiosHttpClient'
import { _message, _session, _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store'
import { jidAsStringOf } from 'utils/utility'
import { initializeLopriceServices } from 'client/janus/janus'



export default function Login() {

  const router = useRouter()
  const { width, height } = useWindowDimensions();
  const [isloading, setIsloading] = React.useState(false)
  const [isopen, setIsopen] = React.useState(false)
  const [errorm, setErrorm] = React.useState("")
  const dispatch = useAppDispatch();

  const sessionContext = useContext(_session)
  const videoCallContext = useContext(_videohandle)
  const messageContext = useContext(_message)
  const { user_id, email, password, user_token } = useAppSelector(state => state.account.user)

  function login() {

    if (user_id == "") {
      setErrorm("Please enter your account! ");
      setIsloading(false);
      setIsopen(true)
      return
    }

    setIsloading(true);
    const _username_ = jidAsStringOf(user_id)
    dispatch(updateUserId(_username_))
    accountLogin(_username_, password).then(async (response) => {

      const token = response.data.user_token
      if (token) {
        dispatch(updateLoginStatus({
          "user_token": token,
          "user_id": response.data.user_id,
          "email": response.data.email,
          "image_url": response.data.image_url,
          "password": password,
          "user_type": response.data.user_type,
          "token_type": response.data.token_type,
          "access_level": response.data.access_level
        }))
        await initializeLopriceServices(sessionContext, videoCallContext, messageContext, user_token, _username_, password)
        console.log(response.data)
        //@ts-ignore
        router.navigate('/')
        console.log("----------------------login--success-----------------------")
      } else {
        setErrorm(response.data.message)
        setIsopen(true)
        console.log(response.data)
      }
      setIsloading(false);
    }).catch((error) => {
      try {
        const er = error.response.data.detail
        if (er) {
          setErrorm(error.response.data.detail)
        } else {
          setErrorm("Unkown error")
        }
        setIsloading(false);
        setIsopen(true)
      } catch (er) {
        setErrorm("There is a problem with your connection! Please try again");
        setIsloading(false);
        setIsopen(true)
      }
    })
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Account", headerShown: true }} />
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
                <AlertDialog.Title>Login failed!</AlertDialog.Title>
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
          <Contents400_2>
            <Image
              self={'center'}
              src={width < 600 ? require("../../../assets/images/favicon.png") : 'https://picsum.photos/200/300'}
              width={width < 600 ? 120 : 350}
              height={width < 600 ? 120 : 350}
              onLoad={() => { }}
              onLayout={(e) => { }}
              objectFit="contain"
            />
          </Contents400_2>
          <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <Form
                onSubmit={() => login()}
                self={'center'} width={350} gap={'$4'}>
                <Label width={400} htmlFor="name">
                  <H5>Log into Loprice</H5>
                </Label>
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Username'}
                  value={user_id}
                  onChangeText={(text) => dispatch(updateUserId(text))}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Password'}
                  value={password}
                  onChangeText={(text) => dispatch(updatePassword(text))}
                />
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button
                    size="$3" background="#04AA6D" >
                    <Spinner style={{ display: isloading ? 'flex' : 'none' }} size="small" color="$green10" />
                    <Button.Text fontSize={14} color={'white'}>Login</Button.Text>
                  </Button>
                </Form.Trigger>
                <Button
                  onPress={() => router.navigate('/account/create_account')}
                  size="$3" variant="outlined">
                  <Text fontSize={14} >Create new account</Text>
                </Button>
                <Button
                  onPress={() => router.navigate('/account/forgot')}
                  size="$3" >
                  <Text fontSize={14}>Forgot password</Text>
                </Button>
              </Form>
            </View>
          </Contents400>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}


