import { Platform } from 'react-native';
import { useWindowDimensions, YStack } from 'tamagui'



export default function Contents400({ children }: { children: React.ReactNode }) {

    const { width, height } = useWindowDimensions();
    const currentOS = Platform.OS; // 'ios' or 'android'
    return (
        <YStack
            flex={1}
            //flexWrap="wrap"
            justify={'center'}
            self={'center'}
            items={'center'}
            width={width < 600 ? width - 20 : 400}
            height={width < 600 ? width / 3 : height}
        >
            {children}
        </YStack>
    )
}
