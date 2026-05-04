import { Badge, Barcode, Contact, Flag, Locate, Plus } from "@tamagui/lucide-icons-2";
import { setAddressDialogOpen, setContactPDialogOpen, setFullnameDialogOpen, setNationalityDialogOpen, setPaymentsAccountDialogOpen, setTinDialogOpen } from "components/account/info/accountSlice";
import { useAppDispatch, useAppSelector } from "store/redux/store";
import { ListItem, Separator, useWindowDimensions, YGroup } from "tamagui";

export default function UserInfoCard2() {

    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { user, enable_editing } = useAppSelector(state => state.account)

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
                    title="View live streams"
                    subTitle="View our home or ofice"
                    icon={Flag}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setNationalityDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>

                <ListItem
                    gap="$3"
                    title="Product and services"
                    subTitle="View our listings"
                    icon={Flag}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setNationalityDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>

                <ListItem
                    gap="$3"
                    title="Subscription"
                    subTitle="Subscribe to direct call, message and emails"
                    icon={Flag}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setNationalityDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Call"
                    subTitle="Video and audio call"
                    icon={Barcode}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setTinDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Message"
                    subTitle="Chat with me right now"
                    icon={Contact}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setContactPDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Email"
                    subTitle="Write email to me"
                    icon={Locate}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setAddressDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Payments"
                    subTitle="Make payments to me"
                    icon={Badge}
                    iconAfter={<Plus
                        display={enable_editing ? 'flex' : 'none'}
                        cursor="pointer"
                        onPress={() => dispatch(setPaymentsAccountDialogOpen(true))} />}
                />
            </YGroup.Item>
            <Separator />
        </YGroup>
    )
}