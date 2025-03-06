import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../utils/Responsive';
import i18n from '../../utils/i18n';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';

export default function Vehiclenotmoved() {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const formatDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleShow = () => {
    const startDate = dateFrom;
    const endDate = dateTo;

    const requestBody = {
        dateFrom: formatDate(startDate),
        dateTo: formatDate(endDate),
        show: true,              
        exportOption: "",          
    };

    // Navigate to the next screen with the requestBody
    navigation.navigate('ShowVehicleNotMoved', { requestBody });
  };

  return (
    <View style={styles.container}>
      <ActionBar
        title="Vehicle Not Moved"
        containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }}
      />
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text style={styles.labelField}>{i18n.t(`Date From`)}</Text>
          <TouchableOpacity
            style={[styles.dateField, { backgroundColor: 'white' }]}
            onPress={() => setOpenFrom(true)}
          >
            <Text style={{ color: 'black', fontSize: 16 }}>
              {formatDate(dateFrom)}
            </Text>
            <AntDesign name="calendar" size={20} />
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
          }}
          onCancel={() => setOpenFrom(false)}
        />

        <View style={{ flexDirection: 'row', margin: hp('1'), alignItems: 'center' }}>
          <Text style={styles.labelField}>{i18n.t(`Date To`)}</Text>
          <TouchableOpacity
            style={[styles.dateField, { backgroundColor: 'white' }]}
            onPress={() => setOpenTo(true)}
          >
            <Text style={{ color: 'black', fontSize: 16 }}>
              {formatDate(dateTo)}
            </Text>
            <AntDesign name="calendar" size={20} />
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
          }}
          onCancel={() => setOpenTo(false)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleShow}>
            <Octicons name="graph" size={20} />
            <Text style={styles.buttonText}>{i18n.t('Show')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  labelField: {
    backgroundColor: '#3dccc7',
    color: 'black',
    padding: 7,
    borderRadius: 5,
    marginHorizontal: wp('2'),
    flex: 1,
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
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: hp('2'),
  },
  button: {
    backgroundColor: '#25ced1',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    borderRadius: 5,
    marginHorizontal: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});