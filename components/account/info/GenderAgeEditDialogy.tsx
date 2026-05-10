import { Check, ChevronDown, X } from '@tamagui/lucide-icons-2'
import { axio2 } from 'client/axio/axios';
import { setGenderAgeDialogOpen, updateAge, updateGender } from 'components/account/accountSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import {
    Adapt,
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    Select,
    Sheet,
    Unspaced,
    useWindowDimensions,
    XStack,
    YStack,
} from 'tamagui'


export function GenderAgeEditDialogy() {

    const [genderr, setGender] = React.useState([{ value: "male" }, { value: "female" }])
    const dispatch = useAppDispatch();
    const { width, height } = useWindowDimensions();

    const { user_id, user_token } = useAppSelector(state => state.account.user)
    const {
        //full name
        firstname,
        secondname,
        lastname,
        fullname_d_open,
        //gender and age
        gender,
        age,
        genderage_d_open,
        //nationality
        nationality,
        national_id,
        nationality_d_open,
        //tin
        tin,
        tin_d_open,
        //contactp
        contactp,
        contactp_d_open,
        //address
        address,
        address_d_open,
        //payments
        acname,
        acnumber,
        paymentacc_d_open,
        //optional
        religion,
        has_family,
        family_member,
        earning,
        country,
        region,
        district,
        count,
        ward,
        places

    } = useAppSelector(state => state.account.userinfo)

    const update = async () => {

        //@ts-ignore
        axio2(user_token)
            .post("/update/info/columns/",
                {
                    user_id: user_id,
                    //full name
                    first_name: firstname,
                    second_name: secondname,
                    last_name: lastname,
                    //gender and age
                    gender: gender,
                    age: age,
                    //nationality
                    nationality: nationality,
                    national_id: national_id,
                    //tin
                    tin_number: tin,

                    //contactp
                    phone_number: contactp,

                    //payments
                    //acname: "LOPRICE LIMITED",
                    //acnumber: "302010432",

                    //optional
                    religion: religion,
                    has_family: has_family,
                    family_member: family_member,
                    earning: "",

                    country: country,
                    region: region,
                    district: district,
                    count: count,
                    ward: ward,
                    street: places, //street changed to places
                }, {})
            .then((response) => {

                const message: any = response.data.message;
                if (message) {
                    if (message.includes("User created successfully")) {

                    } else {

                    }
                }
                console.log(response.data);
                dispatch(setGenderAgeDialogOpen(false))
            })
            .catch((error) => {
                console.log(error);
                dispatch(setGenderAgeDialogOpen(false))
                console.log(
                    "--------------------------items error is running-------------------------------------"
                );
            });
    }



    return (
        <Dialog
            modal
            open={genderage_d_open}
            onOpenChange={undefined}
        >
            <Adapt
                //@ts-ignore
                when="maxMd" platform="touch">
                <Sheet
                    //@ts-ignore
                    transition="medium"
                    zIndex={200000}
                    modal
                    dismissOnSnapToBottom
                    unmountChildrenWhenHidden
                >
                    <Sheet.Frame p="$4" gap="$4">
                        <Adapt.Contents />
                    </Sheet.Frame>
                    <Sheet.Overlay
                        bg="$background"
                        opacity={0.5}
                        //@ts-ignore
                        transition="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>


            <Dialog.Portal>
                <Dialog.Overlay
                    bg="$background"
                    opacity={0.5}
                    animateOnly={['transform', 'opacity']}
                    transition={[
                        //@ts-ignore
                        'quicker',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Dialog.FocusScope focusOnIdle>
                    <Dialog.Content
                        transition={[
                            //@ts-ignore
                            'quicker',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: 20, opacity: 0 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        gap="$4"
                    >
                        <Dialog.Title>Edit gender and age</Dialog.Title>
                        <Dialog.Description>
                            Make changes to your gender and age. Click save when you're done.
                        </Dialog.Description>

                        <Fieldset gap="$4" horizontal>
                            <XStack width="100%" items="center" gap="$4">
                                <Label width={100} htmlFor="name">
                                    Gender
                                </Label>
                                <Select

                                    value={gender}
                                    onValueChange={(text) => { dispatch(updateGender(text)) }}
                                >
                                    <Select.Trigger
                                        maxWidth={width < 600 ? 100 : 190}
                                        iconAfter={ChevronDown}
                                        borderRadius="$4"
                                        backgroundColor="$background"
                                    >
                                        <Select.Value placeholder="Gender" />
                                    </Select.Trigger>
                                    <Adapt
                                        //@ts-ignore
                                        when="maxMd"
                                        platform="touch">

                                        <Sheet
                                            native={true}
                                            modal
                                            dismissOnSnapToBottom
                                            //@ts-ignore
                                            transition="medium">
                                            <Sheet.Frame>
                                                <Sheet.ScrollView>
                                                    <Adapt.Contents />
                                                </Sheet.ScrollView>
                                            </Sheet.Frame>
                                            <Sheet.Overlay
                                                bg="$shadowColor"
                                                //@ts-ignore
                                                transition="lazy"
                                                enterStyle={{ opacity: 0 }}
                                                exitStyle={{ opacity: 0 }}
                                            />
                                        </Sheet>
                                    </Adapt>
                                    <Select.Content>
                                        <Select.Viewport
                                            minW={width < 600 ? 100 : 190}
                                            bg="$background"
                                            rounded="$4"
                                            borderWidth={1}
                                            borderColor="$borderColor"
                                        >
                                            <Select.Group>
                                                <Select.Label fontWeight="700">Gender</Select.Label>
                                                {/* for longer lists memoizing these is useful */}
                                                {React.useMemo(
                                                    () =>
                                                        genderr.map((item, i) => {
                                                            return (
                                                                <Select.Item
                                                                    index={i}
                                                                    key={item.value}
                                                                    value={item.value}
                                                                >
                                                                    <Select.ItemText>{item.value}</Select.ItemText>
                                                                    <Select.ItemIndicator marginLeft="auto">
                                                                        <Check size={16} />
                                                                    </Select.ItemIndicator>
                                                                </Select.Item>
                                                            )
                                                        }),
                                                    [gender]
                                                )}
                                            </Select.Group>
                                            {/* Native gets an extra icon */}
                                            <YStack
                                                position="absolute"
                                                r={0}
                                                t={16}
                                                items="center"
                                                justify="center"
                                                width={'$4'}
                                                pointerEvents="none"
                                            >
                                                <ChevronDown
                                                    size={'$11'}
                                                />
                                            </YStack>
                                        </Select.Viewport>


                                    </Select.Content>
                                </Select>
                            </XStack>
                        </Fieldset>

                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="name">
                                Age
                            </Label>
                            <Input
                                //@ts-ignore
                                placeholder={age}
                                keyboardType="numeric"    // For Native
                                inputMode="numeric"      // For Web
                                flex={1}
                                onChangeText={(text) => dispatch(updateAge(text))}
                            />
                        </Fieldset>
                        <XStack self="flex-end" gap="$4">
                            <Button
                                onPress={update}
                                theme="green_accent" aria-label="Close">
                                Save changes
                            </Button>
                        </XStack>
                        <Unspaced>
                            <Button onPress={() => dispatch(setGenderAgeDialogOpen(false))} position="absolute" r="$3" size="$2" circular icon={X} />
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    )
}