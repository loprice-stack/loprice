import { updateLoginStatus } from 'app/account/accountSlice';
import { Link, useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import type { CardProps } from 'tamagui'
import { Text, Button, Card, H2, Paragraph, YStack, Form } from 'tamagui'
import { ProfilePhotoShowAlertDialog } from './ProfilePhotoShowAlertDialog';

export default function AccountCard(props: CardProps) {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    return (
    
        <Card size="$4" borderWidth={1} borderColor="$borderColor" {...props}>
            <Card.Header items={'center'} p="$4">
                <H2>{user.user_type}</H2>
                <Paragraph>{user.user_id} </Paragraph>
            </Card.Header>
            <YStack items="center" gap="$6">
                {props.children}
            </YStack>
            <Card.Footer items={'center'} p="$2" gap={'$-11'}>
                <Button
                    onPress={() => router.navigate('/account/info')}
                    rounded="$10">
                    <Text maxW={'100%'} fontSize={14} >Info</Text>
                </Button>
                <Button
                    onPress={() => router.navigate('/settings/settings')}
                    rounded="$10">
                    <Button.Text fontSize={14} >Settings</Button.Text>
                </Button>
                <Form
                    onSubmit={() => {
                        console.log('clicked');
                        dispatch(updateLoginStatus({
                            "user_token": undefined,
                            "user_id": "loprice@loprice.co.tz",
                            "email": "loprice@loprice.co.tz",
                            "image_url": "",
                            "user_type": "owner",
                            "token_type": "bearer",
                            "access_level": 1
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