import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Images from '../../utils/Images';

function ShowVehicleNotMoved({ route }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { requestBody } = route.params;  // Extract requestBody from route params

  useEffect(() => {
    if (requestBody) {
      fetchVehicleData(requestBody);
    } else {
      Alert.alert('Error', 'No data received from previous screen.');
    }
  }, [requestBody]);

  const handleSearch = (text:any) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      // Reset to original data if search query is empty
      setData(originalData);
    } else {
      const filteredData = originalData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(text.toLowerCase())
        )
      );
      setData(filteredData);
    }
  };

  const fetchVehicleData = (requestBody:any) => {
    setIsLoading(true);

    const url = 'http://103.12.1.132:8166/api/NTRead/GetVehicleNotMoved';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server error ${response.status}: ${text}`);
          });
        }
        return response.json();  // ✅ Parse JSON response
      })
      .then((responseData) => {
        console.log('API Response:', responseData);  // ✅ Log the full response for debugging

        if (responseData?.isSuccess) {
          setData(responseData.data || []);
          setOriginalData(responseData.data || []);
        } else {
          Alert.alert('Error', 'No data found or internal error.');
          setData([]);
          setOriginalData([]);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
        Alert.alert('Error', `Failed to fetch data: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ActionBar
        title="Show Vehicle Not Moved"
        containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Feather name="search" size={18} color="#888" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading data...</Text>
        </View>
      ) : (
        <ScrollView>
          <ScrollView horizontal={true}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                <Text style={styles.tableHeader}><Image source={Images.Serial} style={styles.icon} />Sr. No.</Text>
                <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
                <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle Type</Text>
                <Text style={styles.tableHeader}><Image source={Images.Driver} style={styles.icon} />Driver Name</Text>
                <Text style={styles.tableHeader}><Image source={Images.Department} style={styles.icon} />Department</Text>
                <Text style={styles.tableHeader}><Image source={Images.Zone} style={styles.icon} />Zone Name</Text>
                <Text style={styles.tableHeader}><Image source={Images.Mobile} style={styles.icon} />Mobile No</Text>
                <Text style={styles.tableHeader}><Image source={Images.Balance} style={styles.icon} />NT Record</Text>
              </View>

              {/* Table Data */}
              {data.map((item:any, index:any) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{item.srNo}</Text>
                  <Text style={styles.tableCell}>{item.vehicleNo}</Text>
                  <Text style={styles.tableCell}>{item.vehicleTypename}</Text>
                  <Text style={styles.tableCell}>{item.empName}</Text>
                  <Text style={styles.tableCell}>{item.departmentName}</Text>
                  <Text style={styles.tableCell}>{item.zoneName}</Text>
                  <Text style={styles.tableCell}>{item.empMobileNo}</Text>
                  <Text style={styles.tableCell}>{item.ntRecord ? 'Yes' : 'No'}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#87CEEB',
    paddingVertical: 12,
  },
  tableHeaderRow: {
    backgroundColor: '#f9f9f9',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 100,
    textAlign: 'center',
    color: "#1B3B5F",
  },
  tableCell: {
    fontSize: 12,
    width: 100,
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default ShowVehicleNotMoved;