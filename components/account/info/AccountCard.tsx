import {  updateUserToken } from 'components/account/accountSlice';
import { useRouter } from 'expo-router'
import { _message, _session, _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store';
import type { CardProps } from 'tamagui'
import { Text, Button, Card, H2, Paragraph, YStack, Form } from 'tamagui'
import { stopLopriceServices } from 'client/janus/janus';
import { useContext } from 'react';
import { setSettingsType } from 'components/settings/settingsSlice';
import { SETTINGS_TYPE_ACCOUNT } from 'utils/constants';

export default function AccountCard(props: CardProps) {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const { user_id, user_type } = useAppSelector(state => state.account.user)
    const sessionContext = useContext(_session)
    const videoCallContext = useContext(_videohandle)
    const messageContext = useContext(_message)


    return (

        <Card size="$4" borderWidth={1} borderColor="$borderColor" {...props}>
            <Card.Header items={'center'} p="$4">
                <H2>{user_type}</H2>
                <Paragraph>{user_id} </Paragraph>
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
                    onPress={() => {
                        dispatch(setSettingsType(SETTINGS_TYPE_ACCOUNT))
                        router.navigate('/settings/account')}}
                    rounded="$10">
                    <Button.Text fontSize={14} >Settings</Button.Text>
                </Button>
                <Form
                    onSubmit={async () => {

                        dispatch(updateUserToken(undefined))

                        stopLopriceServices(sessionContext, videoCallContext, messageContext)
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