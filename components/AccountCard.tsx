import { updateLoginStatus } from 'app/account/accountSlice';
import { Link } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import type { CardProps } from 'tamagui'
import { Text, Button, Card, H2, Paragraph, YStack, Form } from 'tamagui'

export default function AccountCard(props: CardProps) {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    return (
        <Card size="$4" borderWidth={1} borderColor="$borderColor" {...props}>
            <Card.Header items={'center'} p="$4">
                <H2>{user.token_type}</H2>
                <Paragraph>{user.user_id} </Paragraph>
            </Card.Header>

            <YStack items="center" gap="$6">
                {props.children}
            </YStack>
            <Card.Footer items={'center'} p="$2" gap={'$-11'}>
                <Button rounded="$10">
                    <Link
                        //@ts-ignore
                        href="/account/info">
                        <Text fontSize={14} >Info</Text>
                    </Link>
                </Button>

                <Button rounded="$10">
                    <Link
                        //@ts-ignore
                        href="/settings/settings">
                        <Text fontSize={14} >Settings</Text>
                    </Link>
                </Button>
                <Form
                    onSubmit={() => {
                        console.log('clicked');
                        dispatch(updateLoginStatus({
                            "user_token": undefined,
                            "user_jid": "response.data.user_id",
                            "email": "response.data.email",
                            "image_url": "response.data.image_url",
                            "user_type": "response.data.user_type",
                            "token_type": "response.data.token_type",
                            "access_level": "response.data.access_level"
                        }))
                    }}
                >
                    <Form.Trigger asChild >
                        <Button
                            rounded="$10">
                            <Text fontSize={14} >Logout</Text>
                        </Button>
                    </Form.Trigger>
                </Form>
            </Card.Footer>
        </Card >
    )
}