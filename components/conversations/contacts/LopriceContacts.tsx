import { Star, ChevronRight, Mail, Phone, MessageSquare } from "@tamagui/lucide-icons-2";
import { View } from "react-native";
import { useAppDispatch } from "store/redux/store";
import { YGroup, ListItem, Separator, Avatar, useWindowDimensions, XStack, ScrollView, Text } from "tamagui";
import { setCaller, setCallState } from "../calls/callsSlice";
import { CALL_STATE_START_CALL } from "utils/constants";
import { useRouter } from "expo-router";

export default function LopriceContacts() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const router = useRouter();
    return (
        <View style={{ flex: 1, marginTop: width < 600 ? undefined : 40 }}>
            <ScrollView style={{ width: width < 600 ? width - 40 : 390, height: height }}>
                <Text>Loprice Contacts</Text>
                <YGroup
                    self="center"
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
                            title="Loprice Limited"
                            subTitle="loprice@loprice.co.tz"
                            icon={<Avatar
                                cursor="pointer"
                                onPress={() => console.log("mail clicked")}
                                circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src={require('assets/images/favicon.png')}
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={
                                <XStack gap="$4">
                                    <Mail
                                        cursor="pointer"
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'}
                                    />
                                    <MessageSquare
                                        cursor="pointer"
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'} />
                                    <Phone
                                        cursor="pointer"
                                        onPress={

                                            () => {
                                                //@ts-ignore
                                                router.navigate('/conversations/calls')
                                                dispatch(setCallState(CALL_STATE_START_CALL))
                                                dispatch(setCaller("loprice@loprice.co.tz"))
                                            }}
                                        size={'$1'} />
                                </XStack>}
                        />

                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Test"
                            subTitle="test@loprice.co.tz"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={
                            <XStack gap="$4">
                                <Mail cursor="pointer"
                                 onPress={() => console.log("mail clicked")} size={'$1'}
                                  />
                                  <MessageSquare cursor="pointer" 
                                  onPress={() => console.log("mail clicked")} 
                                  size={'$1'} 
                                  />
                                  <Phone cursor="pointer" 
                                        onPress={

                                            () => {
                                                //@ts-ignore
                                                router.navigate('/conversations/calls')
                                                dispatch(setCallState(CALL_STATE_START_CALL))
                                                dispatch(setCaller("test@loprice.co.tz"))
                                            }}
                                  size={'$1'} 
                                  />
                                  </XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Customer care"
                            subTitle="customers@loprice.co.tz"
                            icon={<Avatar circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><Mail cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /><MessageSquare cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /><Phone cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>

                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Property Owner"
                            subTitle="propertyowner@loprice.co.tz"
                            icon={<Avatar circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><Mail cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /><MessageSquare cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /><Phone cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Property Manager"
                            subTitle="propertymanager@loprice.co.tz"
                            icon={<Avatar

                                circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><Mail cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /><MessageSquare cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /><Phone cursor="pointer" onPress={() => console.log("mail clicked")} size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                </YGroup>
            </ScrollView>
        </View>
    )
}