import { Badge, Barcode, Contact, Flag, Locate } from "@tamagui/lucide-icons-2";
import { ListItem, Separator, useWindowDimensions, YGroup } from "tamagui";

export default function PersonalInfoCard() {

    const { width, height } = useWindowDimensions();

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
                    subTitle="Subtitle"
                    icon={Flag}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Tin"
                    subTitle="Subtitle"
                    icon={Barcode}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Contacts"
                    subTitle="Subtitle"
                    icon={Contact}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Address"
                    subTitle="Subtitle"
                    icon={Locate}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Payments account"
                    subTitle="Subtitle"
                    icon={Badge}
                />
            </YGroup.Item>
            <Separator />
        </YGroup>
    )
}