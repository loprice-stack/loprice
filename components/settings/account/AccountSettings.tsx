import { Mail } from "@tamagui/lucide-icons-2";
import { axio2 } from "client/axio/axios";
import { isLoggedIn } from "client/janus/janus";
import { CreateContactDialogy } from "components/conversations/contacts/CreateContactDialogy";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions, View, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector, _message } from "store/redux/store";
import { XStack, Separator, YGroup, ListItem, Text, AlertDialog, YStack, Button } from "tamagui";


export default function AccountSettings() {

  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { settingstype } = useAppSelector(state => state.settings)
  const messageContext = useContext(_message)
  const { user_id, password, user_token } = useAppSelector(state => state.account.user)
  const { caller } = useAppSelector(state => state.calls)
  const [responsemessage, setResponseMessage] = useState("")
  const [open, setIsOpen] = useState(false)
  const [open2, setIsOpen2] = useState(false)

  useEffect(() => {
    //loadContacts(messageContext, user_id, user_token, password ,contact_type_openswitch)
  }, [])



  const deleteaccount = () => {

    if (isLoggedIn(user_token)) {
      //@ts-ignore
      axio2(user_token)
        .post("/delete/myaccount/",
          {
            user_id: user_id,
            password: password
          }, {})
        .then((response) => {

          const message: any = response.data.message;
          if (message) {

            setResponseMessage(message)
            setIsOpen(true)
          }
          console.log(response);
          setIsOpen2(false)

        })
        .catch((error) => {
          console.log(error);
          setIsOpen2(false)
          setIsOpen(true)
          setResponseMessage("Delete account fail or Unathorized")
          console.log(
            "--------------------------items error is running-------------------------------------"
          );
        });

    } else {
      setIsOpen2(false)
    }

  }



  return (
    <View style={{ flex: 1, marginTop: width < 600 ? 2 : 40, height: height }}>
      <ScrollView style={{ width: width < 600 ? width : 400, height: height }}>
        <XStack gap={'$4'} style={{ display: width < 600 ? 'none' : 'flex', alignContent: 'center', alignItems: 'center', width: width, height: 50 }}>
          <Text >{settingstype}</Text>
        </XStack>
        <AlertDialog open={open2} onOpenChange={() => setIsOpen(false)}>
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
                <AlertDialog.Title>Delete your account!</AlertDialog.Title>
                <AlertDialog.Description>
                  Are you sure you want to delete {user_id}. This will also delete all your data and history
                </AlertDialog.Description>
                <XStack gap="$3" justify="flex-end">

                  <Button onPress={() => setIsOpen2(false)} theme="accent">Cancel</Button>

                  <Button onPress={() => deleteaccount()} theme='red_accent'>Delete</Button>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
        <Separator gap={'$10'} />
        <AlertDialog open={open} onOpenChange={() => setIsOpen(false)}>
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
                <AlertDialog.Title>Response mesage!</AlertDialog.Title>
                <AlertDialog.Description>
                  {responsemessage}
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
        <YGroup
          self="center"
          borderWidth={1}
          borderColor="$borderColor"
          rounded="$4"
          overflow="hidden"
          width={width < 600 ? width - 14 : 390}
          size="$5"
        >
          <YGroup.Item>
            <ListItem
              display="none"
              gap="$3"
              title={"Recover email"}
              subTitle={"Email address to send recover password link"}

        

            />

          </YGroup.Item>
          <Separator gap={'$10'} />
          <YGroup.Item>
            <ListItem
              gap="$3"
              title={"Update account type"}
              subTitle={"Other account type gives you much benefits"}

           

            />

          </YGroup.Item>
          <Separator gap={'$10'} />
          <YGroup.Item>
            <ListItem
              gap="$3"
              title={"Delete account"}
              subTitle={"This will delete account and all data"}
              onPress={() => setIsOpen2(true)}
          

            />

          </YGroup.Item>
          <Separator gap={'$10'} />
        </YGroup>
      </ScrollView>
    </View>
  )
}


