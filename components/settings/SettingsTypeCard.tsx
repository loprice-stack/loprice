import {
    LayoutList,
    MessagesSquare,
    Settings,
    TvMinimalPlay,
    UserRoundCog,
    Video
} from '@tamagui/lucide-icons-2'
import { useRouter } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { _message, useAppDispatch } from 'store/redux/store'
import {
    Separator,
    useWindowDimensions,
    YGroup,
    ListItem,
} from 'tamagui'
import { setSettingsType } from './settingsSlice'
import {
    SETTINGS_TYPE_ACCOUNT,
    SETTINGS_TYPE_CALLS,
    SETTINGS_TYPE_CHAT,
    SETTINGS_TYPE_GENERAL,
    SETTINGS_TYPE_INMAIL,
    SETTINGS_TYPE_LISTINGS,
    SETTINGS_TYPE_STREAMS
} from 'utils/constants'

const demos = ['horizontal', 'vertical'] as const
const demosTitle: Record<(typeof demos)[number], string> = {
    horizontal: 'Horizontal',
    vertical: 'Vertical',
}


export default function SettingsHome() {
    const router = useRouter()
    const { width, height } = useWindowDimensions();
    const [demoIndex, setDemoIndex] = React.useState(0)
    const demo = demos[demoIndex]
    const dispatch = useAppDispatch();


    return (
        <YGroup
            style={{ marginTop: Platform.OS == 'web' ? 2 : 20 }}
            justify={'center'}
            items={'center'}
            borderWidth={1}
            borderColor="$borderColor"
            rounded="$2"
            width={width < 600 ? width - 2 : 400}
            size="$20"
        >
            <YGroup.Item>
                <ListItem
                    onPress={() => {
                        //@ts-ignore
                        width < 600 ? router.navigate('/settings/general') : dispatch(setSettingsType(SETTINGS_TYPE_GENERAL))
                    }}
                    gap="$3"
                    cursor="pointer"
                    title="General"
                    icon={Settings} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    onPress={() => {
                        //@ts-ignore
                        width < 600 ? router.navigate('/settings/listings') : dispatch(setSettingsType(SETTINGS_TYPE_LISTINGS))
                    }}
                    gap="$3"
                    cursor="pointer"
                    title="Listings"
                    icon={LayoutList} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    onPress={() => {
                        //@ts-ignore
                        width < 600 ? router.navigate('/settings/streams') : dispatch(setSettingsType(SETTINGS_TYPE_STREAMS))
                    }}
                    gap="$3"
                    cursor="pointer"
                    title="Streams"
                    icon={TvMinimalPlay} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    onPress={() => {
                        //@ts-ignore
                        width < 600 ? router.navigate('/settings/calls') : dispatch(setSettingsType(SETTINGS_TYPE_CALLS))
                    }}
                    gap="$3"
                    cursor="pointer"
                    title="Calls"
                    icon={Video} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    onPress={() => {
                        //@ts-ignore
                        width < 600 ? router.navigate('/settings/chat') : dispatch(setSettingsType(SETTINGS_TYPE_CHAT))
                    }}
                    gap="$3"
                    cursor="pointer"
                    title="Chat"
                    icon={MessagesSquare} />
            </YGroup.Item>
            <Separator />
            <YGroup.Item>
                <ListItem
                    onPress={() => {
                        //@ts-ignore
                        width < 600 ? router.navigate('/settings/account') : dispatch(setSettingsType(SETTINGS_TYPE_ACCOUNT))
                    }}
                    gap="$4"
                    cursor="pointer"
                    title="Account"
                    icon={UserRoundCog} />
            </YGroup.Item>

        </YGroup>
    )
}
