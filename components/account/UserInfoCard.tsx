import { Baby, ChevronRight, Moon, Plus, Star, User2 } from "@tamagui/lucide-icons-2";
import { Avatar, Image, ListItem, Separator, useWindowDimensions, YGroup } from "tamagui";
import Contents400_2 from "../Contents400_2";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import {  setProfilePhotoEditDialogOpen, setFullnameDialogOpen, setGenderAgeDialogOpen } from "app/account/accountSlice";


export default function UserInfoCard() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    return (
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
                        subTitle={user.user_id}
                        iconAfter={<Plus 
                            cursor="pointer"
                           onPress={() => dispatch(setProfilePhotoEditDialogOpen(true))} />}

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
                            onPress={() => dispatch(setProfilePhotoEditDialogOpen(true))}

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
                        iconAfter={<Plus  cursor="pointer" onPress={() => dispatch(setFullnameDialogOpen(true))} />}

                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Gender and age"
                        subTitle="Me, 4"
                        icon={Baby}
                        iconAfter={<Plus  cursor="pointer" onPress={() => dispatch(setGenderAgeDialogOpen(true))} />}

                    />
                </YGroup.Item>
            </YGroup>
        </Contents400_2>
    )
}