import { X } from '@tamagui/lucide-icons-2'
import { axio2 } from 'client/axio/axios';
import { setContactPDialogOpen, updateContactP } from 'components/account/accountSlice';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import {
    Adapt,
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    Sheet,
    Unspaced,
    XStack,
} from 'tamagui'



export function ContactsEditDialog() {

    const dispatch = useAppDispatch();
    const {user_id,  user_token } = useAppSelector(state => state.account.user)
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
                dispatch(setContactPDialogOpen(false))
            })
            .catch((error) => {
                console.log(error);
                dispatch(setContactPDialogOpen(false))
                console.log(
                    "--------------------------items error is running-------------------------------------"
                );
            });
    }


    return (
        <Dialog
            modal
            open={contactp_d_open}
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
                        <Dialog.Title>Edit phone conctat</Dialog.Title>
                        <Dialog.Description>
                            Make changes to your phone contact. Click save when you're done.
                        </Dialog.Description>
                        <Fieldset gap="$4" horizontal>
                            <Label width={100} htmlFor="fname">
                                Phone
                            </Label>
                            <Input placeholder={contactp} onChangeText={(text) => dispatch(updateContactP(text))} flex={1} id="fname" />
                        </Fieldset>
                        <XStack self="flex-end" gap="$4">
                            <Button
                                onPress={update}
                               theme='green_accent'aria-label="Close">
                                Save changes
                            </Button>
                        </XStack>
                        <Unspaced>
                            <Button onPress={() => dispatch(setContactPDialogOpen(false))} position="absolute" r="$3" size="$2" circular icon={X} />
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    )
}