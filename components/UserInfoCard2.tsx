import { Badge, Barcode, Contact, Flag, Locate, Plus } from "@tamagui/lucide-icons-2";
import { setAddressDialogOpen, setContactPDialogOpen, setFullnameDialogOpen, setNationalityDialogOpen, setPaymentsAccountDialogOpen, setTinDialogOpen } from "app/account/accountSlice";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import { ListItem, Separator, useWindowDimensions, YGroup } from "tamagui";

export default function UserInfoCard2() {

    const { width, height } = useWindowDimensions();
        const dispatch = useAppDispatch();
        const userinfo = useAppSelector(state => state.account.userinfo)
    

    return (
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
                    title="Nationality"
                    subTitle="Tanzanian"
                    icon={Flag}
                    iconAfter={<Plus onPress={() => dispatch(setNationalityDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Tin"
                    subTitle="157-752-049"
                    icon={Barcode}
                    iconAfter={<Plus onPress={() => dispatch(setTinDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Contacts"
                    subTitle="+255746334493"
                    icon={Contact}
                    iconAfter={<Plus onPress={() => dispatch(setContactPDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Address"
                    subTitle="POBOX901"
                    icon={Locate}
                    iconAfter={<Plus onPress={() => dispatch(setAddressDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Payments account"
                    subTitle="10204674674"
                    icon={Badge}
                    iconAfter={<Plus onPress={() => dispatch(setPaymentsAccountDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
        </YGroup>
    )
}