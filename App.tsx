import 'react-native-gesture-handler';
import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/SplashScreen';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import Colors from './src/utils/Colors';
import DrawerContent from './src/drawerNavigator/DrawerContent';
import {
  responsiveHeight as hp,
} from 'react-native-responsive-dimensions';
import Dashboard from './src/screens/Dashboard';
import { NativeBaseProvider } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import ListData from './src/components/ListData';
import CreateComplaints from './src/screens/CreateComplaints';
import FeedbackForm from './src/screens/FeedbackForm';
import FlashMessage from 'react-native-flash-message';
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import { navigationRef } from './src/navigation/RootNavigation';
import UpdateProfile from './src/screens/UpdateProfile';
import ChangePassword from './src/screens/ChangePassword';
import KanpurMetro from './src/screens/metro';
import { MenuProvider } from 'react-native-popup-menu';
import MyWeb from './src/screens/WebView/WebView';
import ShowComplaint from './src/screens/CreateComplaints/ShowComplaint';
import ReviewList from './src/screens/ReviewList/ReviewList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './src/utils/i18n';
import TicketList from './src/screens/Dashboard/TicketList';
import ImageWebView from './src/screens/Dashboard/ImageWebView';
import useTheme from './src/config/theme/hooks/useTheme';
import Setting from './src/screens/Setting';
import Theme from './src/screens/Setting/Theme';
import DashBoard1 from './src/screens/Dashboard1/DashBoard1';
import DashboardImageView from './src/screens/Dashboard/ImageView';
import { wp } from './src/utils/Responsive';
import Package from './src/screens/Package/Package';
import AddCandidate from './src/screens/Candidate/components/AddCandidate';
import Candidate from './src/screens/Candidate';
import AddInstituteUser from './src/screens/InstituteUser/components/AddInstituteUser';
import ViewInstituteUser from './src/screens/InstituteUser/components/ViewInstituteUser';
import InstituteUser from './src/screens/InstituteUser';
import EditCandidate from './src/screens/Candidate/components/EditCandidate';
import LoginView from './src/components/widgets/LoginView';
import AddRoom from './src/screens/Room/AddRoom';
import VehicleTrack from './src/screens/Reports/VehicleTrack';
import Running from './src/screens/Dashboard1/Running';
import Idle from './src/screens/Dashboard1/Idle';
import Stooped from './src/screens/Dashboard1/Stooped';
import Showvehicletrack from './src/screens/Reports/Showvehicketrack';
import FuelConsumption from './src/screens/Reports/FuelConsumption';
import Vehicledetailssummary from './src/screens/Reports/Vehicledetailssummary';
import Fuelconspwithopening from './src/screens/Reports/Fuelconspwithopening';
import Fuelconspwithoutopening from './src/screens/Reports/Fuelconspwithoutopening';
import Probablewithtemp from './src/screens/Reports/Probablewithtemp';
import Vehiclenotmoved from './src/screens/Reports/Vehiclenotmoved';
import ShowVehicledetailssummary from './src/screens/Reports/ShowVehicledetailssummary';
import Showfuelconsp from './src/screens/Reports/Showfuelconsp';
import Showfuelwithopening from './src/screens/Reports/Showfuelwithopening';
import Showfuelwithoutopening from './src/screens/Reports/Showfuelwithoutopening';
import Fuelconsumed from './src/screens/Dashboard1/Fuelconsumed';
import LongIdleVehicle from './src/screens/Dashboard1/LongIdleVehicle';
import Todaysvehicle from './src/screens/Dashboard1/Todaysvehicle';
import Tracking from './src/screens/Reports/Tracking';
import Probablewire from './src/screens/Dashboard1/Probablewire';
import Showprobablewire from './src/screens/Reports/Showprobablewire';
import ShowVehicleNotMoved from './src/screens/Reports/Showvehiclenotmoved';
import Notification from './src/screens/Notification/Notification';
import BottomTabNavigator from './src/screens/Dashboard1/Bottomtab';
import KudaghrLocation from './src/screens/Reports/KudaghrLocation';
import VehicleTravelled from './src/screens/Reports/VehicleTravelled';
import VehicleHistory from './src/screens/Reports/VehicleHistory';
import Geofencing from './src/screens/Reports/Geofencing';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

let options: Object = {
  headerShown: false,
  animationEnabled: true,
  transitionSpec: {
    open: config,
    close: config,
  },
};

