import React, { useEffect, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { BottomSection, Container, Line } from './../components/widgets/BottomModel/styledComponents';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../utils/Responsive';
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { color } from 'react-native-reanimated';
import useThemedStyles from '../config/theme/hooks/useThemedStyles';
import useTheme from '../config/theme/hooks/useTheme';
import Constant from '../utils/Constant';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../utils/Colors';
import { Rating } from 'react-native-ratings';
import { RadioButton } from 'react-native-paper';
import { Select, Slider } from 'native-base';
import { axiosRequest } from '../utils/ApiRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Formik } from 'formik';
import CustomDatePicker from './widgets/CustomDatePicker';
import moment from 'moment';
import Images from '../utils/Images';
import DateRangePicker from "rnv-date-range-picker";
import CustomDropDown from './widgets/CustomDropDown';
import CustomInputText from './widgets/CustomInputText';
import { ScrollView } from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


const FilterOption = (props: any) => {


    const styles = useThemedStyles(style);
    const [visible, setVisible] = useState(false);
    var [removeState, setRemoveState] = useState(1);
    const [open, setOpen] = useState<any>('checked');
    const [close, setClose] = useState(false);
    const [options, setOptions] = useState(1);
    var [selectedOptions, setSelectedOptions] = useState<any>([]);
    var [filterOptions, setfilterOptions] = useState<any>([]);
    var [allOptions, setAllOptions] = useState<any>([]);
    var [items, setItems] = useState<any>([]);
    const [roomType, setRoomType] = useState<any>([])
    const [slot, setSlot] = useState<any>([])
    const [selectedRoomType, setSelectedRoomType] = useState<any>(1)
    const { userData } = useSelector(
        (state: RootState) => state.user,
    );
    const [roomCapacityTo, setRoomCapacityTo] = useState<any>("1000")
    const [roomCapacityFrom, setRoomCapacityFrom] = useState<any>("0")
    const [roomRateTo, setRoomRateTo] = useState<any>("5000")
    const [roomRateFrom, setRoomRateFrom] = useState<any>("0")
    const [openToDate, setOpenToDate] = useState<boolean>(false)
    const [fromDate, setFromDate] = useState<any>("2000 09 29")
    const [toDate, setToDate] = useState<any>(new Date());
    const [selectedRange, setRange] = useState({});
    // const [onDrop, setOndrop] = useState(false);
    const makeFilterModalVisible = () => {
        // setSelectedOptions([])
        setVisible(!visible)
    }
    const makeDateModalVisible = () => {
        setOpenToDate(!openToDate)
    }
    useEffect(() => {
        getRoomType();
        getSlot();
        // console.log(selectedRoomType)
        // console.log(openToDate)
    }, [])
    const getRoomType = async () => {
        axiosRequest('/Room/GetRoomType?RoomTypeID=-1&IsActive=1&UserID=-1&FormID=-1&Type=1', Constant.API_REQUEST_METHOD.POST, "",  ).then(res => {
            // console.log(res.data)
            // setRoomType(res?.data)
            if (res?.data?.length > 0) {
                const dataMaskForDropdown = res?.data.map((item: any) => {
                    return ({ name: item.roomTypeName, value: item.roomTypeID })
                })
                setRoomType(dataMaskForDropdown)
            }
        })

    }
    const getSlot = async () => {
        axiosRequest('/Common/GetSlot', Constant.API_REQUEST_METHOD.GET).then(res => {
            const { data } = res.data
            // console.log(data)
            if (data?.length > 0) {
                const dataMaskForDropdown = data.map((item: any) => {
                    return ({ name: `${item.slotName}:-${item.slotFromTime} to ${item.slotToTime}`, value: item.slotID })
                })
                setSlot(dataMaskForDropdown)
            }
        }).catch(error => {
            console.log(error)
        })

    }
    const clearFilter = () => {
        var items = {
            roomCapacityTo: "1000",
            roomRateTo: "9999",
            roomTypeID: "-1",
            fromDate: "2000-09-29T07:22:52.579Z",
            toDate: new Date(),
            slotID: "-1",
            roomRateFrom:"0",
            roomCapacityfrom:"0"
        };
        props.onChange(items)
        setVisible(!visible)
    }
    const removeItem = (removeItem: any) => {
        const index = selectedOptions.indexOf(removeItem);
        if (index > -1) {
            selectedOptions.splice(index, 1);
            filterOptions.splice(index, 1);
            setRemoveState(--removeState)
        }
    }

    const [value,setValue]=useState({values: [0,5000],})

    return (
        <>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: hp('4'),
                    borderWidth: 0.1,
                    borderRadius: 50,
                    padding: 8,
                    alignItems: 'center',
                    right: wp('5'),
                    backgroundColor: '#f21847',
                    zIndex: 2000
                }}
                onPress={() => makeFilterModalVisible()}>
                <AntDesign name="filter" size={28} color={'white'} />
            </TouchableOpacity>
            <Modal
                style={{ justifyContent: 'flex-end' }}
                isVisible={visible}
                onBackButtonPress={() => makeFilterModalVisible()}
            // onBackdropPress={() => makeFilterModalVisible()}
            >



                <Formik
                    // validationSchema={validation}
                    initialValues={{
                        roomRateTo: "9999",
                        roomCapacityTo: "1000",
                        roomTypeID: "1",
                        fromDate: "2000-09-29T07:22:52.579Z",
                        toDate: new Date(),
                        slotID: "-1",
                        roomRateFrom:"0",
                        roomCapacityfrom:"0",
                    }}
                    // enableReinitialize={true}
                    onSubmit={async values => {
                        console.log(values)
                        props.onChange(values)
                        setVisible(!visible)
                        // submitFilter(values);
                    }}
                >

                    {({ handleChange, handleSubmit, values, errors }) => (
                        <ScrollView style={styles.item}>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: hp('1'), right: wp('1') }}
                                onPress={() => makeFilterModalVisible()}>
                                <AntDesign name="close" size={28} color={'red'} />
                            </TouchableOpacity>
                            <Text style={styles.title}>{'Choose Filters'}</Text>

                            <TouchableOpacity
                                style={{}}
                                onPress={() => makeDateModalVisible()}>
                                <TextInput
                                    style={{ borderWidth: 1, borderRadius: 4, paddingVertical: 5 }}
                                    editable={false}
                                    placeholder={'Please Select Date'}
                                    value={`${moment(fromDate).format("DD-MMM-YYYY")} to ${moment(toDate).format("DD-MMM-YYYY")}`}
                                // onChangeText={(value: any) => {
                                //     handleChange('firstName')(value);
                                // }}
                                />
                            </TouchableOpacity>
                            {openToDate && <DateRangePicker
                                onSelectDateRange={(range: any) => {
                                    setRange(range);
                                    handleChange('fromDate')(range.firstDate);
                                    handleChange('toDate')(range?.secondDate);
                                    setToDate(range.secondDate)
                                    setFromDate(range.firstDate)
                                    console.log(range, "fromDate"+fromDate, toDate)
                                    makeDateModalVisible()
                                }}
                                responseFormat="YYYY-MM-DD"
                                maxDate={moment()}
                            // minDate={moment().subtract(100, "days")}
                            />}

                            <View style={[styles.row, { zIndex: 100 }]}>
                                <Text style={[styles.subtitle, { color: Colors.primary }]}>Room Rate</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{ textAlign: 'right' }}>{roomRateFrom}</Text>
                            <Text style={{ textAlign: 'right' }}>{roomRateTo}</Text>
                            </View>
                            
                            <MultiSlider
                                values={[value.values[0], value.values[1]]}
                                selectedStyle={{ backgroundColor: '#CD5808', }}
                                containerStyle={{ alignSelf: 'center', marginTop: -10 }}
                                onValuesChangeFinish={(value)=>{ 
                                    value && handleChange('roomRateFrom')(value[0].toString());
                                    handleChange('roomRateTo')(value[1].toString());
                                    setRoomRateTo(value[1])
                                    setRoomRateFrom(value[0])}}
                                min={0}
                                max={5000}
                                step={1}
                            />
                            
                            <View style={styles.row}>
                                <Text style={[styles.subtitle, { color: Colors.primary }]}>Room Capacity</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{ textAlign: 'right' }}>{roomCapacityFrom}</Text>
                            <Text style={{ textAlign: 'right' }}>{roomCapacityTo}</Text>
                            </View>
                            <MultiSlider
                                values={[value.values[0], value.values[1]]}
                                selectedStyle={{ backgroundColor: '#CD5808', }}
                                containerStyle={{ alignSelf: 'center', marginTop: -10 }}
                                onValuesChangeFinish={(value)=>{ 
                                    value && handleChange('roomCapacityfrom')(value[0].toString());
                                    handleChange('roomCapacityTo')(value[1].toString());
                                    setRoomCapacityFrom(value[0])
                                    setRoomCapacityTo(value[1])}}
                                min={0}
                                max={1000}
                                step={1}
                            />
                            <View style={styles.row}>
                                <Text style={[styles.subtitle, { color: Colors.primary }]}>RoomType</Text>
                            </View>
                            {/* {roomType && roomType.map((item: any, index: number) => {
                                return (
                                    <View key={`key${index}`} style={styles.rowFilter}>
                                        <RadioButton.Group onValueChange={value => {
                                            setSelectedRoomType(value);
                                            handleChange('roomTypeID')(value.toString())
                                        }}
                                            value={selectedRoomType}>
                                            <RadioButton.Item style={{ flexDirection: 'row-reverse', paddingVertical: 0 }}
                                                label={item.roomTypeName} value={item.roomTypeID} />
                                        </RadioButton.Group>
                                    </View>
                                )
                            })} */}
                            {roomType && <CustomDropDown
                                label="RoomType"
                                placeholder={'Please Select RoomType'}
                                data={roomType}
                                error={errors['roomTypeID']}
                                onSelectItem={(value: any) => {
                                    handleChange('roomTypeID')(value.value.toString());
                                    console.log(value)
                                }}
                            />}
                            {slot && <CustomDropDown
                                label="Slot"
                                placeholder={'Please Select Slot'}
                                data={slot}
                                error={errors['slotID']}
                                onSelectItem={(value: any) => {
                                    handleChange('slotID')(value.value.toString());
                                    console.log(value)
                                }}
                            />}

                            <View style={{ flexDirection: 'row', marginVertical: 10, alignSelf: 'center' }}>
                                <TouchableOpacity style={[styles.buttonStyle]}
                                    onPress={() => clearFilter()}
                                >
                                    <Text style={styles.buttonText}>
                                        {'Clear'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttonStyle]}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.buttonText}>
                                        {'Apply'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    )}
                </Formik>
            </Modal>
        </>
    )
}
export default FilterOption;

const style = () => StyleSheet.create({

    buttonText: {
        alignSelf: 'center',
        textAlignVertical:'center',
        fontSize: 18,
        paddingHorizontal: 15,
        fontWeight: '700',
        color: 'white',
    },

    buttonStyle: {
        justifyContent:'center',
        padding:8,
        backgroundColor: '#3269a8',
        borderRadius: 8,
        marginHorizontal: wp('5'),
    },

    deskBox: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 10
    },
    listText: {
        fontSize: 18,
        paddingHorizontal: 10,
        fontWeight: '500',
        color: 'black',

    },
    item: {
        height: hp('40'),
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 15
    },
    title: {
        color: Colors.blue,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subtitle: {
        color: Colors.greygrey,
        fontWeight: '700',
        fontSize: 15,
    },
    category: {
        margin: 3,
        borderRadius: 15,
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: 'row', elevation: 5, backgroundColor: 'white'
    },
    rowFilter: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    line: {
        borderTopColor: 'black',
        borderTopWidth: 0.6,
        marginVertical: 2,
    },
})