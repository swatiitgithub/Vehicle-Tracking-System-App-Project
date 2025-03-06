import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
  Modal,
  Pressable,
  Linking,
  NativeEventSubscription,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {default as style} from '../Dashboard/styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import Images from '../../utils/Images';
import {ImageSlider} from '@pembajak/react-native-image-slider-banner';
import ImageCarousel from 'react-native-image-carousel';
import MyCustomIcon from 'react-native-vector-icons/FontAwesome';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import styles from '../Dashboard/styles';
import Colors from '../../utils/Colors';
import {findCoordinates, getBackground} from '../../utils/Helper';
import {wp, hp} from '../../utils/Responsive';
import RNRestart from 'react-native-restart';
import AppStyleConstant from '../../utils/AppStyleConstant';
import i18n from '../../utils/i18n';
import CustomDropDown from '../../components/widgets/CustomDropDown';
import Constant from '../../utils/Constant';
import {sagaActions} from '../../redux/saga/sagaActions';
import {setLanguage} from '../../redux/slices/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicUtility from '../Dashboard/PublicUtility';
import Events from '../Dashboard/Events';
import {ThemeContext} from '../../config/theme/ThemeProvider';
import CircleDesign from './CircleDesign';
import FloatingActionButton from '../../components/FloatingHoriZontal/FloatingActionButton';
import FamousPlaces from '../Dashboard/famousPlaces';
import Url from '../../utils/Url';
import {axiosRequest} from '../../utils/ApiRequest';
import Weather from '../Dashboard/Weather';
import CustomDropDownMenu from '../../components/widgets/CustomDropDownMenu';
import {FloatingAction} from 'react-native-floating-action';
import {Icon} from 'native-base';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import PieChart from 'react-native-pie-chart';
import CustomPieChart from '../../components/CustomPieChart';
import Carousel from 'react-native-reanimated-carousel';

const sosButton = {
  fontSize: 16,
  textAlign: 'center',
  paddingHorizontal: wp('1'),
  fontFamily: AppStyleConstant.CRIMSONPRO_BLACK,
  elevation: 10,
};
const {width} = Dimensions.get('window');

const getRandomColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
};

const actions = [
  {
    text: i18n.t('DashBoard.police'),
    icon: (
      <MaterialCommunityIcons
        name="police-badge"
        size={25}
        color="white"></MaterialCommunityIcons>
    ),
    name: '112',
    position: 1,
    textColor: 'black',
    textStyle: [sosButton],
  },
  {
    icon: <FontAwesome name="ambulance" size={25} color="white"></FontAwesome>,
    text: i18n.t('DashBoard.ambulance'),
    name: '108',
    position: 2,
    textColor: 'black',
    textStyle: [sosButton],
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="fire-truck"
        size={25}
        color="white"></MaterialCommunityIcons>
    ),
    text: i18n.t('DashBoard.fire'),
    name: '101',
    position: 4,
    textColor: 'black',
    textStyle: [sosButton],
  },
  {
    icon: <FontAwesome5 name="disease" size={25} color="white"></FontAwesome5>,
    text: i18n.t('DashBoard.COVID19Helpline'),
    name: '1123978046',
    position: 5,
    textColor: 'black',
    textBackground: 'white',
    textStyle: [sosButton],
  },
  {
    icon: <Fontisto name="female" size={25} color="white"></Fontisto>,
    text: i18n.t('DashBoard.womenHelpline'),
    name: '1090',
    position: 6,
    textColor: 'black',
    textStyle: [sosButton],
  },
];

const screenWidth = Dimensions.get('window').width;

const handleSegmentPress = (color: any) => {
  console.log('Pressed segment color:', color);
};

class Dashboard1 extends Component {
  static contextType = ThemeContext;

