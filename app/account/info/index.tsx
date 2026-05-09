import React from 'react'
import {
  Label,
  Separator,
  useWindowDimensions,
  XStack,
  Text
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import Contents400_2 from 'components/Contents400_2'
import { router, Stack } from 'expo-router'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import UserInfoCard from 'components/account/info/UserInfoCard'
import { FullnameEditDialog } from 'components/account/info/FullnameEditDialog'
import { GenderAgeEditDialogy } from 'components/account/info/GenderAgeEditDialogy'
import { NationalityEditDialog } from 'components/account/info/NationalityEditDialog'
import { TinEditDialog } from 'components/account/info/TinEditDialog'
import { ContactsEditDialog } from 'components/account/info/ContactsEditDialog'
import { AddressEditDialog } from 'components/account/info/AddressEditDialog'
import { PaymentsAccountEditDialog } from 'components/account/info/PaymentsAccountEditDialog'
import UserInfoCard2 from 'components/account/info/UserInfoCard2'
import { ProfilePhotoEditorDialog } from 'components/account/info/ProfilePhotoEditorDialog'
import { ArrowLeft, Plus, UserSquare2 } from '@tamagui/lucide-icons-2'



export default function Info() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { enable_editing, user } = useAppSelector(state => state.account)
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: Platform.OS !== 'web' ? 40 : undefined }}>
        <Stack.Screen options={{
          headerTintColor: '#fff', title: "Personal Information", headerShown: true, header: () => {
            return (
              <View
                style={{ backgroundColor: "#fff", marginTop: Platform.OS == 'web' ? undefined : 20, height: 65, alignItems: 'stretch', alignContent: 'space-between' }}
              >
                <XStack
                  style={{ backgroundColor: "#fff", width: width, height: 65, position: 'absolute', alignSelf: 'center', alignItems: 'center' }}
                  p="$3" gap="$6" >
                  <XStack gap="$4" >
                    <ArrowLeft
                      onPress={() => {
                        router.back()
                      }}
                      self={'center'}
                      cursor="pointer" color={'$accent6'} />
                    <Label
                      self={'center'}
                      htmlFor="name"><Text fontSize={18} fontStyle='normal'> Personal Information</Text></Label>
                  </XStack>
                  <Plus
                    style={{ display: enable_editing ? 'none' : 'flex', alignSelf: 'flex-end', position: 'absolute' }}
                    onPress={() => {
                      //@ts-ignore
                      router.navigate('/account/create_acc_info')
                    }}
                    cursor="pointer" color={'$accent6'} />
                  <UserSquare2
                    style={{ display: enable_editing ? 'none' : 'flex', alignSelf: 'flex-end', position: 'absolute' }}
                    onPress={() => {
                      //@ts-ignore
                      router.navigate('/conversations/contact/(public)' + '?' + 'user_id=' + user.user_id)
                    }}
                    cursor="pointer" color={'$accent6'} />
                </XStack>
              </View>
            )
          },
        }} />
        <Contents800_2_flexdirection>
          <Contents400_2>
            <ProfilePhotoEditorDialog />
            <FullnameEditDialog />
            <GenderAgeEditDialogy />
            <UserInfoCard />
          </Contents400_2>
          <Separator style={{ display: Platform.OS !== 'web' ? 'none' : 'flex' }} vertical={width < 600 ? false : true} my={15} gap={'$8'} />
          <Contents400>
            <NationalityEditDialog />
            <TinEditDialog />
            <ContactsEditDialog />
            <AddressEditDialog />
            <PaymentsAccountEditDialog />
            <UserInfoCard2 />
          </Contents400>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}


