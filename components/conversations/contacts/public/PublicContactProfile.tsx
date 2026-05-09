import { Baby, Barcode,  Contact, Flag, Locate, User2 } from "@tamagui/lucide-icons-2";
import { Avatar, ListItem, ScrollView, Separator, useWindowDimensions, Text, YGroup, YStack, Spinner } from "tamagui";

import { useAppDispatch, useAppSelector } from "store/redux/store";
import { setProfilePhotoEditDialogOpen, setProfilePhotoAlertDialogOpen,  setUserPublicProfileInfo, setPublicUserInfoIsLoading } from "components/account/accountSlice";
import { Platform } from "react-native";
import { useEffect } from "react";
import { axio2 } from "client/axio/axios";


export default function UserInfoCard() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const {public_user_info_isloading, user, userinfop, public_user_id } = useAppSelector(state => state.account)
  
    useEffect(() => {

        if (public_user_id) {
            loadinfo()
        }

    }, [])


    const loadinfo = () => {

        console.log(public_user_id);

       dispatch (setPublicUserInfoIsLoading(true))
        //@ts-ignore
        axio2(user.user_token)
            .post("/info/" + public_user_id,
                {
                    user_id: public_user_id
                }, {})
            .then((response) => {

                let user = response.data;

                if (user) {
                    const userinfop = {
                        //required
                        user_id_: user.user_id,
                        firstname: user.first_name,
                        secondname: user.second_name,
                        lastname: user.last_name,
                        gender: user.gender,
                        age: user.age,
                        nationality: user.nationality,
                        national_id: user.national_id,
                        tin: user.tin_number,
                        contactp: user.phone_number,

                        //optional
                        religion: user.religion,
                        has_family: user.has_family,
                        family_member: user.family_member,
                        earning: user.earning,

                        country: user.country,
                        region: user.region,
                        district: user.district,
                        count: user.count,
                        ward: user.ward,
                        places: user.street,

                        acname: user.acname,
                        acnumber: user.acnumber,
                    }

                    dispatch(setUserPublicProfileInfo(userinfop))
                }
                dispatch (setPublicUserInfoIsLoading(false))
                console.log(user);
                console.log(
                    "--------------------------items--is--running-------------------------------------"
                );
            })
            .catch((error) => {
              dispatch (setPublicUserInfoIsLoading(false))
                console.log(error);
                console.log(
                    "--------------------------items error is running-------------------------------------"
                );
            });
    }


    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                marginTop: width < 600 ? Platform.OS == 'web' ? 10 : undefined : 40,
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
                        onPress={
                            () => !user.user_token
                                ? dispatch(setProfilePhotoAlertDialogOpen(true))
                                : dispatch(setProfilePhotoEditDialogOpen(true))
                        }

                        size="$10">
                        <Avatar.Image
                            aria-label="Cam"
                            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                        />
                        <Avatar.Fallback bg="$blue10" />
                    </Avatar>
                    <YStack style={{ marginBottom: 10, marginTop: 10, marginLeft: 30 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfop.user_id_}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Full name"
                        icon={User2}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}

                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text style={{ display: ((userinfop.firstname !== undefined) && (userinfop.secondname !== undefined) && (userinfop.lastname !== undefined)) ? 'flex' : 'none' }} >{userinfop.firstname + " " + userinfop.secondname + " " + userinfop.lastname}</Text>
                        <Text></Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Gender and age"
                        icon={Baby}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}

                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$2"} width={"100%"} >
                        <Text style={{ display: ((userinfop.gender !== undefined) && (userinfop.age !== undefined)) ? 'flex' : 'none' }}>{userinfop.gender + ", " + userinfop.age}</Text>
                        <Text></Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Nationality"
                        icon={Flag}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfop.nationality}</Text>
                        <Text>{userinfop.national_id}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Tin"
                        icon={Barcode}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfop.tin}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Contacts"
                        icon={Contact}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfop.contactp}</Text>
                    </YStack>
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Address"
                        icon={Locate}
                        iconAfter={<YStack style={{ display: public_user_info_isloading ? 'flex' : 'none' }} p="$3" gap="$4" items="center">
                            <Spinner size="small" color="$green10" />
                        </YStack>}
                    />
                    <YStack style={{ marginLeft: 90 }} gap={"$1"} width={"100%"} >
                        <Text>{userinfop.country}</Text>
                        <Text>{userinfop.region}</Text>
                        <Text>{userinfop.district}</Text>
                        <Text>{userinfop.ward}</Text>
                        <Text>{userinfop.places}</Text>
                    </YStack>
                </YGroup.Item>
            </YGroup>
        </ScrollView>
    )
}