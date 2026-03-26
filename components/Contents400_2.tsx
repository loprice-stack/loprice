import { ReactElement } from 'react'
import { Platform } from 'react-native';
import { Text, useWindowDimensions, View, XStack, YStack } from 'tamagui'



export default function Contents400_2({ children }: { children: React.ReactNode }) {

    const { width, height } = useWindowDimensions();
    const currentOS = Platform.OS; // 'ios' or 'android'
    return (

        <YStack
            justify={'center'}
            self={'center'}
            items={'center'}
            width={width < 600 ? width - 20 : 400}
            height={width < 600 ? height / 4 : height}
        >
            {children}
        </YStack>
    )
}
