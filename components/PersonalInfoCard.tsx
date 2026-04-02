import { Badge, Barcode, Contact, Flag, Locate, Plus } from "@tamagui/lucide-icons-2";
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
                    subTitle="Tanzanian"
                    icon={Flag}
                    iconAfter={Plus}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Tin"
                    subTitle="157-752-049"
                    icon={Barcode}
                    iconAfter={Plus}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Contacts"
                    subTitle="+255746334493"
                    icon={Contact}
                    iconAfter={Plus}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Address"
                    subTitle="POBOX901"
                    icon={Locate}
                    iconAfter={Plus}
                />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    gap="$3"
                    title="Payments account"
                    subTitle="10204674674"
                    icon={Badge}
                    iconAfter={Plus}
                />
            </YGroup.Item>
            <Separator />
        </YGroup>
    )
}