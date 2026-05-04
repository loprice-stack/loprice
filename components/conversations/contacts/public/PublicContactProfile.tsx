import { Baby, Badge, Barcode, ChevronRight, Contact, Flag, Locate, Moon, Plus, Star, User2 } from "@tamagui/lucide-icons-2";
import { Avatar, Image, ListItem, ScrollView, Separator, useWindowDimensions, View, YGroup } from "tamagui";

import { useAppDispatch, useAppSelector } from "store/redux/store";
import { setProfilePhotoEditDialogOpen, setFullnameDialogOpen, setGenderAgeDialogOpen, setProfilePhotoAlertDialogOpen, setNationalityDialogOpen, setTinDialogOpen, setContactPDialogOpen, setPaymentsAccountDialogOpen, setAddressDialogOpen } from "components/account/info/accountSlice";
import Contents400_2 from "components/Contents400_2";


export default function UserInfoCard() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    
    return (
        <View style={{ flex: 1, marginTop: width < 600 ? undefined : 40, height: height }}>
            <ScrollView style={{ width: width < 600 ? width - 40 : 390, height: height }}>
                <Contents400_2>
                    <YGroup
                        items={'center'}
                        borderWidth={1}
                        borderColor="$borderColor"
                        rounded="$4"
                        overflow="hidden"
                        width={width < 600 ? width - 10 : 390}
                        size="$5"
                    >
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"



                                >
                                    <Avatar
                                        overflow="hidden"
                                        //@ts-ignore
                                        animation="lazy" // Use a configured animation
                                        hoverStyle={{
                                            scale: 1.1,
                                            elevation: 5, // Adds shadow on hover
                                            cursor: 'pointer'
                                        }}
                                        self={'flex-start'}
                                        margin={20}
                                        onPress={undefined}

                                        size="$10">
                                        <Avatar.Image

                                            aria-label="Cam"
                                            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                        />
                                        <Avatar.Fallback bg="$blue10" />
                                    </Avatar>
                                </ListItem>
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Full name"
                                    subTitle="Loprice Limited"
                                    icon={User2}


                                />
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Gender and age"
                                    subTitle="Me, 4"
                                    icon={Baby}


                                />
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Nationality"
                                    subTitle="Tanzanian"
                                    icon={Flag}

                                />
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Tin"
                                    subTitle="157-752-049"
                                    icon={Barcode}

                                />
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Contacts"
                                    subTitle="+255746334493"
                                    icon={Contact}

                                />
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Address"
                                    subTitle="POBOX901"
                                    icon={Locate}

                                />
                            </YGroup.Item>
                            <Separator />
                            <YGroup.Item>
                                <ListItem
                                    gap="$3"
                                    title="Payments account"
                                    subTitle="10204674674"
                                    icon={Badge}

                                />
                            </YGroup.Item>
                            <Separator />
                    </YGroup>
                </Contents400_2>
            </ScrollView>
        </View>
    )
}