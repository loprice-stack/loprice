import { Star, ChevronRight, Moon, Phone, MessageSquare } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { YGroup, ListItem, Separator, Avatar, useWindowDimensions, XStack, ScrollView, Text } from "tamagui";

export default function MyContacts() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();

    return (
        <View style={{ flex: 1, marginTop: width < 600 ? undefined : 40 }}>
            <ScrollView style={{ width: width < 600 ? width - 40 : 390, height: height }}>
                <Text>My Contacts</Text>
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
                            title="Star"
                            subTitle="Subtitle"
                            icon={<Avatar
                                cursor="pointer"
                                onPress={() => console.log("star clicked")}
                                circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={
                                <XStack gap="$4">
                                    <MessageSquare
                                        cursor="pointer"
                                        onPress={() => console.log("mail clicked")}
                                        size={'$1'} />
                                    <Phone
                                        cursor="pointer"
                                        onPress={
                                            //@ts-ignore
                                            () => router.navigate('/conversations/calls')}
                                        size={'$1'} />
                                </XStack>}
                        />

                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size='$6'>
                                <Avatar.Image
                                    aria-label="Cam"
                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                />
                                <Avatar.Fallback bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                    <Separator />
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title="Moon"
                            subTitle="Subtitle"
                            icon={<Avatar circular size="$6">
                                <Avatar.Image
                                    aria-label="Nate Wienert"
                                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                                />
                                <Avatar.Fallback delayMs={600} bg="$blue10" />
                            </Avatar>}
                            iconAfter={<XStack gap="$4"><MessageSquare size={'$1'} /><Phone size={'$1'} /></XStack>}
                        />
                    </YGroup.Item>
                </YGroup>
            </ScrollView>
        </View>
    )
}