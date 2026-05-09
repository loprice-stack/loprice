import { ArrowLeft, Phone} from "@tamagui/lucide-icons-2";
import { Avatar, useWindowDimensions, View, Label, XStack } from "tamagui";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import { Platform } from "react-native";
import { router } from "expo-router";

export default function UserInfoToolBar() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { user, userinfo } = useAppSelector(state => state.account)

    return (
            <View
              style={{ marginTop: Platform.OS == 'web' ? undefined : 20, height: 70, alignItems: 'stretch', alignContent: 'space-between' }}
              background={"#fff"}
            >
              <XStack
                style={{ height: 70, alignSelf: 'flex-start' }}
                background={"#fff"}
                p="$3" gap="$4" >
                <ArrowLeft
                  onPress={() => {
                    router.back()
                  }}
                  self={'center'}
                  cursor="pointer" color={'$accent6'} />
                <Avatar
                  self={'center'}
                  cursor="pointer"
                  circular size="$4">
                  <Avatar.Image src="http://picsum.photos/200/300" />
                  <Avatar.Fallback
                    //@ts-ignore
                    bc="red" />
                </Avatar>
                <Label
                  self={'center'}
                  htmlFor="name">{"Name"}</Label>
              </XStack>
              <XStack
                style={{ height: 70, position: 'absolute', alignSelf: 'flex-end', alignItems: 'center' }}
                background={"#fff"}
                p="$3" gap="$0" >
                <Phone
                  self={'center'}
                  marginEnd={30}
                  onPress={() => {
                    //@ts-ignore
                    router.navigate('/conversations/calls')
                  }}
                  cursor="pointer" color={'$accent6'} />
              </XStack>
            </View>
    )
}