import { Badge, Barcode, Contact, Flag, Locate } from "@tamagui/lucide-icons-2";
import { setCaller, setCallState } from "components/conversations/calls/callsSlice";
import { setMessages } from "components/conversations/messages/messagesSlice";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import { ListItem, ScrollView, Separator, useWindowDimensions, YGroup, YStack, Text, Spinner } from "tamagui";
import { CALL_STATE_START_CALL } from "utils/constants";

export default function UserInfoCard2() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { public_user_info_isloading, userinfo, userinfop, user } = useAppSelector(state => state.account)

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                marginTop: width < 600 ? 2 : 40,
                width: width < 600 ? width - 40 : 390,
                height: width < 600 ? 80 : height - 40
            }}>
            <YGroup
                items={'center'}
                borderWidth={1}
                borderColor="$borderColor"
                rounded="$4"
                overflow="hidden"
                width={width < 600 ? width - 40 : 390}
                size="$5"
            >
                <YGroup.Item>

                    <ListItem
                        gap="$3"
                        title="View live streams"
                        subTitle="View our home or ofice"
                        icon={Flag}
                        cursor='pointer'
                        //@ts-ignore
                        onPress={() => router.navigate('/')}
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>

                    <ListItem
                        gap="$3"
                        title="Product and services"
                        subTitle="View our listings"
                        icon={Flag}
                        cursor='pointer'
                        //@ts-ignore
                        onPress={() => router.navigate('/')}
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>

                    <ListItem
                        gap="$3"
                        title="Subscription"
                        subTitle="Subscribe to direct call, message and emails"
                        icon={Flag}
                        cursor='pointer'
                        //@ts-ignore
                        onPress={() => router.navigate('/')}
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Call"
                        subTitle="Video and audio call"
                        icon={Barcode}
                        cursor='pointer'
                        //@ts-ignore
                        onPress={() => {
                            dispatch(setCaller(userinfop.user_id_))
                            //@ts-ignore
                            router.navigate('/conversations/calls')
                        }}
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Message"
                        subTitle="Chat with me right now"
                        icon={Contact}
                        cursor='pointer'
                        onPress={() => {

                            //@ts-ignore
                            router.navigate('/conversations/messages')
                            dispatch(setCallState(CALL_STATE_START_CALL))
                            if (user.user_id !== userinfop.user_id_) {
                                dispatch(setMessages([]))

                            }
                            dispatch(setCaller(userinfop.user_id_))


                        }}
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Email"
                        subTitle="Write email to me"
                        icon={Locate}
                        cursor='pointer'
                        //@ts-ignore
                        onPress={() => router.navigate('/')}
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Payments"
                        subTitle="Make payments to me"
                        icon={Badge}
                        cursor='pointer'
                        //@ts-ignore
                        onPress={() => router.navigate('/')}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfo.acname}</Text>
                        <Text>{userinfo.acnumber}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
            </YGroup>
        </ScrollView>
    )
}