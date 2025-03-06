import React, {Component, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContent,
} from '@react-navigation/drawer';

import {
  responsiveHeight as hp,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {RootState} from '../redux/store';
import {findCoordinates, getBackground, notLoginAlert} from '../utils/Helper';
import {Avatar, Button} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {sagaActions} from '../redux/saga/sagaActions';
import {userLogoutSaga} from '../redux/saga/saga';
import Url from '../utils/Url';
import Constant from '../utils/Constant';
import OtherMenuOptions from './OtherMenuOptions';
import {default as style} from './styles';
import useThemedStyles from '../config/theme/hooks/useThemedStyles';
import useTheme from '../config/theme/hooks/useTheme';
import languageSlice, {setLanguage} from '../redux/slices/languageSlice';
import i18n from '../utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default DrawerContent = ({props}: any) => {
  const [drawerMenus, setDrawerMenus] = useState<any>([]);
  let [type, setType] = useState<number>(1);
  const theme = useTheme();
  const styles = useThemedStyles(style);
  const dispatch = useDispatch();
  const menu = useSelector((state: any) => state.sideMenu);
  const {userData} = useSelector((state: any) => state.user);
  const {location} = useSelector((state: any) => state.location);
  const [menu1, setMenu1] = useState<any>(Constant.MENU2);
  const navigation = useNavigation<any>();
  var menu2: any = [];

  useEffect(() => {
    let param = {
      ipAddres: '',
      orgID: userData?.verifiedUser?.orgID,
      packageID: 1,
      portalTypeID: -1,
      roleID: -1,
      type: 1,
      userID: userData?.verifiedUser?.userID,
      userTypeID: userData?.verifiedUser?.userTypeID,
    };

    {
      userData &&
        dispatch({
          type: sagaActions.FETCH_SIDE_BAR_MENU,
          payload: {
            params: param,
          },
        });
    }

    // console.log('=============',userData.data.isSuccess);
  }, [userData]);

  useEffect(() => {
    findCoordinates()
      .then((coordinates: any) => {
        const {coords} = coordinates;
        dispatch({
          type: sagaActions.GET_LOCATION,
          payload: {
            params: coords,
          },
        });
      })
      .catch(error => console.log(error));

    for (
      let index = 0;
      index < menu.drawerMenuData?.data?.moduleRight.length;
      index++
    ) {
      menu2.push({
        name: menu.drawerMenuData?.data?.moduleRight[index]['mModuleName'],
        routes: [],
        isCollapse: true, // Ensure `isCollapse` is initialized
        index,
      });

      for (let j = 0; j < menu.drawerMenuData?.data?.formRight.length; j++) {
        if (
          menu.drawerMenuData?.data?.formRight[j]?.mModuleID ===
          menu.drawerMenuData?.data?.moduleRight[index]?.moduleID
        ) {
          menu2[index]['routes'].push({
            name: menu.drawerMenuData?.data?.formRight[j]['displayName'],
          });
        }
      }
    }

  }, [menu, userData]);

  function onSelectItem(data: any) {
    let params: Object = {
      data,
      background: getBackground(data.subItem.subCategoryName),
    };

    if (data.subItem.subCategoryName === 'Vehicle Track') {
      navigation.navigate('VehicleTrack', params);
    }
    if (data.subItem.subCategoryName === 'Fuel Consumption') {
      navigation.navigate('FuelConsumption', params);
    }
    if (data.subItem.subCategoryName === 'Vehicle Details Summary') {
      navigation.navigate('Vehicledetailssummary', params); // Correct the typo here
    }
    if (data.subItem.subCategoryName === 'Fuel Consp with Opening') {
      navigation.navigate('Fuelconspwithopening', params);
    }
    if (data.subItem.subCategoryName === 'Fuel Consp without Opening') {
      navigation.navigate('Fuelconspwithoutopening', params);
    }
    if (data.subItem.subCategoryName === 'Probable wire Tempering') {
      navigation.navigate('Probablewithtemp', params);
    }
    if (data.subItem.subCategoryName === 'Vehicle Not Moved') {
      navigation.navigate('Vehiclenotmoved', params);
    }
    if (data.subItem.subCategoryName === 'Tracking') {
      navigation.navigate('Tracking', params);
    }
    if (data.subItem.subCategoryName?.trim() === 'Kudaghr Location') {
      navigation.navigate('KudaghrLocation', params);
    }
    if (data.subItem.subCategoryName?.trim() === 'Vehicle Travelled') {
      navigation.navigate('VehicleTravelled', params);
    }
    if (data.subItem.subCategoryName?.trim() === 'Vehicle History') {
      navigation.navigate('VehicleHistory', params);
    }
    if (data.subItem.subCategoryName?.trim() === 'GeoFencing') {
      navigation.navigate('Geofencing', params);
    }

    
  }

  const logout = () => {
    dispatch({type: sagaActions.USER_LOGOUT});

    setTimeout(() => {
      console.log(userData);
      navigation.navigate('Login');
    }, 500);
  };

  const SideBarHeader = () => {
    return (
      <ImageBackground
        style={styles.userInfoSection}
        source={require('./../assets/background/blur_bg.png')}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 12,
            paddingBottom: 12,
          }}>
          {userData?.data?.successful && (
            <>
              {/* onPress={() => props.props.navigation.navigate("UpdateProfile")} */}
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Avatar
                  source={{
                    uri: 'https://play-lh.googleusercontent.com/_25PP1oOUyxY8jVN7IG_2xo6f9yZtbEtqGwf1KCqnvJFMW4TO9C436zs4TDU04DIaBk',
                  }}
                  size={60}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    left: 40,
                  }}>
                  {/* <IconFontAwesome name={'edit'} size={20} color={"#000000"} /> */}
                </View>
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.title}>
                    {userData?.userDetail?.userName}
                  </Text>
                  <Text style={styles.subTitle}>
                    {userData?.userDetail?.email}
                  </Text>
                </View>
                <View>
                  <Button
                    size="xs"
                    rounded={'2xl'}
                    colorScheme={'danger'}
                    onPress={logout}>
                    Logout
                  </Button>
                </View>
              </View>
            </>
          )}
          {!userData && (
            <Button
              style={{width: 80}}
              size="sm"
              rounded={'2xl'}
              colorScheme={'darkBlue'}
              onPress={() => {
                props.props.navigation.navigate('Login');
              }}>
              Login
            </Button>
          )}
        </View>
      </ImageBackground>
    );
  };

 const toggleHeader = (item:any , index:any) => {
    console.log(item?.isCollapse)
   
      const data = [...menu1];

      if (index >= 0 && index < data.length) {
        data[index].isCollapse = !data[index].isCollapse;
        setMenu1(data);
      } else {
        console.error('Invalid index:', index);
      }
  };
  const MenuItems = () => {
    console.log({menu2: menu1});

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={false}
            style={{width: '100%', marginVertical: 10}}>
            <View>
              {menu1.map((item: any, index: number) => {
                return (
                  <View key={`cat_${index}`}>
                    <TouchableOpacity
                onPress={() => {
                  toggleHeader(item,index);
                }}
                style={styles.headerContainer}
              >
                      <View style={styles.headerIcon}>
                        <IconFontAwesome
                          name={item.catIcon ? item.catIcon : 'circle'}
                          size={15}
                          color={item.catIcon ? 'black' : '#dcdcdc'}
                        />
                      </View>
                      <Text style={styles.headerText}>
                        {item?.categoryName}
                      </Text>
                      <View>
                        {item.categoryName == 'COMPLAINT' ? (
                          <View />
                        ) : (
                          <IconFeather
                            name={
                              item?.isCollapse ? 'chevron-down' : 'chevron-up'
                            }
                            size={18}
                            color={'black'}
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    {item?.lstCategorySubCategoryResp?.map(
                      (subItem: any, index: number) => {
                        return (
                          <View key={`subCat_${index}`}>
                            {!item?.isCollapse && (
                              <TouchableOpacity
                                onPress={() => {
                                  onSelectItem({subItem}, navigation);
                                }}
                                style={[styles.container, styles.subContainer]}>
                                {subItem.subCategoryName === 'Vehicle Track' ? (
                                  <Image
                                    source={require('../assets/images/track.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Fuel Consumption' ? (
                                  <Image
                                    source={require('../assets/images/fuel.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Vehicle Details Summary' ? (
                                  <Image
                                    source={require('../assets/images/detailsv.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Fuel Consp with Opening' ? (
                                  <Image
                                    source={require('../assets/images/fuelconsp.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Fuel Consp without Opening' ? (
                                  <Image
                                    source={require('../assets/images/fuelwithout.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Probable wire Tempering' ? (
                                  <Image
                                    source={require('../assets/images/probable.jpg')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Vehicle Not Moved' ? (
                                  <Image
                                    source={require('../assets/images/notmoved.jpg')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName === 'Tracking' ? (
                                  <Image
                                    source={require('../assets/images/tracking07.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Kudaghr Location' ? (
                                  <Image
                                    source={require('../assets/images/kudaghr.jpg')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Vehicle Travelled' ? (
                                  <Image
                                    source={require('../assets/images/vehicletravelled.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName ===
                                  'Vehicle History' ? (
                                  <Image
                                    source={require('../assets/images/vehiclehistory.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : subItem.subCategoryName === 'GeoFencing' ? (
                                  <Image
                                    source={require('../assets/images/geofencing.png')}
                                    style={{width: 30, height: 30}}
                                  />
                                ) : (
                                  <IconFontAwesome
                                    name="square"
                                    size={12}
                                    color={index % 2 ? '#914bdb' : '#4972d1'}
                                  />
                                )}

                                <View>
                                  <View style={styles.subHeaderTextContainer}>
                                    <Text style={styles.subHeaderText}>
                                      {subItem.subCategoryName}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      },
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };

  return (
    <DrawerContentScrollView
      style={{
        paddingTop: 0,
        backgroundColor: 'white',
        // backgroundColor: theme.colors.BACKGROUND
      }}
      {...props}>
      <View style={styles.drawerContent}>
        <SideBarHeader />
        {menu.loading && <ActivityIndicator size={'large'} />}
        <MenuItems />
      </View>
    </DrawerContentScrollView>
  );
};
