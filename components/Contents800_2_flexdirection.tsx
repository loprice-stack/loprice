import { ReactElement } from 'react'
import { Text, useWindowDimensions, View, XStack, YStack } from 'tamagui'



export default function Contents800_2_flexdirection({ children }: { children: React.ReactNode }) {

    const { width, height } = useWindowDimensions();

    return (

        <XStack
            flex={1}
            flexDirection={width < 600 ? 'column' : 'row'}
            self='center'
        
            width={width < 600 ? width : 800}
            background={'#fff'}
            // media query
           
        >
            {children}
        </XStack>
    )
}

