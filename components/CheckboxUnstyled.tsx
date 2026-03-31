import { Check } from "@tamagui/lucide-icons-2";
import { Checkbox, Label, XStack, YStack } from "tamagui";

export function CheckboxUnstyled() {
    return (
        <YStack items="center" gap="$3">
            <XStack gap="$3" items="center">
                <Checkbox defaultChecked id="1">
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="unstyled">Furnished</Label>
                <Checkbox defaultChecked id="1">
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="unstyled">Fence</Label>
                

            </XStack>

            <XStack gap="$3" items="center">
                <Checkbox defaultChecked id="1">
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="unstyled">Water</Label>
                <Checkbox defaultChecked id="1">
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="unstyled">Individual electricity</Label>

            </XStack>

                        <XStack gap="$3" items="center">
        
                <Checkbox defaultChecked id="1">
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="unstyled">Parking</Label>

            </XStack>

        </YStack>
    )
}