import { HorizontalTabs } from 'components/HorizontalTabs'

import { VerticalTabs } from 'components/VerticalTabs '
import React from 'react'
import {
  Button,
  H5,
  Text,
  useWindowDimensions,
  Input,
  Form,
  Label
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import Contents800 from 'components/Contents800'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
}



export default function ResetPassword() {
  const { width, height } = useWindowDimensions();

  const currentOS = Platform.OS; // 'ios' or 'android'
  const [demoIndex, setDemoIndex] = React.useState(0)
  const demo = demos[demoIndex]
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Create account", headerShown: true }} />
        <Contents800_2_flexdirection>
          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <Form self={'center'} width={350} gap={'$4'}>
                <Label width={400} htmlFor="name">
                  <H5>Reset account password</H5>
                </Label>
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Username'}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Email'}
                />
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button size="$3" background="#04AA6D" >
                    <Text fontSize={14} color={'white'}>Send reset mail</Text>
                  </Button>
                </Form.Trigger>
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button size="$3" >
                    <Link href="/account">
                      <Text fontSize={14}>I remembered my password</Text>
                    </Link>
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
