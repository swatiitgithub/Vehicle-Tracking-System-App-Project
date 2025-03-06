import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { axiosRequest } from '../../../utils/ApiRequest';
import Url from '../../../utils/Url';
import Constant from '../../../utils/Constant';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import { default as style } from "../styles/style"
import useThemedStyles from '../../../config/theme/hooks/useThemedStyles';
import useTheme from '../../../config/theme/hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Colors from '../../../utils/Colors';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import moment from 'moment';
import { Button, Checkbox } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SeatDetails: React.FC = ({ state }: any) => {
    const route: any = useRoute();
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false)
    const [bookingDetails, setBookingDetails] = useState<any>({})
    const theme = useTheme();
    const styles = useThemedStyles(style);
    const { lstRoomSeatRespDTO } = route.params;
    const room: any = route.params.room;
    const seat: any = route.params.seat;
    const { fromDate, toDate } = route.params;
    const { userData } = useSelector(
        (state: RootState) => state?.user,
    );

    useEffect(() => {
        getBookingDetails();
    }, []);


    const getBookingDetails = async () => {
        try {
            const params = {
                candidateID: userData?.verifiedUser?.userID,
                bookingBillID: '-1',
                roomID: room?.roomID,
                seatID: seat?.seatID,
                slotID: seat?.slotID,
                rateTypeID: room?.lstRoomRateLinkRespDTO[0]?.rateTypeID,
                fromDate: fromDate,
                toDate: toDate,
                userID: userData?.verifiedUser?.userID,
                formID: -1,
                type: 2
            };
            setLoading(true);
            axiosRequest(Url.GET_BOOK_BILL, Constant.API_REQUEST_METHOD.POST, params).then(response => {
                setLoading(false)

                if (response?.data.isSuccess) {
                    const details = response?.data?.result;
                    setBookingDetails(details);
                    return;
                }
            })
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }
    };

    const Description = ({ title, value }: any) => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 4
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    {title}
                </Text>
                <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 18 }}>
                    {value}
                </Text>
            </View>
        )
    }

    const BillingDetails = () => {
        return (
            <View style={{ margin: 10 }}>

                <Description
                    title="Institute Name"
                    value={bookingDetails?.instituteName}
                />
                <Description
                    title="Room Name"
                    value={bookingDetails?.roomName}
                />
                <Description
                    title="Rate Type"
                    value={bookingDetails?.rateTypeName}
                />
                <Description
                    title="Room Type"
                    value={bookingDetails?.roomTypeName}
                />
                <Description
                    title="Seat No"
                    value={bookingDetails?.seatID}
                />
                <Description
                    title="Slot Name"
                    value={bookingDetails?.slotName}
                />
                <Description
                    title="From Date"
                    value={moment(bookingDetails?.fromDate).format("DD-MMM-YYYY")}
                />
                <Description
                    title="To Date"
                    value={moment(bookingDetails?.toDate).format("DD-MMM-YYYY")}
                />
                <Description
                    title="Gross Amount"
                    value={bookingDetails?.totGrossAmt}
                />
                <Description
                    title="Discount"
                    value={bookingDetails?.disCountAmt}
                />
                <Description
                    title="SGST"
                    value={bookingDetails?.sgstAmt}
                />
                <Description
                    title="CGST"
                    value={bookingDetails?.cgstAmt}
                />
                <Description
                    title="Net Amount"
                    value={bookingDetails?.totNetAmt}
                />

            </View>
        );
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    backgroundColor: Colors.newblue,
                    padding: 4,
                    flexDirection: 'row'
                }}>
                <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20 }} onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={22} color={'#000000'} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '800', color: '#000000' }}>
                            {room?.roomName}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>
                            {room?.roomTypeName}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>
                            {room?.lstRoomRateLinkRespDTO[0]?.rate}{' INR'}
                        </Text>
                    </View>
                </View>
            </View>
            {BillingDetails()}
            <Button
                style={styles.loginBtn}
                size="lg"
                isLoading={loading}
                onPress={() => {
                    navigation.navigate('Razorpay', bookingDetails)
                }}>
                Pay Now
            </Button>

        </View>
    );
};
export default SeatDetails;