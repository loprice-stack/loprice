import type { CardProps } from 'tamagui'
import { Avatar, Button, Card, H2, Image, Paragraph, Theme, XStack, YStack } from 'tamagui'

export default function AccountCard(props: CardProps) {
    return (
        <Card size="$4" borderWidth={1} borderColor="$borderColor" {...props}>
            <Card.Header items={'center'} p="$4">

                <H2>{
                    //@ts-ignore
                    props.username
                }</H2>
                <Paragraph>
                    {
                        //@ts-ignore
                        props.userid
                    }
                </Paragraph>
            </Card.Header>

            <YStack items="center" gap="$6">
                {props.children}
            </YStack>
            <Card.Footer items={'center'} p="$2" gap={'$-11'}>
                <Button onClick={
                    //@ts-ignore
                    props.gotoaccountinfo
                } rounded="$10">Account info</Button>
                <Button onClick={
                    //@ts-ignore
                    props.gotoaccountsettings
                } rounded="$10">Settings</Button>
            </Card.Footer>
        </Card>
    )
}