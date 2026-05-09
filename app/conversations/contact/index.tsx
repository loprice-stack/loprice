import {
  Separator,
  useWindowDimensions,
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import Contents400_2 from 'components/Contents400_2'
import { Stack } from 'expo-router'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { useAppDispatch } from 'store/redux/store'
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


export default function ContactInfo() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: Platform.OS !== 'web' ? 40 : undefined}}>
        <Stack.Screen options={{ title: "Info", headerShown: true }} />
        <Contents800_2_flexdirection>
          <Contents400_2>
            <ProfilePhotoEditorDialog/>
            <FullnameEditDialog/>
            <GenderAgeEditDialogy/>
            <UserInfoCard />
          </Contents400_2>
          <Separator style={{display: Platform.OS !== 'web' ? 'none' : 'flex'}} vertical={width < 600 ? false : true} my={15} gap={'$8'} />
          <Contents400>
            <NationalityEditDialog/>
            <TinEditDialog/>
            <ContactsEditDialog/>
            <AddressEditDialog/>
            <PaymentsAccountEditDialog/>
            <UserInfoCard2 />
          </Contents400>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}


