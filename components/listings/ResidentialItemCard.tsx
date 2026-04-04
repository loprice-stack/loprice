import { updateLoginStatus } from 'app/account/accountSlice';
import { Link, useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import type { CardProps } from 'tamagui'
import { Text, Button, Card, H2, Paragraph, YStack, Form, Image, H3 } from 'tamagui'

export default function ResidentialItemCard(props: CardProps) {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    return (
        <Card size="$4" borderWidth={1} borderColor="$borderColor" {...props}>
            <Card.Header items={'center'} p="$4">
                <Text fontSize={'$8'}>{"Kijichi, Mtoni kijichi"}</Text>
                <Text fontSize={'$4'}>{"500,000/-"} </Text>
            </Card.Header>
            <YStack width={250} items="center" gap="$6">
                <Image
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                    width={250}
                    height={300}
                    onLoad={() => { }}
                    onLayout={(e) => { }}
                    onPress={() => {console.log('details clicked');}}
                />
                <Text fontSize={'$4'}>{"Temeke"} </Text>
            </YStack>
            <Card.Footer items={'center'} p="$2" gap={'$-11'}>
                <Button
                    onPress={
                        () =>{console.log('call clicked');}}
                    rounded="$10">
                    <Text maxW={'100%'} fontSize={14} >Call</Text>
                </Button>
                <Button
                    onPress={
                        () =>{console.log('stream clicked');}}
                    rounded="$10">
                    <Button.Text fontSize={14} >Streams</Button.Text>
                </Button>
                <Form
                    onSubmit={() => {
                        console.log('rent clicked');
      
                    }}
                >
                    <Form.Trigger asChild >
                        <Button
                            rounded="$10">
                            <Text fontSize={14} >Payments</Text>
                        </Button>
                    </Form.Trigger>
                </Form>
            </Card.Footer>
        </Card >
    )
}