export default function App() {

  // const dispatch = useDispatch();
  // const { cords, error, loading } = useSelector((state: RootState) => state.location);
  const [lang, setLanguage] = React.useState('en')
  const theme :any= useTheme();

  React.useEffect(() => {
    AsyncStorage.getItem('language').then((lang:any) => {
      setLanguage(lang)
      i18n
        .changeLanguage(lang)
        .catch(err => console.log(err));
    });
  }, [])


  const NavigationDrawerStructure = (props: any) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer(props);
    };

    return (
      <View style={{ flexDirection: 'row', paddingLeft: hp(2), width: wp('15'), paddingBottom: 5 }}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon name="menu" size={25} color={theme.colors.ICON_COLOR} />
        </TouchableOpacity>
      </View>
    );
  };

  const FirstScreenStack = ({ navigation, route }: any) => {
    return (
      <Stack.Navigator initialRouteName="Dashboard1">
        <Stack.Screen
          name="Dashboard1"
          component={DashBoard1}
          initialParams={route.params}
          options={{
            headerLeft: () => (
              <View>
                <View style={{ marginTop: hp(1.25) }}>
                  <NavigationDrawerStructure navigationProps={navigation} color={Colors.black} /></View>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="ListData"
          component={ListData}
          initialParams={route.params}
          options={options}
        />
        

        <Stack.Screen
          name="reviewList"
          component={ReviewList}
          initialParams={route.params}
          options={options}
        />

        

       

        <Stack.Screen
          name="CreateComplaints"
          component={CreateComplaints}
          initialParams={route.params}
          options={options}
        />

        <Stack.Screen
          name="FeedbackForm"
          component={FeedbackForm}
          initialParams={route.params}
          options={options}
        />

        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          initialParams={route.params}
          options={options}
        />

        <Stack.Screen
          name="KanpurMetro"
          component={KanpurMetro}
          initialParams={route.params}
          options={options}
        />

        

        <Stack.Screen name="ShowComplaint"
          component={ShowComplaint}
          initialParams={route.params}
          options={options}
        />

       

       

       

        

        <Stack.Screen name="DashBoard"
          component={Dashboard}
          initialParams={route.params}
          options={{
            headerLeft: () => (
              <View>
                <View style={{ marginTop: hp(1.25) }}>
                  <NavigationDrawerStructure navigationProps={navigation} color={Colors.black} />
                </View>
              </View>
            )
          }}
        />

      </Stack.Navigator>
    );
  };

  const DrawerStack = (route: any) => {
    // console.log(JSON.stringify(route.route, null, 1))
    return (
      <Drawer.Navigator
        drawerContent={props => {
          let params: Object = {
            props: props,
            packageId: route.route.params
          };
          return <DrawerContent props={params} lang={lang} />;
        }}>
        <Drawer.Screen
          name="FirstScreen"
          component={FirstScreenStack}
          options={options}
        />
      </Drawer.Navigator>
    );
  };


  return (
    <NativeBaseProvider>
      <MenuProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Package" component={Package} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
           
            <Stack.Screen name="AddCandidate" component={AddCandidate} />
            <Stack.Screen name="AddInstituteUser" component={AddInstituteUser} />
            
            
            <Stack.Screen name="InstituteUser" component={InstituteUser} />
            <Stack.Screen name="ViewInstituteUser" component={ViewInstituteUser} />
            <Stack.Screen name="EditCandidate" component={EditCandidate} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="MyWeb" component={MyWeb} />
            <Stack.Screen name="DrawerStack" component={DrawerStack} />
            <Stack.Screen name="TicketList" component={TicketList} />
            <Stack.Screen name="DashboardImageView" component={DashboardImageView} />
            <Stack.Screen name="ImageWebView" component={ImageWebView} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Theme" component={Theme} />
          
            <Stack.Screen name="LoginView" component={LoginView} />
            <Stack.Screen name="AddRoom" component={AddRoom} />
            <Stack.Screen name="VehicleTrack" component={VehicleTrack} />
            <Stack.Screen name="Running" component={Running} />
            <Stack.Screen name="Idle" component={Idle} />
            <Stack.Screen name="Stooped" component={Stooped} />
            <Stack.Screen name="Showvehicletrack" component={Showvehicletrack} />
            <Stack.Screen name="FuelConsumption" component={FuelConsumption} />
            <Stack.Screen name="Vehicledetailssummary" component={Vehicledetailssummary} />
            <Stack.Screen name="Fuelconspwithopening" component={Fuelconspwithopening} />
            <Stack.Screen name="Fuelconspwithoutopening" component={Fuelconspwithoutopening} />
            <Stack.Screen name="Probablewithtemp" component={Probablewithtemp} />
            <Stack.Screen name="Vehiclenotmoved" component={Vehiclenotmoved} />
            <Stack.Screen name="ShowVehicledetailssummary" component={ShowVehicledetailssummary} />
            <Stack.Screen name="Showfuelconsp" component={Showfuelconsp} />
            <Stack.Screen name="Showfuelwithopening" component={Showfuelwithopening} />
            <Stack.Screen name="Showfuelwithoutopening" component={Showfuelwithoutopening} />
            <Stack.Screen name="Fuelconsumed" component={Fuelconsumed} />
            <Stack.Screen name="LongIdleVehicle" component={LongIdleVehicle} />
            <Stack.Screen name="Todaysvehicle" component={Todaysvehicle} />
            <Stack.Screen name="Tracking" component={Tracking} />
            <Stack.Screen name="Probablewire" component={Probablewire} />
            <Stack.Screen name="Showprobablewire" component={Showprobablewire} />
            <Stack.Screen name="ShowVehicleNotMoved" component={ShowVehicleNotMoved} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="KudaghrLocation" component={KudaghrLocation} />
            <Stack.Screen name="VehicleTravelled" component={VehicleTravelled} />
            <Stack.Screen name="VehicleHistory" component={VehicleHistory} />
            <Stack.Screen name="Geofencing" component={Geofencing} />


          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </MenuProvider>
    </NativeBaseProvider>
  );
}
