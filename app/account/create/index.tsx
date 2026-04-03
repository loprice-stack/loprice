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
import { Link, Stack, useRouter } from 'expo-router'
import Contents800 from 'components/Contents800'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'




export default function CreateAccount() {
  const router = useRouter()
  const { width, height } = useWindowDimensions();

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Create account", headerShown: true }} />
        <Contents800_2_flexdirection>
          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <Form self={'center'} width={350} gap={'$4'}>
                <Label width={400} htmlFor="name">
                  <H5>Create new account</H5>
                </Label>
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Username'}
                  onChangeText={(text) => setUsername(text)}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Email'}
                  onChangeText={(text) => setEmail(text)}
                />
                <Input
                  theme="surface1"
                  size={'$4'}
                  placeholder={'Password'}
                  onChangeText={(text) => setPassword(text)}
                />
                <Form.Trigger style={{ marginTop: 16 }} asChild>
                  <Button size="$3" background="#04AA6D" >
                    <Text fontSize={14} color={'white'}>Create</Text>
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
