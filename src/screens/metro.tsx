import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionBar from '../../src/components/ActionBar';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Images from '../utils/Images';
import {TextInput} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import Colors from '../utils/Colors';
import { hp } from '../utils/Responsive';

const KanpurMetro = ({item}: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items, setItems] = useState([
    {label: 'IIT KANPUR', value: 'IIT'},
    {label: 'KALYANPUR ', value: 'KAL'},
    {label: 'SPM HOSPITALS ', value: 'SPM'},
    {label: 'VISHWAVIADYALAYA ', value: 'VISH'},
    {label: 'GURUDEV CHAURAHA ', value: 'GUR'},
    {label: 'GEETA NAGAR', value: 'GEETA'},
    {label: 'RAWATPUR ', value: 'RAWAT'},
    {label: 'LLRH', value: 'LLRH'},
    {label: 'MOTI JHEEL', value: 'MOTI'},
  ]);
  const [items1, setItems1] = useState([
    {label: 'IIT KANPUR', value: 'IIT'},
    {label: 'KALYANPUR ', value: 'KAL'},
    {label: 'SPM HOSPITALS ', value: 'SPM'},
    {label: 'VISHWAVIADYALAYA ', value: 'VISH'},
    {label: 'GURUDEV CHAURAHA ', value: 'GUR'},
    {label: 'GEETA NAGAR', value: 'GEETA'},
    {label: 'RAWATPUR ', value: 'RAWAT'},
    {label: 'LLRH', value: 'LLRH'},
    {label: 'MOTI JHEEL', value: 'MOTI'},
  ]);

  return (
    <>
      <ActionBar title={'Kanpur Metro'} />
      <ScrollView style={{backgroundColor:Colors.white}}>
        <View style={{width: hp(10), height: hp(29.5),zIndex:-100}}>
          <Image
            source={Images.METRO1}
            style={{width: hp(50), height: hp(30)}}></Image>
        </View>
          <View
            style={{
              position:'absolute',
              marginLeft: hp(22),
              marginTop: hp(31),
              zIndex:500
            }}>
            <TouchableOpacity>
              <Image
                source={Images.ARROW}
                style={{borderRadius: 2000, width: hp(7), height: hp(7)}}></Image>
            </TouchableOpacity>
          </View>
        <View>
          {/* <View style={{marginBottom:10,width:'90%',alignSelf:'center',marginTop:-20,}}> */}
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Origin station"
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
                marginTop: hp('-2'),
                height: hp('28'),
                zIndex:1
              }}
              searchable={true}
              listMode="SCROLLVIEW"
              
            />
          </View>
          {/* </View> */}
          {/* <View style={{width:'90%',alignSelf:'center',height:10000}}> */}
          <View style={{marginTop: hp('-19')}}>
            <DropDownPicker
              placeholder="Destination station"
              open={open1}
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
                zIndex: 1,
              }}
              searchable={true}
              listMode="SCROLLVIEW"
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: 30,
                backgroundColor: Colors.orange1,
                alignSelf: 'center',
                width: hp('25'),
                height: hp('6'),
                zIndex: 1000,
                marginTop: hp('1'),
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 15,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: hp('6'),
                  color: 'white',
                }}>
                Show Route & Fare
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: hp('2'),
            alignSelf: 'center',
            height: hp('22'),
            zIndex: -1,
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: Colors.white,
              alignItems: 'center',
              width: hp('18'),
              height: hp('13'),
              borderRadius: 10,
              elevation: 10,
            }}>
            <View
              style={{
                width: hp('10'),
                height: hp('8'),
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                source={Images.MAP1}
                style={{width: hp('10'), height: hp('8'), alignSelf: 'center'}}></Image>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: Colors.greygrey4,
                  marginTop: hp('0.5'),
                }}>
                Search Station
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: Colors.white,
              alignItems: 'center',
              width: hp('18'),
              height: hp('13'),
              borderRadius: 10,
              elevation: 10,
              marginLeft: 10,
            }}>
            <View
              style={{
                width: hp('15'),
                height: hp('8'),
                alignItems: 'center',
                marginTop: hp('1'),
                overflow: 'hidden',
              }}>
              <Image
                source={Images.METRO2}
                style={{width: hp('15'),
              height: hp('8'),}}></Image>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: Colors.greygrey4,
                  marginTop: hp('1'),
                }}>
                Nearest Metro Station
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: hp('45'),
            height: hp('25'),
            elevation: 10,
            borderRadius: 10,
            alignSelf: 'center',
            backgroundColor: Colors.white,
            marginTop: -50,
          }}>
          <Image
            source={Images.METRO_MAP}
            style={{
              width: hp('42'),
              height: hp('22'),
              borderRadius: 10,
              marginVertical: hp('1.5'),
              marginHorizontal: hp('1.5'),
            }}></Image>
        </View>
        <View style={{marginTop: hp('5'), marginLeft: hp('4')}}>
          <View>
            <Text
              style={{fontWeight: '700', fontSize: 20, color: Colors.orange1}}>
              {'Quick Contact :-'}
            </Text>
          </View>
       
          <View style={{flexDirection: 'row',marginTop:hp('1')}}>
            <View style={{flexDirection: 'row',marginLeft:hp('-2')}}>
              <View style={{marginTop: hp('1.5')}}>
                <Ionicons name="call" size={13} color={Colors.black}></Ionicons>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{fontWeight: '700', fontSize: 12, color: '#252525'}}>
                  {'Kanpur Metro Helpline No.'}
                </Text>
                <Text
                  style={{fontWeight: '700', fontSize: 12, color: '#606060'}}>
                  {'0522-2288869'}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row',marginLeft:hp('2'),height:hp('10')}}>
              <View style={{marginTop: hp('1.5')}}>
                <Ionicons name="call" size={13} color={Colors.black}></Ionicons>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{fontWeight: '700', fontSize: 12, color: '#252525'}}>
                  {'Kanpur Metro Helpline No.'}
                </Text>
                <Text
                  style={{fontWeight: '700', fontSize: 12, color: '#606060'}}>
                  {'0522-2288869'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </>
  );
};

export default KanpurMetro;
