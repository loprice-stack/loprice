import {
  Separator,
  useWindowDimensions,
  Theme,
  Avatar,
  YGroup,
  ListItem,
} from 'tamagui'
import Contents400 from 'components/Contents400'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Stack } from 'expo-router'
import AccountCard from 'components/account/AccountCard'
import Contents400_2_flex from 'components/Contents400_2_flex'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import { setAddressDialogOpen, setProfilePhotoAlertDialogOpen } from './accountSlice'
import { ProfilePhotoShowAlertDialog } from 'components/account/ProfilePhotoShowAlertDialog'
//import { useAppDispatch, useAppSelector } from 'store/redux/store'

export default function Account() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const userinfo = useAppSelector(state => state.account.userinfo)

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: "Account", headerShown: true }} />
        <Contents800_2_flexdirection>
          <Contents400_2_flex>
            <Theme name="surface1">
              <AccountCard
                //@ts-ignore
                transition="bouncy"
                size="$4"
                width={300}
                height={300}

              >
                <Avatar

                  //@ts-ignore
                  transition="bouncy"
                  animation="lazy" // Use a configured animation
                  hoverStyle={{
                    scale: 1.1,
                    elevation: 5, // Adds shadow on hover
                    cursor: 'pointer'
                  }}
                  onPress={() => dispatch(setProfilePhotoAlertDialogOpen(true))} circular size="$10">
                  <Avatar.Image
                    aria-label="Cam"
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                  />
                  <Avatar.Fallback bg="$blue10" />
                </Avatar>
                <ProfilePhotoShowAlertDialog />
              </AccountCard>
            </Theme>
          </Contents400_2_flex>
          <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
          <Contents400>
            <View style={{ width: width < 600 ? width : 400 }}>
              <YGroup
                self="center"
                borderWidth={1}
                borderColor="$borderColor"
                rounded="$4"
                width={300}
                size="$5"
              >
                <YGroup.Item>
                  <ListItem title="Juto coins" subTitle="jt 10000" />
                </YGroup.Item>
              </YGroup>
            </View>
          </Contents400>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}


