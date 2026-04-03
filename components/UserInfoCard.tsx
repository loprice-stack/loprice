import { Baby, ChevronRight, Moon, Plus, Star, User2 } from "@tamagui/lucide-icons-2";
import { Avatar, Image, ListItem, Separator, useWindowDimensions, YGroup } from "tamagui";
import Contents400_2 from "./Contents400_2";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import { setFullnameDialogOpen, setGenderAgeDialogOpen } from "app/account/accountSlice";

export default function UserInfoCard() {

    const { width, height } = useWindowDimensions();

    const dispatch = useAppDispatch();
    const userinfo = useAppSelector(state => state.account.userinfo)

    return (
        <Contents400_2>
            <Avatar self={'flex-start'} margin={20} onClick={() => alert("Profile")} circular size="$10">
                <Avatar.Image
                    aria-label="Cam"
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
                <Avatar.Fallback bg="$blue10" />
            </Avatar>
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
                        title="Full name"
                        subTitle="Loprice Limited"
                        icon={User2}
                        iconAfter={<Plus onPress={() => dispatch(setFullnameDialogOpen(true))}/>}
                        
                    />
                </YGroup.Item>
                <Separator />
                <YGroup.Item>
                    <ListItem
                        gap="$3"
                        title="Gender and age"
                        subTitle="Me, 4"
                        icon={Baby}
                        iconAfter={<Plus onPress={() => dispatch(setGenderAgeDialogOpen(true))}/>}
                
                    />
                </YGroup.Item>
            </YGroup>
        </Contents400_2>
    )
}