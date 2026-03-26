import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Animated, View } from "react-native";
import { ScrollView, useWindowDimensions, XStack } from 'tamagui';


export default function ListingTabbar({ state, descriptors, navigation, position }) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const { width, height } = useWindowDimensions();
    return (


        <View style={{  flexDirection: 'row' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack

                    flexWrap="wrap"
                    flexDirection={'row'}
                    self='center'

                    background="#fff"
                    width={width < 600 ? undefined : 800}

                    // media query
                    gap={2}
                >

                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        const inputRange = state.routes.map((_, i) => i);
                        const opacity = position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
                        });

                        return (
                            <PlatformPressable
                                key={route.key}
                                href={buildHref(route.name, route.params)}
                                aria-label={options.tabBarAccessibilityLabel}
                                aria-selected={isFocused}
                                testID={options.tabBarButtonTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#fff' }}

                            >
                                <Animated.Text style={{ opacity, color: colors.text }}>
                                    {label}
                                </Animated.Text>
                            </PlatformPressable>
                        );
                    })}

                </XStack>
            </ScrollView>
        </View>
    );
}

