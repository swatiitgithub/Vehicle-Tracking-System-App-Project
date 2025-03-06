import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-chart-kit';

const VehicleTravelled = () => {
  // State for dropdown data
  const [vehicleNos, setVehicleNos] = useState([]);
  const [selectedVehicleNo, setSelectedVehicleNo] = useState(null);

  // State for date inputs
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  // State for date pickers
  const [openDateFromPicker, setOpenDateFromPicker] = useState(false);
  const [openDateToPicker, setOpenDateToPicker] = useState(false);

  // State for loading
  const [loading, setLoading] = useState(false);

  // State for histogram data
  const [vehicleDist, setVehicleDist] = useState(null);

  // Function to format date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch vehicle numbers from API
  const getVehicleNo = () => {
    const collectData = {
      orderby: '',
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: '',
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      str5: '',
      intvalue1: 0,
      intvalue2: 0,
      intvalue3: 0,
      intvalue4: 0,
      intnotnullvalue2: 0,
      intnotnullvalue3: 0,
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
      date3: new Date().toISOString(),
      date4: new Date().toISOString(),
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: true,
      data: '',
      success: true,
      error: '',
      selectPerindex: 0,
      show: true,
    };

    setLoading(true);
    axios
      .post('http://103.12.1.132:8166/api/Dashboard/GetvVehicleNo', collectData)
      .then((res) => {
        if (res?.data?.data) {
          const arr = res.data.data.map((item:any) => ({
            label: item.vehicleNo,
            value: item.vehicleNo,
          }));
          setVehicleNos(arr);
        } else {
          console.error('No vehicle data found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching vehicle data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch histogram data
  const getVehicleDistance = () => {
    if (!selectedVehicleNo || !dateFrom || !dateTo) {
      alert('Please select vehicle number and date range.');
      return;
    }

    const collectData = {
      where: '@0=@0',
      orderby: '',
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: 'string',
      parameterValues: [selectedVehicleNo, formatDate(dateFrom), formatDate(dateTo)],
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      str5: '',
      intvalue1: 0,
      intvalue2: 0,
      intvalue3: 0,
      intvalue4: 0,
      intnotnullvalue2: 0,
      intnotnullvalue3: 0,
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
      date3: new Date().toISOString(),
      date4: new Date().toISOString(),
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: true,
      data: '',
      success: true,
      error: '',
      selectPerindex: 0,
      show: true,
    };

    setLoading(true);
    axios
      .post('http://103.12.1.132:8166/api/Dashboard/GetVehicleDistance', collectData)
      .then((res) => {
        console.log('API Response:', res.data); // Log the entire API response
        const data = res?.data?.data;

        if (!data) {
          throw new Error('No data found in API response');
        }

        const listVehicleIdle = data.listVehicleIdle || [];

        const formattedData = listVehicleIdle.map((item:any) => {
          const formattedDate = new Date(item.trackDate).toLocaleDateString('en-GB');
          return {
            trackDate: formattedDate,
            secondsIdle: item.secondsIdle,
          };
        });

        const idleData = formattedData.map((item:any) => (item.secondsIdle / 60).toFixed(3));
        const trackDates = formattedData.map((item:any) => item.trackDate);

        setVehicleDist({
          labels: trackDates,
          datasets: [
            {
              data: idleData,
              label: 'Idle Time (Minutes)',
              backgroundColor: '#ff6666',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching histogram data:', error);
        alert('Failed to fetch histogram data. Please check the API response.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getVehicleNo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Dropdown Input Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle No</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#007BFF" />
        ) : (
          <Picker
            selectedValue={selectedVehicleNo}
            onValueChange={(itemValue) => setSelectedVehicleNo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Vehicle No" value={null} />
            {vehicleNos.map((item:any, index:any) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        )}
      </View>

      {/* Date From and Date To in a Single Line */}
      <View style={styles.dateContainer}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.label}>Date From</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setOpenDateFromPicker(true)}>
            <Text>{formatDate(dateFrom) || 'Select Date From'}</Text>
            <Icon name="calendar" size={20} color="#007BFF" />
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDateFromPicker}
            date={dateFrom}
            mode="date"
            onConfirm={(date) => {
              setOpenDateFromPicker(false);
              setDateFrom(date);
            }}
            onCancel={() => {
              setOpenDateFromPicker(false);
            }}
          />
        </View>

        <View style={styles.dateInputContainer}>
          <Text style={styles.label}>Date To</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setOpenDateToPicker(true)}>
            <Text>{formatDate(dateTo) || 'Select Date To'}</Text>
            <Icon name="calendar" size={20} color="#007BFF" />
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDateToPicker}
            date={dateTo}
            mode="date"
            onConfirm={(date) => {
              setOpenDateToPicker(false);
              setDateTo(date);
            }}
            onCancel={() => {
              setOpenDateToPicker(false);
            }}
          />
        </View>
      </View>

      {/* Show Button */}
      <TouchableOpacity style={styles.showButton} onPress={getVehicleDistance}>
        <Text style={styles.showButtonText}>Show</Text>
      </TouchableOpacity>

      {/* Histogram Chart */}
      {vehicleDist && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Idle Time (Minutes)</Text>
          <BarChart
            data={vehicleDist}
            width={350}
            height={300}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    width: '48%',
  },
  dateInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  showButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  showButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default VehicleTravelled;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
