import { HorizontalTabs } from 'components/HorizontalTabs'
import LoginSignupContent from 'components/Contents800'
import { VerticalTabs } from 'components/VerticalTabs '
import React from 'react'
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
import { Link, Stack } from 'expo-router'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { updateLoginStatus } from '../accountSlice'
import { accountLogin } from 'client/AxiosHttpClient'
import { useAppDispatch } from 'store/redux/store'
import PersonalInfoCard from 'components/PersonalInfoCard'
import UserInfoCard from 'components/UserInfoCard'





export default function Info() {

  const demos = ['horizontal', 'vertical'] as const
  const demosTitle: Record<(typeof demos)[number], string> = {
    horizontal: 'Horizontal',
    vertical: 'Vertical',
  }


  const { width, height } = useWindowDimensions();

  const currentOS = Platform.OS; // 'ios' or 'android'
  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isloading, setIsloading] = React.useState(false)
  const [isopen, setIsopen] = React.useState(false)

  const [errorm, setErrorm] = React.useState("")


  const dispatch = useAppDispatch();
  //const { isloggedin } = useAppSelector(state => state.account.user.user_token)


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Personal Information", headerShown: true }} />
        <Contents800_2_flexdirection>
          <Contents400_2>
            <UserInfoCard />
          </Contents400_2>
          <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
          <Contents400>
            <PersonalInfoCard />
          </Contents400>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}