  constructor(props: {} | Readonly<{}>) {
    super(props);
  }
  state = {
    modalVisible: false,
    modalVisible2: false,
    isLoadingPieChart1: false,
    isLoadingPieChart2: false,
    modalSegmentName: '',
    segmentName: '',
    modalData2: [],
    modalData: [],
    language: this.props.language,
    actionsSet: actions,
    header: true,
    isSOSFloatingBtnPopupVisible: true,
    data: [],
    pieChartData1: [],
    pieChartData2: [],
    runningveh: 0,
    stopveh: 0,
    idleveh: 0,
    totalveh: 1,
    totalvehall: 0,
    vehtotal: 0,
    totDistance: 0,
    searchQuery1: '',
    searchQuery2: '',
  };

  displayModal(show: boolean) {
    this.setState({modalVisible: show});
  }

  componentDidMount() {
    this.setActionBar();
    this.getVehCurrStat();
    // this.fetchPieChartData();
    // this.IgnitionData('value');
    this.setState({isSOSFloatingBtnPopupVisible: true});
  }
  onWebService = (urlData: any) => {
    this.props.navigation.navigate('MyWeb', urlData);
  };

  getVehCurrStat = async () => {
    try {
      const response = await axiosRequest(
        'https://vtsapi.mssplonline.in/api/NTRead/VehCurrStat',
        Constant.API_REQUEST_METHOD.GET,
      );
      console.log('API Response:yuiuuuu', response.data);
      const labels = response?.data?.data?.labels3;
      const values = response.data.data.coT3;

      if (
        !Array.isArray(labels) ||
        !Array.isArray(values) ||
        labels.length !== values.length
      ) {
        console.error('Invalid data structure:', response.data);
        return;
      }

      const predefinedColors = [
        '#FF5733',
        '#33FF57',
        '#3357FF',
        '#F39C12',
        '#8E44AD',
        '#3498DB',
        '#1ABC9C',
      ];

      const pieChartData1 = labels.map((label: any, index: any) => {
        const color = getRandomColor();
        return {
          name: label,
          value: values[index],
          color: color,
          legendFontColor: color,
          legendFontSize: 15,
        };
      });
      console.log('pieChartData1,', pieChartData1);

      if (pieChartData1.length === 0) {
        console.error('No valid pie chart data to display');
        return;
      }

      const labels1 = response.data.data.labels1;
      const values2 = response.data.data.coT1;

      if (
        !Array.isArray(labels1) ||
        !Array.isArray(values2) ||
        labels1.length !== values2.length
      ) {
        console.error(
          'Invalid data structure for pieChartData2:',
          response.data,
        );
        return;
      }
      const staticColors = ['#FF6384', '#9966FF'];
      const pieChartData2 = labels1.map((label: any, index: any) => {
        const color = getRandomColor();
        return {
          name: label,
          value: values2[index],
          color: color,
          legendFontColor: color,
          legendFontSize: 15,
        };
      });

      console.log('piechartdata2', pieChartData2);
      const {
        runningveh,
        stopveh,
        idleveh,
        totalveh,
        totalvehall,
        vehtotal,
        totDistance,
      } = response.data.data;
      this.setState({
        pieChartData1,
        pieChartData2,
        runningveh,
        stopveh,
        idleveh,
        totalveh,
        totalvehall,
        vehtotal,
        totDistance,
      });
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  handlePieChartSegmentClick = async (segmentIndex: any) => {
    const {pieChartData1} = this.state;
    const segment: any = pieChartData1[segmentIndex];

    if (segment) {
      // Start the loader before making the API request
      this.setState({isLoadingPieChart1: true});

      try {
        const zoneName = segment.name;
        const encodedZoneName = encodeURIComponent(zoneName);

        const response = await axios.get(
          `https://vtsapi.mssplonline.in/api/NTRead/GetTopFuelConsNTS/zone=${encodedZoneName}`,
        );

        if (response.data) {
          const fetchedData = response.data.data || [];

          // Update the state with the fetched data and modal segment name
          this.setState({
            modalData: fetchedData,
            modalSegmentName: zoneName,
          });

          // Set modal visibility to true after data is fetched
          this.setState({modalVisible: true});
        } else {
          console.log('No data found in response.');
        }
      } catch (error) {
        console.error('Error fetching segment data:', error);
      } finally {
        // Stop the loader after the modal is opened with data
        if (this.state.modalVisible) {
          this.setState({isLoadingPieChart1: false});
        }
      }
    } else {
      console.error('Segment data not found');
    }
  };

  handlePieChartSegmentClick1 = async (segmentIndex: any) => {
    const {pieChartData2} = this.state;
    const segment: any = pieChartData2[segmentIndex];

    if (segment) {
      // Start the loader before making the API request
      this.setState({isLoadingPieChart2: true});

      const ignitionStatus = segment.name.split(' - ')[1];
      console.log(segment);

      const dt = ignitionStatus === 'On' ? true : false;
      console.log(`Condition Result (dt): ${dt}`);

      const url = `https://vtsapi.mssplonline.in/api/NTRead/GetTopFuelConsNTOnOff/onoff=${dt}`;
      console.log(
        `API Call: Ignition Status = ${ignitionStatus}, URL = ${url}`,
      );

      try {
        const response = await axios.get(url, {
          headers: {
            Accept: '*/*',
          },
        });

        const fetchedData = response.data.data || [];
        this.setState({
          modalData2: fetchedData,
          modalVisible2: true,
          segmentName: segment.name || 'Unknown Segment',
        });
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        // Stop the loader after the modal is opened with data
        if (this.state.modalVisible2) {
          this.setState({isLoadingPieChart2: false});
        }
      }
    } else {
      console.error('Segment data not found');
    }
  };

  closeModal = () => {
    this.setState({modalVisible: false, searchQuery1: ''});
  };

  closeModal2 = () => {
    this.setState({modalVisible2: false, searchQuery2: ''});
  };

  getFilteredDataModal1 = () => {
    const {modalData, searchQuery1} = this.state;
    if (!searchQuery1.trim()) return modalData;
    return modalData.filter((item:any) => {
      return (
        item.vehicleNo?.toLowerCase().includes(searchQuery1.toLowerCase()) ||
        item.empName?.toLowerCase().includes(searchQuery1.toLowerCase())
      );
    });
  };

  // Filter for Modal 2
  getFilteredDataModal2 = () => {
    const {modalData2, searchQuery2} = this.state;
    if (!searchQuery2.trim()) return modalData2;
    return modalData2.filter((item:any) => {
      return (
        item.vehicleNo?.toLowerCase().includes(searchQuery2.toLowerCase()) ||
        item.empName?.toLowerCase().includes(searchQuery2.toLowerCase())
      );
    });
  };

  renderModalTableRow1 = (item: any, index: number) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          paddingVertical: 12,
        }}>
        <Text
          style={{
            fontSize: 12,
            width: 100,
            textAlign: 'center',
            paddingTop: 8,
          }}>
          {item.srno}
        </Text>

