import { FloatingAction } from 'react-native-floating-action';
import React, { Component } from 'react';
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
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Images from '../../utils/Images';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import  { default as style } from './styles';
import Colors from '../../utils/Colors';
import { findCoordinates, getBackground } from '../../utils/Helper';
import { wp, hp } from '../../utils/Responsive';
import RNRestart from 'react-native-restart';
import AppStyleConstant from '../../utils/AppStyleConstant';
import i18n from '../../utils/i18n';
import CustomDropDown from '../../components/widgets/CustomDropDown';
import Constant from '../../utils/Constant';
import { sagaActions } from "../../redux/saga/sagaActions";
import { setLanguage } from '../../redux/slices/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutKanpur from './AboutKanpur';
import CitizenServices from './CitizenServices';
import GovernmentSchemes from './GovernmentSchemes';
import CitizenEngagement from './CitizenEngagement';
import Miscellaneous from './Miscllaneous';
import Population from './Population';
import DynamicOptions from './DynamicOptions';
import PublicUtility from './PublicUtility';
import EventCard from '../../components/card/EventCard';
import Events from './Events';
import CommonService from './CommonService';
import { ThemeContext } from '../../config/theme/ThemeProvider';
import useTheme from '../../config/theme/hooks/useTheme';

// const styleBtn = style({"color":''});


const sosButton= {
  fontSize: 18,
  textAlign: 'center',
  paddingHorizontal: wp('1'),
  paddingVertical: hp('0'),
  fontFamily: AppStyleConstant.CRIMSONPRO_BLACK,
  elevation: 10,
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
    name: 'Police',
    phNo: '112',
    position: 1,
    textColor: 'black',
    textStyle: [sosButton]
  },
  {
    icon: <FontAwesome name="ambulance" size={25} color="white"></FontAwesome>,
    text: i18n.t('DashBoard.ambulance'),
    name: '108',
    position: 2,
    textColor: 'black',
    textStyle: [sosButton]
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
    textStyle: [sosButton]
  },
  {
    icon: <FontAwesome5 name="disease" size={25} color="white"></FontAwesome5>,
    text: i18n.t('DashBoard.COVID19Helpline'),
    name: '1123978046',
    position: 5,
    textColor: 'black',
    textBackground:'white',
    textStyle: [sosButton]
  },
  {
    icon: <Fontisto name="female" size={25} color="white"></Fontisto>,
    text: i18n.t('DashBoard.womenHelpline'),
    name: '1090',
    position: 6,
    textColor: 'black',
    textStyle: [sosButton]
  },
];


