import { ReactElement } from 'react'
import { ScrollView, Text, useWindowDimensions, View, XStack, YStack } from 'tamagui'



export default function Contents800_2({ children }: { children: React.ReactNode }) {

    const { width, height } = useWindowDimensions();

    return (

        <XStack
            flex={1}
            background="#fff"
            width={width < 600 ? width : 800}
            // media query
            gap={2}
        >
            <ScrollView
                flex={1}
                showsVerticalScrollIndicator={false}
                background="#fff"
                width={width < 600 ? width  : 800}
            >
                {children}
            </ScrollView>
        </XStack>
    )
}

