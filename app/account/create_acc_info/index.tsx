import React from 'react'
import {
  Button,
  useWindowDimensions,
  Input,
  Form,
  Label,
  Spinner,
  AlertDialog,
  XStack,
  YStack,
  Fieldset,
  Separator,
  Adapt,
  Select,
  Sheet,
  ScrollView,
  YGroup
} from 'tamagui'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection'
import { axio2 } from 'client/axio/axios'
import { useAppDispatch, useAppSelector } from 'store/redux/store'
import {  
  setUserInfoIsLoading,
  updateAccountName, 
  updateAccountNumber, 
  updateAge, 
  updateContactP, 
  updateFirstname, 
  updateGender, 
  updateLastname, 
  updateNationalId, 
  updateNationality, 
  updatesecondname, 
  updateTin } from 'components/account/accountSlice'
import { Check, ChevronDown, X } from '@tamagui/lucide-icons-2'
import { LocationAddressContents } from 'components/account/info/LocationAddressContents'




export default function CreateAccount() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { width, height } = useWindowDimensions();
  //const [isloading, setIsloading] = React.useState(false)
  const [isopen, setIsopen] = React.useState(false)
  const [responsem, setResponseM] = React.useState("")
  const { user, user_info_isloading, userinfo } = useAppSelector(state => state.account)
  const {
    _user_id,
    //full name
    firstname,
    secondname,
    lastname,
    fullname_d_open,
    //gender and age
    gender,
    age,
    genderage_d_open,
    //nationality
    nationality,
    national_id,
    nationality_d_open,
    //tin
    tin,
    tin_d_open,
    //contactp
    contactp,
    contactp_d_open,
    //address
    address,
    address_d_open,
    //payments
    acname,
    acnumber,
    paymentacc_d_open,
    //optional
    religion,
    has_family,
    family_member,
    earning,
    country,
    region,
    district,
    count,
    ward,
    places

  } = useAppSelector(state => state.account.userinfo)
  const [genderr, setGender] = React.useState([{ value: "male" }, { value: "female" }])


  const create = async () => {

    if (nationality == "") {
      setResponseM("Please enter your nationality! ");
        dispatch(setUserInfoIsLoading(false))
      setIsopen(true)
      return
    }

    if (national_id == "") {
      setResponseM("Please enter your national identification number(NIN)");
      dispatch(setUserInfoIsLoading(false))
      setIsopen(true)
      return
    }

    dispatch(setUserInfoIsLoading(true))
    //@ts-ignore
    axio2(user.user_token)
      .post(user.user_id == _user_id ? "/update/info/columns/" : "/info/",
        {
          user_id: user.user_id,
          //full name
          first_name: firstname,
          second_name: secondname,
          last_name: lastname,
          //gender and age
          gender: gender,
          age: age,
          //nationality
          nationality: nationality,
          national_id: national_id,
          //tin
          tin_number: tin,
          //contactp
          phone_number: contactp,

          //payments
          //acname: "LOPRICE LIMITED",
          //acnumber: "302010432",

          //optional
          religion: religion,
          has_family: has_family,
          family_member: family_member,
          earning: "",

          country: country,
          region: region,
          district: district,
          count: count,
          ward: ward,
          street: places
        }, {})
      .then((response) => {

        const message: any = response.data.message;
        if (message) {
          setResponseM(response.data.message)
          setIsopen(true)
        } else {
          setResponseM("There is unkonown error")
          setIsopen(true)
        }
        console.log(response.data);
  dispatch(setUserInfoIsLoading(false))
      })
      .catch((error) => {
        console.log(error);
        setResponseM("There is unkonown error")
        setIsopen(true)
  dispatch(setUserInfoIsLoading(false))
        console.log(
          "--------------------------items error is running-------------------------------------"
        );
      });
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen options={{ title: user.user_id == _user_id ? "Update your profile info" : "Create your info", headerShown: true }} />
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
                <AlertDialog.Title>Profile response message</AlertDialog.Title>
                <AlertDialog.Description>
                  {responsem}
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
          <ScrollView
            showsVerticalScrollIndicator={false}

            style={{
              alignSelf: 'center',
              marginTop: width < 600 ? Platform.OS == 'web' ? 20 : undefined : 40,
              width: width < 600 ? width - 20 : 390,
              height: width < 600 ? 80 : height - 40
            }}>
            <YGroup
              items={'center'}
              style={{ marginTop: 10 }}
              borderWidth={1}
              borderColor="$borderColor"
              rounded="$4"
              overflow="hidden"
              width={width < 600 ? width - 20 : 390}
              size="$5"
            >

              <Form
                style={{ marginTop: 10 }}
                self={'center'} width={350} gap={'$2'}>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    First name
                  </Label>
                  <Input placeholder={firstname} onChangeText={(text) => dispatch(updateFirstname(text))} flex={1} id="fname" />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="sname">
                    Second name
                  </Label>
                  <Input placeholder={secondname} onChangeText={(text) => dispatch(updatesecondname(text))} flex={1} id="sname" />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="lname">
                    Last name
                  </Label>
                  <Input placeholder={lastname} onChangeText={(text) => dispatch(updateLastname(text))} flex={1} id="lname" />
                </Fieldset>
                <Separator />
                <Fieldset gap="$4" horizontal>
                  <XStack width="100%" items="center" gap="$4">
                    <Label width={100} htmlFor="name">
                      Gender
                    </Label>
                    <Select
                      value={gender}
                      onValueChange={(text) => { dispatch(updateGender(text)) }}
                    >
                      <Select.Trigger
                        maxWidth={width < 600 ? 100 : 190}
                        iconAfter={ChevronDown}
                        borderRadius="$4"
                        backgroundColor="$background"
                      >
                        <Select.Value placeholder="Gender" />
                      </Select.Trigger>

                      <Adapt
                        //@ts-ignore
                        when="maxMd"
                        platform="touch">

                        <Sheet
                          native={true}
                          modal
                          dismissOnSnapToBottom
                          //@ts-ignore
                          transition="medium">
                          <Sheet.Frame>
                            <Sheet.ScrollView>
                              <Adapt.Contents />
                            </Sheet.ScrollView>
                          </Sheet.Frame>
                          <Sheet.Overlay
                            bg="$shadowColor"
                            //@ts-ignore
                            transition="lazy"
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                          />
                        </Sheet>
                      </Adapt>

                      <Select.Content>
                        <Select.Viewport
                          minW={width < 600 ? 100 : 190}
                          bg="$background"
                          rounded="$4"
                          borderWidth={1}
                          borderColor="$borderColor"
                        >
                          <Select.Group>
                            <Select.Label fontWeight="700">Gender</Select.Label>
                            {/* for longer lists memoizing these is useful */}
                            {React.useMemo(
                              () =>
                                genderr.map((item, i) => {
                                  return (
                                    <Select.Item
                                      index={i}
                                      key={item.value}
                                      value={item.value}
                                    >
                                      <Select.ItemText>{item.value}</Select.ItemText>
                                      <Select.ItemIndicator marginLeft="auto">
                                        <Check size={16} />
                                      </Select.ItemIndicator>
                                    </Select.Item>
                                  )
                                }),
                              [gender]
                            )}
                          </Select.Group>
                          {/* Native gets an extra icon */}
                          <YStack
                            position="absolute"
                            r={0}
                            t={16}
                            items="center"
                            justify="center"
                            width={'$4'}
                            pointerEvents="none"
                          >
                            <ChevronDown
                              size={'$11'}
                            />
                          </YStack>
                        </Select.Viewport>
                      </Select.Content>
                    </Select>
                  </XStack>
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="name">
                    Age
                  </Label>
                  <Input
                    keyboardType="numeric"    // For Native
                    inputMode="numeric"      // For Web
                    flex={1}
                    placeholder={age.toString()}
                    onChangeText={(text) => dispatch(updateAge(text))}
                  />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    Nationality
                  </Label>
                  <Input placeholder={nationality}  onChangeText={(text) => dispatch(updateNationality(text))} flex={1} id="fname" />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    National id
                  </Label>
                  <Input placeholder={national_id} onChangeText={(text) => dispatch(updateNationalId(text))} flex={1} id="fname" />
                </Fieldset>
              </Form>

            </YGroup>
          </ScrollView>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              alignSelf: 'center',
              marginTop: width < 600 ? Platform.OS == 'web' ? 20 : undefined : 40,
              width: width < 600 ? width - 20 : 390,
              height: width < 600 ? 80 : height - 40
            }}>
            <YGroup
              items={'center'}
              style={{ marginTop: 10 }}
              borderWidth={1}
              borderColor="$borderColor"
              rounded="$4"
              overflow="hidden"
              width={width < 600 ? width - 20 : 390}
              size="$5"
            >

              <Form
                style={{ marginTop: 10 }}
                onSubmit={() => create()}
                self={'center'} width={350} gap={'$2'}>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    Tin
                  </Label>
                  <Input placeholder={tin} onChangeText={(text) => dispatch(updateTin(text))} flex={1} id="fname" />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    Phone
                  </Label>
                  <Input placeholder={contactp} onChangeText={(text) => dispatch(updateContactP(text))} flex={1} id="fname" />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    Acc Name
                  </Label>
                  <Input placeholder={acname} onChangeText={(text) => dispatch(updateAccountName(text))} flex={1} id="fname" />
                </Fieldset>
                <Fieldset gap="$4" horizontal>
                  <Label width={100} htmlFor="fname">
                    Acc Number
                  </Label>
                  <Input placeholder={acnumber} onChangeText={(text) => dispatch(updateAccountNumber(text))} flex={1} id="fname" />
                </Fieldset>
                <Separator />
                <Fieldset
                  horizontal>
                  <LocationAddressContents />
                </Fieldset>

                <Form.Trigger style={{ marginTop: 16, marginBottom: 16 }} asChild>
                  <Button
                    size="$3" background="#04AA6D" >
                    <Spinner style={{ display: user_info_isloading ? 'flex' : 'none' }} size="small" color="$green10" />
                    <Button.Text fontSize={14} color={'white'}>{user.user_id == _user_id ? 'Update' : 'Create'}</Button.Text>
                  </Button>
                </Form.Trigger>
              </Form>

            </YGroup>
          </ScrollView>
        </Contents800_2_flexdirection>
      </View>
    </KeyboardAvoidingView>
  )
}
