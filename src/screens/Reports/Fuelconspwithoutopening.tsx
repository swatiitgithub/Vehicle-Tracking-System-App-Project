import moment from 'moment';
import { } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../utils/i18n';
import { hp, wp } from '../../utils/Responsive';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { axiosRequest } from '../../utils/ApiRequest';
import Url from '../../utils/Url';
import Constant from '../../utils/Constant';
import { useNavigation } from '@react-navigation/native';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import CheckBox from '@react-native-community/checkbox';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

export default function FuelConspwithoutopening() {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [openTo, setOpenTo] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [data, setData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [vehicleNumber, setVehicleNumber] = useState(["Select"]);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [options, setOptions] = useState([]);
  const [isFocus1, setIsFocus1] = useState<any>(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selDay, setSelDay] = useState(false);
  const [days, setDays] = useState(0);
  const [vNO, setVno] = useState([]);
  const [vType, setVType] = useState([]);
  const [dateTo, setDateTo] = useState(new Date());
  const [date2, setDate2] = useState<any>();
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    VehicleMovingTrackStatusdetnew(dateFrom,dateTo,isChecked,vNO,vType);
    fetchVehicleNumbers();
    fetchVehicleType();
    getPeriod();
  }, []);

  const getPeriod = () => {

    const apiUrl = 'http://103.12.1.132:8166/api/Period/GetPeriods?type=Period&daysOnly=false';


    axios
      .get(apiUrl)
      .then((res) => {

        console.log('API Response:', "res");


        if (res?.data) {
          const arr = res.data.map((item: any) => ({
            label: item?.displayLabel,
            value: item?.index,
            startDate: new Date(item?.startDate),
            endDate: new Date(item?.endDate),
            daysOnly: item?.daysOnly,
          }));




          setOptions(arr);
        }
      })
      .catch((error) => {

        console.error('Error fetching period data:', error);
      });
  };



  const fetchVehicleType = async () => {
    try {
      const response = await axios.post(
        'http://103.12.1.132:8166/api/VehicleType/GetVehicleType',
        {
          vehicleTypeId: 0,
          vehicleTypename: ''
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const vehicleData = response?.data?.data;
      if (Array.isArray(vehicleData) && vehicleData.length > 0) {
        const formattedVehicleOptions: any = vehicleData.map((item) => ({
          label: item.vehicleTypename,
          value: item.vehicleTypeId,
        }));
        setVehicleOptions(formattedVehicleOptions);
      } else {
        console.log('No vehicle data found or data is not an array.');
      }
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    }
  };

  const fetchVehicleNumbers = async () => {
    const params = {
      orderby: "",
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: "",
      str1: "",
      str2: "",
      str3: "",
      str4: "",
      str5: "",
      intvalue1: 0,
      intvalue2: 0,
      intvalue3: 0,
      intvalue4: 0,
      intnotnullvalue2: 0,
      intnotnullvalue3: 0,
      date1: "2024-11-30T12:47:44.659Z",
      date2: "2024-11-30T12:47:44.659Z",
      date3: "2024-11-30T12:47:44.659Z",
      date4: "2024-11-30T12:47:44.659Z",
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: true,
      data: "",
      success: true,
      error: "",
      selectPerindex: 0,
      show: true,
    };

    try {
      const response = await axios.post(
        "http://103.12.1.132:8166/api/Dashboard/GetvVehicleNo",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.data) {
        const vehicleData = response.data.data;
        if (Array.isArray(vehicleData) && vehicleData.length > 0) {
          const vehicleList: any = vehicleData.map((item) => ({
            label: item.vehicleNo,
            value: item.vehicleNo,
          }));
          setVehicleNumber(vehicleList);

        }
      }

    } catch (error) {
      console.error("Error fetching vehicle numbers:", error);
    }
  };

  const createPeriodList = (dateFrom:any, dateTo:any) => {
    return [
      {
        "index": 0,
        "startDate": dateFrom.toISOString(),
        "endDate": dateTo.toISOString(),
        "daysOnly": true,
        "displayLabel": `Period from ${moment(dateFrom).format('DD-MMM-YYYY')} to ${moment(dateTo).format('DD-MMM-YYYY')}`
      }
    ];
  };


  const VehicleMovingTrackStatusdetnew = (dateFrom1:any, dateTo1:any, isChecked:any, vNO:any, vType:any) => {
    const url = 'http://103.12.1.132:8166/api/VehicleFuelDateRange/VehicleFuelDateRange';
    
    console.log('Request:', dateFrom, dateTo);
  
  
    const requestBody = {
      "str1": "",
      "str2": isChecked ? "y" : "n",
      "str3": "",
      "str4": "",
      "str5": "",
      "str6": "",
      "intvalue1": 0,
      "intvalue2": 0,
      "intvalue3": 0,
      "intvalue4": 0,
      "intnotnullvalue1": 0,
      "intnotnullvalue2": 0,
      "intnotnullvalue3": 0,
      "list1": vNO ? vNO : [],
      "listInt1": vType ? vType : [],
      "list2": [""],
      "listInt2": [0],
      "listInt12": [""],
      "date1": dateFrom ? dateFrom.toISOString() : "2024-10-03T07:48:19.942Z",
      "date2": dateTo ? dateTo.toISOString() : "2024-10-03T07:48:19.942Z",
      "date3":  "2024-10-03T07:48:19.942Z",
      "date4":  "2024-10-03T07:48:19.942Z",
      "dec1": 0,
      "dec2": 0,
      "dec3": 0,
      "dec4": 0,
      "flag": true,
      "data": "",
      "success": true,
      "error": "",
      "selectPerindex": 0,
      "selectedPeriod": {
        "index": 0,
        "startDate": dateFrom.toISOString(),
        "endDate": dateTo.toISOString(),
        "daysOnly": true,
        "displayLabel": `Period from ${moment(dateFrom).format('DD-MMM-YYYY')} to ${moment(dateTo).format('DD-MMM-YYYY')}`
      },
      "listPeriod": createPeriodList(dateFrom, dateTo),
      "selectPerindex1": 0,
      "selectedPeriod1": {
        "index": 0,
        "startDate": dateFrom.toISOString(),
        "endDate": dateTo.toISOString(),
        "daysOnly": false,
        "displayLabel": "",
      },
      "listPeriod1": [
        {
          "index": 0,
          "startDate": dateFrom.toISOString(),
          "endDate": dateTo.toISOString(),
          "daysOnly": true,
          "displayLabel": `Yesterday: ${moment(dateFrom).format("DD-MMM-YYYY")}`,
        }
      ],
      "show": true,
      "empName": "",
      "zoneName": "",
      "departmentName": "",
      "exportOption": "",
      "all": false,
      "conditionStr1": "Skip Records speed 0 and distance 0",
      "conditionStr2": "",
      "condition1": true,
      "condition2": true,
      "expOption": [
        {
          "ext": "",
          "extname": ""
        }
      ],
      "cancel": {
        "waitHandle": {
          "handle": {},
          "safeWaitHandle": {}
        }
      }
    };
   return requestBody; 
  
  
  };
  
 


    const [selectedPeriod1, setSelectedPeriod1] = useState({
      index: 0,
      startDate: moment().subtract(1, 'days').toDate(), 
      endDate: moment().subtract(1, 'days').toDate(),   
      daysOnly: false,
      displayLabel: '',
    });
  




  const handleChange = (item: any) => {
    setVno(item.value);
    console.log("Selected Vehicle Number:", item.value);
  };

  const handleVehicleTypeChange = (item: any) => {
    setVType(item.value);


  };

  const handlePeriodSelect = (item: any) => {
    if (item.value === 'custom') {
      console.log("Custom option selected");
      setIsEditable(true);
      setSelectedOption(item); 
    } else {
      setSelectedOption(item);
      setDateFrom(item.startDate); 
      setDateTo(item.endDate);     
      setIsEditable(false);  
      
      
      console.log(dateFrom,dateTo)
    }
  };
  


  const handleDownload = () => {

    console.log('Downloading data...');
  };

  const handleShow = () => {
    const startDate = selectedOption?.value === 'custom' ? selectedPeriod1.startDate : dateFrom;
    const endDate = selectedOption?.value === 'custom' ? selectedPeriod1.endDate : dateTo;

    console.log('Showing data...', dateFrom, dateTo, isChecked, vNO, vType);

    const requestBody=VehicleMovingTrackStatusdetnew(dateFrom, dateTo, isChecked, vNO, vType);
    navigation.navigate('Showfuelwithoutopening',requestBody);
  };


  return (
    <View style={styles.container}>
      <ActionBar title="Fuel Consumption without Opening" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
      <View style={styles.content}>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={(newValue) => setIsChecked(newValue)}
          />
          <Text style={styles.label}>For All Vehicles</Text>
        </View>
        <View style={styles.box}>
          <CheckBox
            value={selDay}
            onValueChange={(newValue) => setSelDay(newValue)}
          />
          <Text style={styles.label}>Vehicle Running Less than:</Text>
          <TextInput
            style={styles.Textinput}
            keyboardType="numeric"
            value={days.toString()}
            onChangeText={(value) => setDays(Number(value))}
            onFocus={(e) => console.log("Focused")}
          />
          <Text style={styles.daysText}>days</Text>
        </View>



        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text
            style={{
              backgroundColor: '#3dccc7',
              color: 'black',
              alignItems: 'center',
              padding: 7,
              borderRadius: 5,
              marginHorizontal: wp('2'),
              flex: 1,
            }}>
            {i18n.t(`Period`)}
          </Text>
          <View

            style={[{
             
            }, styles.dateField]}>
            {options.length > 0 && (
              <Dropdown
                style={[styles.dropdown, { borderColor: selectedOption ? 'green' : 'gray', width: '100%' }]}
                
                iconStyle={styles.iconStyle}
                data={[...options, { label: 'Custom', value: 'custom' }]}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={selectedOption ? selectedOption.label : 'Select Period'}
                searchPlaceholder="Search..."
                value={selectedOption ? selectedOption.value : null}
                onChange={(item) => handlePeriodSelect(item)}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={selectedOption ? 'green' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            )}

          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text
            style={{
              backgroundColor: '#3dccc7',
              color: 'black',
              alignItems: 'center',
              padding: 7,
              borderRadius: 5,
              marginHorizontal: wp('2'),
              flex: 1,
            }}>
            {i18n.t(`Date From`)}
          </Text>

          <TouchableOpacity
            style={[
              styles.dateField,
              { backgroundColor: isEditable ? 'white' : '#f0f0f0' },
            ]}
            disabled={!isEditable}
            onPress={() => setOpenFrom(true)} // Open DatePicker when date field is pressed
          >
            <Text style={{ color: isEditable ? 'black' : 'gray', fontSize: 16 }}>
              {moment(dateFrom).format('DD-MMM-YYYY')}
            </Text>
            <AntDesign
              style={{ alignSelf: 'flex-end' }}
              color={isEditable ? 'black' : 'gray'}
              name="calendar"
              size={20}
            />
          </TouchableOpacity>
        </View>


        <DatePicker
        modal
        mode="date"
        open={openFrom}
        date={dateFrom}
        onConfirm={(date) => {
          setOpenFrom(false);
          setDateFrom(date);
          setSelectedPeriod1((prev) => ({
            ...prev,
            startDate: date,
          }));
        }}
        onCancel={() => {
          setOpenFrom(false);
        }}
      />

        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text
            style={{
              backgroundColor: '#3dccc7',
              color: 'black',
              alignItems: 'center',
              padding: 7,
              borderRadius: 5,
              marginHorizontal: wp('2'),
              flex: 1,
            }}>
            {i18n.t(`Date To`)}
          </Text>

          <TouchableOpacity
            style={[
              styles.dateField,
              { backgroundColor: isEditable ? 'white' : '#f0f0f0' },
            ]}
            disabled={!isEditable}
            onPress={() => setOpenTo(true)} // Open DatePicker when date field is pressed
          >
            <Text style={{ color: isEditable ? 'black' : 'gray', fontSize: 16 }}>
              {moment(dateTo).format('DD-MMM-YYYY')}
            </Text>
            <AntDesign
              style={{ alignSelf: 'flex-end' }}
              color={isEditable ? 'black' : 'gray'}
              name="calendar"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <DatePicker
        modal
        mode="date"
        open={openTo}
        date={dateTo}
        onConfirm={(date) => {
          setOpenTo(false);
          setDateTo(date);
          setSelectedPeriod1((prev) => ({
            ...prev,
            endDate: date,
          }));
        }}
        onCancel={() => {
          setOpenTo(false);
        }}
      />

        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text
            style={{
              backgroundColor: '#3dccc7',
              color: 'black',
              alignItems: 'center',
              padding: 7,
              borderRadius: 5,
              marginHorizontal: wp('2'),
              flex: 1,
            }}>
            {i18n.t(`Vehicle Type`)}
          </Text>

          <View
            style={[{
             
            }, styles.dateField]}>
            {vehicleOptions && (
              <Dropdown
                style={[styles.dropdown, { borderColor: selectedOption ? 'green' : 'gray', width: '100%' }]}
                iconStyle={styles.iconStyle}
                showsVerticalScrollIndicator
                data={vehicleOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Vehicle Type"
                searchPlaceholder="Search..."
                value={vehicleType}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={handleVehicleTypeChange}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus1 ? 'green' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text
            style={{
              backgroundColor: '#3dccc7',
              color: 'black',
              alignItems: 'center',
              padding: 7,
              borderRadius: 5,
              marginHorizontal: wp('2'),
              flex: 1,
            }}>
            {i18n.t(`Vehicle No`)}
          </Text>

          <View
            style={[{

            }, styles.dateField]}>

            {vehicleNumber && vehicleNumber.length > 0 && (
              <Dropdown
                style={[styles.dropdown, { borderColor: selectedOption ? 'green' : 'gray', width: '100%' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={vehicleNumber}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={selectedVehicle || "Select Vehicle No"}
                searchPlaceholder="Search..."
                value={selectedVehicle}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={handleChange}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus1 ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            )}
          </View>
        </View>


        <View style={styles.descBox}>
          <View>
            <TouchableOpacity
              style={styles.download}
              onPress={() => {
                // navigationNew();
              }}>
              <Text>
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="download"
                  size={20}
                />
                {i18n.t(`Download`)}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
          {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ( */}
        <TouchableOpacity style={styles.show} onPress={handleShow}>
          <Text style={styles.text}>
            <Octicons style={styles.icon} color="black" name="graph" size={20} />
            {' '}
            {i18n.t('Show')}
          </Text>
        </TouchableOpacity>
       
          </View>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  // headerContainer: {
  //   width: '100%',
  //   backgroundColor: '#4CAF50',
  //   paddingTop: 20,
  //   paddingBottom: 10,
  //   alignItems: 'center',
  // },
  // header: {
  //   fontSize: 18,
  //   fontWeight: '700',
  //   color: 'black',
  // },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  placeholderText: {
    color: 'black',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
  },
  modalText: {
    fontSize: 18,
  },
  jobCardFrom: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    borderRadius: 5,
    paddingHorizontal: wp("3"),
    borderWidth: 1,
    flex: 1,
  },
  show: {
    backgroundColor: '#25ced1',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    borderRadius: 5,
    marginHorizontal: wp('2'),
    width: wp('25'),
    alignItems: 'center',
  },
  download: {
    backgroundColor: '#25ced1',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    borderRadius: 5,
    marginHorizontal: wp('2'),
  },
  icon: {
    marginRight: 5,
  },
  descBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('2'),
  },
  text: {
    fontSize: 16,
    color: 'black',
  },

  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  dropdown: {
    // height: 50,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    // paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dateField: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  daysText: {
    fontSize: 15,
  },
  Textinput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 8,
    textAlign: 'center',
  },

});
