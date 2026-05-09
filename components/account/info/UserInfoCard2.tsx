import { Badge, Barcode, Contact, Flag, Locate, Plus } from "@tamagui/lucide-icons-2";
import {
    setAddressDialogOpen,
    setContactPDialogOpen,
    setNationalityDialogOpen,
    setPaymentsAccountDialogOpen,
    setTinDialogOpen
} from "components/account/accountSlice";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import {
    ListItem,
    Separator,
    useWindowDimensions,
    YGroup,
    YStack,
    Text,
    ScrollView,
    Spinner
} from "tamagui";

export default function UserInfoCard2() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { user_info_isloading, user, userinfo } = useAppSelector(state => state.account)

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: width < 600 ? 10 : 40, width: width < 600 ? width - 40 : 390, height: width < 600 ? 80 : height - 40 }}>
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
                        title="Nationality and id"
                        icon={Flag}
                        iconAfter={
                            <YStack>
                                <YStack style={{ display: !user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                    <Plus
                                        style={{ display: !user_info_isloading ? 'flex' : 'none' }}
                                        display={user.user_token ? 'flex' : 'none'}
                                        cursor="pointer"
                                        onPress={() => dispatch(setNationalityDialogOpen(true))} />
                                </YStack>
                                <YStack style={{ display: user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                    <Spinner size="small" color="$green10" />
                                </YStack>
                            </YStack>
                        }
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfo.nationality}</Text>
                        <Text>{userinfo.national_id}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Tin"
                        icon={Barcode}
                        iconAfter={<YStack>
                            <YStack style={{ display: !user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Plus
                                    style={{ display: !user_info_isloading ? 'flex' : 'none' }}
                                    display={user.user_token ? 'flex' : 'none'}
                                    cursor="pointer"
                                    onPress={() => dispatch(setTinDialogOpen(true))} />
                            </YStack>
                            <YStack style={{ display: user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Spinner size="small" color="$green10" />
                            </YStack>
                        </YStack>
                        }
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfo.tin}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Contacts"
                        icon={Contact}
                        iconAfter={<YStack>
                            <YStack style={{ display: !user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Plus
                                    style={{ display: !user_info_isloading ? 'flex' : 'none' }}
                                    display={user.user_token ? 'flex' : 'none'}
                                    cursor="pointer"
                                    onPress={() => dispatch(setContactPDialogOpen(true))} />
                            </YStack>
                            <YStack style={{ display: user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Spinner size="small" color="$green10" />
                            </YStack>
                        </YStack>
                        }
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfo.contactp}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Address"
                        icon={Locate}
                        iconAfter={<YStack>
                            <YStack style={{ display: !user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Plus
                                    style={{ display: !user_info_isloading ? 'flex' : 'none' }}
                                    display={user.user_token ? 'flex' : 'none'}
                                    cursor="pointer"
                                    onPress={() => dispatch(setAddressDialogOpen(true))} />
                            </YStack>
                            <YStack style={{ display: user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Spinner size="small" color="$green10" />
                            </YStack>
                        </YStack>
                        }
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfo.country}</Text>
                        <Text>{userinfo.region}</Text>
                        <Text>{userinfo.district}</Text>
                        <Text>{userinfo.ward}</Text>
                        <Text>{userinfo.places}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Payments account"
                        icon={Badge}
                        iconAfter={<YStack>
                            <YStack style={{ display: !user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Plus

                                    display={user.user_token ? 'flex' : 'none'}
                                    cursor="pointer"
                                    onPress={() => dispatch(setPaymentsAccountDialogOpen(true))} />
                            </YStack>
                            <YStack style={{ display: user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                                <Spinner size="small" color="$green10" />
                            </YStack>
                        </YStack>
                        }
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