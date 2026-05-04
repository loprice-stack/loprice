import {  useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import type { CardProps } from 'tamagui'
import { Text, Button, Card, Paragraph, YStack, Form, Image, H3, useWindowDimensions } from 'tamagui'

export default function ProfilePhotoCard(props: CardProps) {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    return (
        <Card width={width < 600 ? width -40 : 400} size="$4" borderWidth={1} borderColor="$borderColor" {...props}>
            <Card.Header items={'center'} p="$4">
                <Text fontSize={'$8'}>{user.user_type}</Text>
                <Paragraph>{user.user_id} </Paragraph>
            </Card.Header>
            <YStack items="center" gap="$6">
                <Image
                    src={user.image_url}
                    width={270}
                    height={400}
                    onLoad={() => { }}
                    onLayout={(e) => { }}

                />
            </YStack>
            <Card.Footer items={'center'} p="$2" gap={'$-11'}>
                <Button
                    onPress={
                        //@ts-ignore
                        () => router.navigate('/')}
                    rounded="$10">
                    <Text maxW={'100%'} fontSize={14} >Upload</Text>
                </Button>
            </Card.Footer>
        </Card >
    )
}