class Dashboard extends Component {
  static contextType = ThemeContext;

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      modalVisible: false,
      language: this.props.language,
      actionsSet: actions,
    };

  }


  displayModal(show: boolean) {
    this.setState({ modalVisible: show });
  }

  componentDidMount() {
    this.setActionBar();
  }


  onWebService = (urlData: any) => {
    this.props.navigation.navigate('MyWeb', urlData);
  };

  onSelectService = (data: any) => {
    this.setState({ modalVisible: false })
    let params: Object = {
      data: {
        subItem: {
          subCategoryID: 30,
          categoryID: 9,
          categoryName: 'EVENTS',
          subCategoryCode: 'EVENT',
          subCategoryName: 'EVENT',
          isActive: true,
        },
      },
      background: {
        bg: 3,
        bgImage: true,
      },
    };
    this.props.navigation.navigate('ListData', params);
  };

  onSelectTicket() {
    this.props.navigation.navigate("TicketList");
  };

  changeLanguage = (value: string) => {
    const language = value;
    console.log("lang==" + language);
    this.props.setLanguage(value)
    i18n
      .changeLanguage(value)
      .then(() => this.setState({ language: value }))
      .catch(err => console.log(err));
    AsyncStorage.setItem('language', value);
    // RNRestart.Restart();

    setTimeout(() => {
      this.setState({ actionsSet: actions })
    }, 2000)

  };

  getLocation = (): void => {

    // {"coordinates":
    // {"coords": {"accuracy": 20, "altitude": 5, "heading": 0, "latitude": 37.421998333333335,
    // "longitude": -122.08400000000002, "speed": 0},
    // "extras": {"maxCn0": 0, "meanCn0": 0, "satellites": 0},
    // "mocked": false, "timestamp": 1678466114000}}
    findCoordinates().then((coordinates: any) => {
      const { coords } = coordinates;
      console.log(coords);
      // dispatch({ type: sagaActions.GET_LOCATION,
      //   payload: {
      //       params: coords
      //   },})
    });
  };

  onSelect = (name: string) => {
    console.log("menu name========================" + name)
    switch (name) {
      case 'Location':
        break;

      case 'DashBoard.changePassword':
        this.props.navigation.navigate('ChangePassword');
        break;

        case 'DashBoard.SETTING':
        this.props.navigation.navigate('Setting');
        break;
    }
  };

  profileButton = () => {
    const theme = this.context
    const styles = style(theme);

    return (
      <Menu>
        <MenuTrigger>
          <Image
            source={Images.PROFILE}
            style={{
              height: 25,
              width: 25,
            }}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            paddingVertical: 5,
            backgroundColor: theme.colors.BACKGROUND,
          }}>
          <>
            {Constant.MENU.map(item => {
              return (
                <MenuOption
                  style={styles.menuContainer}
                  onSelect={() => this.onSelect(item.name)}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.menuIcon}><FontAwesomeIcon name={item.icon} size={17} color={theme.colors.ICON_COLOR} /></View>
                    <Text style={styles.menuLabel}>{i18n.t(item.name)}</Text>
                  </View>
                </MenuOption>
              );
            })}
          </>
        </MenuOptions>
      </Menu>
    );
  };

  setActionBar() {
    const theme = this.context
    const styles = style(theme);

    this.props.navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: theme.colors.DASHBOARD_HEADER_BACKGROUND,
        height: hp('9'),
      },
      headerTitleStyle: {
        fontWeight: '100',
      },

      headerRight: () => (
        <View style={styles.rightHeader}>
          <View style={styles.headerImageContainer}>
            {this.props.language == 'en' ? <Image source={Images.KNP_HEADER} style={styles.headerImage} /> :
              <Image source={Images.KNP_HEADER_HI} style={styles.headerImage} />}
          </View>

          <View style={{
            width: "30%",
            marginHorizontal: wp('3'),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <CustomDropDown
              type={'button'}
              data={Constant.LANGUAGE}
              onSelectItem={(data: string) => {
                this.changeLanguage(data.value)
                this.setActionBar();
              }}
              renderButton={<IonIcons name="language" size={23} color={theme.colors.ICON_COLOR} />}
            />

            {this.profileButton()}
          </View>
        </View>
      ),
    });
  }

  eventModel = () => {
    const { modalVisible } = this.state;
    const theme = this.context
    const styles = style(theme);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        overlayColor={'rgba(90, 90, 9, 0.6)'}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          this.setState({ modalVisible: !modalVisible });
        }}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => this.setState({ modalVisible: !modalVisible })}>
          <FontAwesome name="close" color={Colors.white}></FontAwesome>
        </Pressable>
        <View style={styles.centeredView}>
          <View style={[styles.modalDeskBox]}>
            <Text
              style={[styles.textModal]}
              numberOfLines={1}>{`Open Mic`}
            </Text>
            <Text numberOfLines={2} style={styles.textHead1}>{`Vipul Goyal`}</Text>
          </View>
          <View
            style={styles.modalCard}>
            <View>
              <Image
                source={Images.MODAL_IMAGE}
                style={styles.modalImage}></Image>
            </View>
            <View>
              <Text
                style={styles.guestNameHead}>
                {`Guest`}
              </Text>
              <View
                style={styles.separatorLine}></View>
              <Text
                style={styles.guestNameHead}>
                {`Vipul Goyal`}
              </Text>
              <Text style={{ marginLeft: wp('5'), color: Colors.black }}>
                {`B.Tech IIT Bombay`}
              </Text>
            </View>
          </View>
          <View
            style={styles.modalIconView}>
            <View style={{ flex: 1, marginLeft: wp('5') }}>
              <Fontisto name="date" color="yellow" size={30}></Fontisto>
              <Text
                style={{
                  marginTop: hp('1'),
                  textAlign: 'left',
                  width: wp('18'),
                  color: Colors.white,
                }}>{`23 March,Thur.`}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: wp('10') }}>
              <IonIcons name="time" color="yellow" size={30}></IonIcons>
              <Text
                style={{
                  marginTop: hp('1'),
                  textAlign: 'left',
                  width: wp('18'),
                  color: Colors.white,
                }}>{`7:00 PM`}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: wp('10') }}>
              <SimpleLineIcons
                name="location-pin"
                color="yellow"
                size={28}></SimpleLineIcons>
              <Text
                style={{
                  marginTop: hp('1'),
                  textAlign: 'left',
                  width: wp('18'),
                  color: Colors.white,
                }}>{`Lajpat Bhawan  Kanpur`}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginTop: hp('47'),
              zIndex: 999,
              position: 'absolute',
            }}>
            <Text
              style={styles.clickMore}>
              {`Click for more details!`}
            </Text>
          </TouchableOpacity>
          <View
            style={styles.modalTextDetailView}>
            <Text
              style={{
                color: Colors.black,
                textAlign: 'justify',
                paddingHorizontal: wp('4'),
              }}
              numberOfLines={8}>
              {`Vipul Goyal from TVF’s hugely popular web series ‘Humorously Yours’ will now come to your city, yeah.. you can experience the jokes LIVE. Vipul Goyal with his trove of relatable jokes and cult-y punchlines will have you laughing like a hyena.`}
            </Text>
            <Pressable
              style={styles.modalMoreButton}
              onPress={this.onSelectService}>
              <Text style={styles.textStyle}>{`More Events`}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }

  floatingSOSBtn = () => {
    return <FloatingAction
      actions={this.state.actionsSet}
      onPressItem={phNo => {
        Linking.openURL(`tel: ${phNo}`);
      }}
      color="red"
      iconHeight={70}
      iconWidth={70}
      floatingIcon={Images.SOS}
      overlayColor={'rgba(90, 90, 9, 0.6)'}
      distanceToEdge={23}
    />
  }

  render() {
    const theme = this.context
    const styles = style(theme);

    return (
      <View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp('15') }}
          style={styles.scrollViewContainer}>

          <DynamicOptions />
          <AboutKanpur />

          <Events />
          {/* <FamousPlaces /> */}

          <Miscellaneous />
          <CommonService />

          {/* <CitizenServices /> */}

          <View style={styles.deskBox2}>
            <Text style={styles.textHead}>{i18n.t(`DashBoard.metroFacilities`)}</Text>
          </View>
          <View style={[styles.deskBox, { flex: 1 }]}>
            <View style={styles.imageContainer1}>
              <Image style={styles.image} source={Images.METRO} />
            </View>
          </View>
          <Text style={styles.textAbout}>
            {i18n.t('DashBoard.description')}
          </Text>
          <PublicUtility />
          <CitizenEngagement />

        </ScrollView>
        {this.eventModel()}
        {this.floatingSOSBtn()}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: state.language.language
});

const mapDispatchToProps = { setLanguage }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


//Kanpur Attracts 