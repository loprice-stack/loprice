import { HorizontalTabs } from 'components/HorizontalTabs'
import LoginSignupContent from 'components/Contents800'
import { VerticalTabs } from 'components/VerticalTabs '
import React from 'react'
import {
  Button,
  H5,
  Separator,
  SizableText,
  Tabs,
  XStack,
  YStack,
  isWeb,
  Text,
  useWindowDimensions,
  Image,
  getConfig,
  Input,
  Form,
  Label,
  H2,
  H3,
  H4,
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import Contents400_2 from 'components/Contents400_2'
import { Link, Stack } from 'expo-router'
import Contents800 from 'components/Contents800'
const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}






export default function Login () {


  const { width, height } = useWindowDimensions();

  const currentOS = Platform.OS; // 'ios' or 'android'

  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Account", headerShown: true }} />
        <Contents800>
          <Contents400_2>
            <Image
              self={'center'}
              src={width < 600 ? require("../../../assets/images/favicon.png") : 'https://picsum.photos/200/300'}
              width={width < 600 ? 150 : 350}
              height={width < 600 ? 150 : 350}
              onLoad={() => { }}
              onLayout={(e) => { }}
              objectFit="contain"
            />
          </Contents400_2>
          <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <Form self={'center'} width={350} gap={'$4'}>
                <Label width={400} htmlFor="name">
                  <H5>Log into Loprice</H5>
                </Label>
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Username'}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Password'}
                />
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button size="$3" background="#04AA6D" >
                    <Text fontSize={14} color={'white'}>Login</Text>
                  </Button>
                </Form.Trigger>
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button size="$3" variant="outlined">
                    <Link href="/account/create">
                      <Text fontSize={14} >Create new account</Text>
                    </Link>
                  </Button>
                </Form.Trigger>
                <Form.Trigger asChild>
                  <Button size="$3" >
                    <Link href="/account/forgot">
                      <Text fontSize={14}>Forgot password</Text>
                    </Link>
                  </Button>
                </Form.Trigger>
              </Form>
            </View>
          </Contents400>
        </Contents800>
      </View>
    </KeyboardAvoidingView>
  )
}