        <Text
          style={{
            fontSize: 12,
            width: 100,
            textAlign: 'center',
            paddingTop: 8,
          }}>
          {item.vehicleNo}
        </Text>

        <Text
          style={{
            fontSize: 12,
            width: 100,
            textAlign: 'center',
            paddingTop: 8,
          }}>
          {item.empName}
        </Text>

        <Text
          style={{
            fontSize: 12,
            width: 100,
            textAlign: 'center',
            paddingTop: 8,
          }}>
          {item.departmentName}
        </Text>

        <Text
          style={{
            fontSize: 12,
            width: 100,
            textAlign: 'center',
            paddingTop: 8,
          }}>
          {item.vehicleTypename}
        </Text>
      </View>
    );
  };

  renderModalTableRow = (item: any, index: any) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
      }}>
      <Text
        style={{
          fontSize: 12,
          width: 100,
          textAlign: 'center',
          paddingTop: 8,
        }}>
        {item.srno}
      </Text>
      <Text
        style={{
          fontSize: 12,
          width: 100,
          textAlign: 'center',
          paddingTop: 8,
        }}>
        {item.vehicleNo}
      </Text>
      <Text
        style={{
          fontSize: 12,
          width: 100,
          textAlign: 'center',
          paddingTop: 8,
        }}>
        {item.empName}
      </Text>
      <Text
        style={{
          fontSize: 12,
          width: 100,
          textAlign: 'center',
          paddingTop: 8,
        }}>
        {item.ignition}
      </Text>
    </View>
  );

  changeLanguage = (value: string) => {
    Alert.alert('Alert', i18n.t('DashBoard.CHANGE_LANGUAGE'), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const language = value;
          this.props?.setLanguage(value);
          i18n
            .changeLanguage(value)
            .then(() => this.setState({language: value}))
            .catch(err => console.log(err));
          AsyncStorage.setItem('language', value);

          setTimeout(() => {
            this.setState({actionsSet: actions});
            RNRestart.Restart();
          }, 2000);
        },
      },
    ]);
  };

  onSelect = (name: string) => {
    console.log('menu name========================' + name);
    switch (name) {
      case 'Location':
        break;

      case 'DashBoard.changePassword':
        this.props.navigation.navigate('ChangePassword');
        break;

      case 'DashBoard.SETTING':
        this.props.navigation.navigate('Setting');
        break;

      case 'DashBoard.notification':
        this.props.navigation.navigate('Notification');
        break;
    }
  };

  profileButton = () => {
    const theme: any = this.context;
    const styles = style(theme);
    return (
      <Menu>
        <MenuTrigger>
          <IonIcons
            name="person-circle-outline"
            size={30}
            color={theme.colors.ICON_COLOR}></IonIcons>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            borderRadius: 15,
          }}>
          <>
            <ImageBackground
              blurRadius={1}
              imageStyle={{borderRadius: 15}}
              style={styles.bgImageStyle}
              source={Images.BG_6}>
              {Constant.MENU.map((item, index) => {
                return item.name != 'DashBoard.LANGUAGE' ? (
                  <MenuOption
                    key={`catName${index}`}
                    style={styles.menuContainer}
                    onSelect={() => this.onSelect(item.name)}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.menuIcon}>
                        <FontAwesomeIcon
                          name={item.icon}
                          size={17}
                          color={Colors.black}
                        />
                      </View>
                      <Text style={styles.menuLabel}>{i18n.t(item.name)}</Text>
                    </View>
                  </MenuOption>
                ) : (
                  <CustomDropDown
                    key={`dropdown${index}`}
                    type={'button'}
                    data={Constant.LANGUAGE}
                    visible={true}
                    onSelectItem={(data: any) => {
                      this.changeLanguage(data.value);
                      this.setActionBar();
                    }}
                    renderButton={
                      <View
                        style={[styles.menuContainer, {flexDirection: 'row'}]}>
                        <View style={styles.menuIcon}>
                          <Image
                            style={{
                              borderRadius: 15,
                              height: 20,
                              width: 20,
                              marginTop: 1,
                            }}
                            source={Images.TRANSLATE_lOGO}></Image>
                        </View>
                        <Text style={styles.menuLabel}>
                          {i18n.t(item.name)}
                        </Text>
                      </View>
                    }
                  />
                );
              })}
            </ImageBackground>
          </>
        </MenuOptions>
      </Menu>
    );
  };
  imageHeader = () => {
    const theme = this.context;
    const styles = style(theme);
    return (
      <View style={styles.headerImageContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{paddingHorizontal: wp('2')}}>
            {this.props.language == 'en' ? (
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                VEHICLE TRACKING SYSTEM
              </Text>
            ) : (
              <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
                वाहन ट्रैकिंग प्रणाली
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  setActionBar() {
    const theme: any = this.context;
    const styles = style(theme);
    this.props.navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: theme.colors.DASHBOARD_HEADER_BACKGROUND,
        height: hp('9'),
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '100',
      },

      headerRight: () => (
        <View style={styles.rightHeader}>
          {this.imageHeader()}

          <View style={{width: '21%', flexDirection: 'row'}}>
            <View style={{marginTop: -3, paddingLeft: wp('5')}}>
              {this.profileButton()}
            </View>
          </View>
        </View>
      ),
    });
  }

  setActionContent = (lang: any) => {
    if (lang == 'en') return actions;
  };

  render() {
    const theme: any = this.context;
    const {
      pieChartData1,
      modalVisible,
      modalData,
      pieChartData2,
      modalVisible2,
      modalData2,
      modalSegmentName,
      segmentName,
      isLoadingPieChart1,
      isLoadingPieChart2,
      searchQuery1,
      searchQuery2,
    } = this.state;
    const {
      runningveh,
      stopveh,
      idleveh,
      totalveh,
      totalvehall,
      vehtotal,
      totDistance,
    } = this.state;

    const runningProgress = totalveh > 0 ? runningveh / totalveh : 0;
    const idleProgress = totalveh > 0 ? idleveh / totalveh : 0;
    const stoppedProgress = totalveh > 0 ? stopveh / totalveh : 0;

    const filteredData1 = this.getFilteredDataModal1();
    const filteredData2 = this.getFilteredDataModal2();

    const styles = style(theme);

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Carousel */}
          {/* <View style={styles.carouselWrapper}>
                        <Carousel
                            loop
                            width={width}
                            height={width / 2}
                            autoPlay={true}
                            autoPlayInterval={3000}
                            data={[0, 1, 2]}
                            scrollAnimationDuration={1000}
                            //   onSnapToItem={}
                            renderItem={({ index }) => {
                                let imageSource;
                                switch (index) {
                                    case 0:
                                        imageSource = require('../Dashboard1/Image/vehicle1.jpg');
                                        break;
                                    case 1:
                                        imageSource = require('../Dashboard1/Image/vehicle2.png');
                                        break;
                                    case 2:
                                        imageSource = require('../Dashboard1/Image/vehicle3.jpg');
                                        break;
                                    default:
                                        imageSource = require('../Dashboard1/Image/vehicle1.jpg');
                                }
                                return (
                                    <View style={styles.carouselItem}>
                                        <Image source={imageSource} style={styles.carouselImage} />
                                    </View>
                                );
                            }}
                        />
                    </View> */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                {isLoadingPieChart1 ? (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                ) : (
                  <>
                    <Text style={styles.modalTitle}>{modalSegmentName}</Text>

                    {/* Search Input */}
                    <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search by Vehicle or Driver"
                      value={searchQuery1}
                      onChangeText={(text) => this.setState({searchQuery1: text})}
                    />
                    <MyCustomIcon name="search" size={20} color="black" />
                  </View>

                    <ScrollView horizontal style={styles.horizontalScroll}>
                      <ScrollView style={styles.verticalScroll}>
                        {/* Table Header */}
                        <View style={styles.tableHeaderRow}>
                          <Text style={styles.tableHeader}>
                            <Image
                              source={Images.Serial}
                              style={styles.iconn}
                            />{' '}
                            Sr No
                          </Text>
                          <Text style={styles.tableHeader}>
                            <Image
                              source={Images.Vehicle}
                              style={styles.iconn}
                            />{' '}
                            Vehicle
                          </Text>
                          <Text style={styles.tableHeader}>
                            <Image
                              source={Images.Driver}
                              style={styles.iconn}
                            />{' '}
                            Driver
                          </Text>
                          <Text style={styles.tableHeader}>
                            <Image
                              source={Images.Department}
                              style={styles.iconn}
                            />{' '}
                            Department
                          </Text>
                          <Text style={styles.tableHeader}>
                            <Image
                              source={Images.Vehicletype}
                              style={styles.iconn}
                            />{' '}
                            Vehicle Type
                          </Text>
                        </View>

                        {filteredData1.length > 0 ? (
                        filteredData1.map(this.renderModalTableRow1)
                      ) : (
                        <Text style={styles.noDataText}>No Data Available</Text>
                      )}
                      </ScrollView>
                    </ScrollView>

                    {/* Close Button */}
                    <Button title="Close" onPress={this.closeModal} />
                  </>
                )}
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible2}
            onRequestClose={this.closeModal2}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{this.state.segmentName}</Text>
                <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by Vehicle or Driver"
                  value={searchQuery2}
                  onChangeText={(text) => this.setState({searchQuery2: text})}
                />
                <MyCustomIcon name="search" size={20} color="black" />
              </View>
                <ScrollView horizontal style={styles.horizontalScroll}>
                  <ScrollView style={styles.verticalScroll}>
                    <View style={styles.tableHeaderRow}>
                      <Text style={styles.tableHeader}>
                        <Image source={Images.Serial} style={styles.iconn} />
                        Sr No
                      </Text>
                      <Text style={styles.tableHeader}>
                        <Image source={Images.Vehicle} style={styles.iconn} />
                        Vehicle
                      </Text>
                      <Text style={styles.tableHeader}>
                        <Image source={Images.Driver} style={styles.iconn} />
                        Driver
                      </Text>
                      <Text style={styles.tableHeader}>
                        <Image source={Images.Ignition} style={styles.iconn} />
                        Ignition
                      </Text>
                    </View>
                    {filteredData2.length > 0 ? (
                    filteredData2.map(this.renderModalTableRow)
                  ) : (
                    <Text style={styles.noDataText}>No Data Available</Text>
                  )}
                  </ScrollView>
                </ScrollView>
                <Button title="Close" onPress={this.closeModal2} />
              </View>
            </View>
          </Modal>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Fuelconsumed')
                  }>
                  <View style={[styles.card, {backgroundColor: '#d1f7f9'}]}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../Dashboard1/Image/fuel.png')}
                        style={styles.iconImage}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      {this.props.language == 'en' ? (
                        <Text style={styles.cardText}>Fuel Consumed</Text>
                      ) : (
                        <Text style={styles.cardText}>ईंधन खपत</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('LongIdleVehicle')
                  }>
                  <View style={[styles.card, {backgroundColor: '#d1f7f9'}]}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../Dashboard1/Image/long.jpg')}
                        style={styles.iconImage}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      {this.props.language == 'en' ? (
                        <Text style={styles.cardText}>Long Idle Vehicle</Text>
                      ) : (
                        <Text style={styles.cardText}>
                          लंबे समय तक निष्क्रिय वाहन
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Todaysvehicle')
                  }>
                  <View style={[styles.card, {backgroundColor: '#d1f7f9'}]}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../Dashboard1/Image/11133503.png')}
                        style={styles.iconImage}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      {this.props.language == 'en' ? (
                        <Text style={styles.cardText}>Today's Vehicle</Text>
                      ) : (
                        <Text style={styles.cardText}>आज के वाहन</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Probablewire')
                  }>
                  <View style={[styles.card, {backgroundColor: '#d1f7f9'}]}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../Dashboard1/Image/probable.jpg')}
                        style={styles.iconImage}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      {this.props.language == 'en' ? (
                        <Text style={styles.cardText}>
                          Probable Wire Tampering
                        </Text>
                      ) : (
                        <Text style={styles.cardText}>
                          संभावित तार छेड़छाड़
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{position: 'relative'}}>
              <CustomPieChart
                data={pieChartData1}
                widthAndHeight={screenWidth - 32}
                onPress={this.handlePieChartSegmentClick}
              />

              {this.state.isLoadingPieChart1 && (
                <View style={styles.loaderOverlay}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            </View>

            <View style={styles.pieChartContainer}>
              {this.props.language == 'en' ? (
                <Text style={styles.chartTitle}>VEHICLE IGNITION STATUS</Text>
              ) : (
                <Text style={styles.chartTitle}>वाहन इग्निशन स्थिति</Text>
              )}

              {this.state.pieChartData2.length > 0 ? (
                <View style={{position: 'relative'}}>
                  <CustomPieChart
                    data={this.state.pieChartData2}
                    widthAndHeight={screenWidth - 32}
                    onPress={this.handlePieChartSegmentClick1}
                  />

                  {this.state.isLoadingPieChart2 && (
                    <View style={styles.loaderOverlay}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  )}
                </View>
              ) : (
                <Text style={styles.errorText}>
                  {this.props.language == 'en'
                    ? 'No data available to display.'
                    : 'प्रदर्शित करने के लिए कोई डेटा उपलब्ध नहीं है।'}
                </Text>
              )}
            </View>

            <View style={styles.progressBarsContainer}>
              {this.props.language == 'en' ? (
                <Text style={styles.chartTitle}>VEHICLE RUNNING STATUS</Text>
              ) : (
                <Text style={styles.chartTitle}>वाहन चलने की स्थिति</Text>
              )}

              {/* Running Status */}
              <View style={styles.statusRow}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Running')}>
                  <Text style={[styles.statusText, {color: '#4caf50'}]}>
                    {this.props.language == 'en'
                      ? `Running: ${runningveh}`
                      : `चल रहा है: ${runningveh}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <Progress.Bar
                progress={runningProgress}
                width={screenWidth - 32}
                height={25}
                color="#4caf50"
                borderWidth={0}
                unfilledColor="#dcdcdc"
                borderRadius={10} // Rounded bar
              />

              {/* Idle Status */}
              <View style={styles.statusRow}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Idle')}>
                  <Text style={[styles.statusText, {color: '#ff9800'}]}>
                    {this.props.language == 'en'
                      ? `Idle: ${idleveh}`
                      : `निष्क्रिय: ${idleveh}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <Progress.Bar
                progress={idleProgress}
                width={screenWidth - 32}
                height={25}
                color="#ff9800"
                borderWidth={0}
                unfilledColor="#dcdcdc"
                borderRadius={10} // Rounded bar
              />

              {/* Stopped Status */}
              <View style={styles.statusRow}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Stooped')}>
                  <Text style={[styles.statusText, {color: '#f44336'}]}>
                    {this.props.language == 'en'
                      ? `Stopped: ${stopveh}`
                      : `रुका हुआ: ${stopveh}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <Progress.Bar
                progress={stoppedProgress}
                width={screenWidth - 32}
                height={25}
                color="#f44336"
                borderWidth={0}
                unfilledColor="#dcdcdc"
                borderRadius={10}
              />
            </View>

            <View style={styles.detailsContainer}>
              {/* Total Vehicle */}
              <Text style={styles.detailText}>
                {this.props.language == 'en'
                  ? `Total Vehicle: ${totalveh}`
                  : `कुल वाहन: ${totalveh}`}
              </Text>

              {/* Total Vehicle On Road */}
              <Text style={styles.detailText}>
                {this.props.language == 'en'
                  ? `Total Vehicle On Road: ${runningveh} Out Of ${vehtotal}`
                  : `सड़क पर कुल वाहन: ${runningveh} में से ${vehtotal}`}
              </Text>

              {/* GPS Installation Status */}
              <Text style={styles.detailText}>
                {this.props.language == 'en'
                  ? `GPS Installation Status: ${totalvehall} Out Of ${vehtotal}`
                  : `जीपीएस स्थापना स्थिति: ${totalvehall} में से ${vehtotal}`}
              </Text>

              {/* Total Distance */}
              <Text style={styles.detailText}>
                {this.props.language == 'en'
                  ? `Total Distance: ${totDistance} km`
                  : `कुल दूरी: ${totDistance} किमी`}
              </Text>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
  handlePieSegmentClick(segmentName: any) {
    throw new Error('Method not implemented.');
  }
}

const mapStateToProps = (state: any) => ({
  language: state.language.language,
});

const mapDispatchToProps = {setLanguage};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard1);
