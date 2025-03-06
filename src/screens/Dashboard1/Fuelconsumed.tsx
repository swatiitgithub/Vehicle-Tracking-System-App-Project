import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Image } from 'react-native';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../utils/Images';

function Fuelconsumed() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const recordsCount = 1000;

  const apiUrl = `https://vtsapi.mssplonline.in/api/NTRead/GetTopFuelCons/nos=${recordsCount}`;

  const fetchFuelConsData = async () => {
    try {
      setLoading(true);

      const headers = {
        'Accept': '*/*',
      };

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const responseData = await response.json();

      // console.log('API Response:', responseData);

      if (Array.isArray(responseData.data)) {
        setData(responseData.data);
        setFilteredData(responseData.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelConsData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filtered = data.filter((item: any) => {
      return (
        (item.vehicleNo && item.vehicleNo.toLowerCase().includes(text.toLowerCase())) ||
        (item.empName && item.empName.toLowerCase().includes(text.toLowerCase())) ||
        (item.departmentname && item.departmentname.toLowerCase().includes(text.toLowerCase())) ||
        (item.vehicleTypename && item.vehicleTypename.toLowerCase().includes(text.toLowerCase()))
      );
    });

    // Sort filtered data so that results that match vehicleNo or departmentname come first
    const sortedFiltered = filtered.sort((a, b) => {
      if (
        a.vehicleNo.toLowerCase().includes(text.toLowerCase()) ||
        a.departmentname.toLowerCase().includes(text.toLowerCase())
      ) {
        return -1;
      }
      return 1;
    });

    setFilteredData(sortedFiltered);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActionBar title="Fuel Consumed" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ActionBar title="Fuel Consumed" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActionBar title="Fuel Consumed" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
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

      {/* Horizontal Scroll for Table */}
      <ScrollView horizontal={true}>
        <View>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeaderContainer]}>
            <Text style={styles.tableHeader}><Image source={Images.Serial} style={styles.icon} />Sr.No.</Text>
            <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} />Vehicle No</Text>
            <Text style={styles.tableHeader}><Image source={Images.Department} style={styles.icon} />Department</Text>
            <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Consumed</Text>
            <Text style={styles.tableHeader}><Image source={Images.Fuel} style={styles.icon} />Fuel Tank Capacity</Text>
          </View>

          {/* Table Data */}
          <ScrollView>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <View
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }, // Light color for alternate rows
                  ]}
                  key={index}
                >
                  <Text style={styles.tableCell}>{item.srNo}</Text>
                  <Text style={styles.tableCell}>{item.vehicleNo}</Text>
                  <Text style={styles.tableCell}>{item.departmentname}</Text>
                  <Text style={styles.tableCell}>{item.fuelConsumed.toFixed(2)}</Text>
                  <Text style={styles.tableCell}>{item.fuelTankCapacity}</Text>
                </View>
              ))
            ) : (
              <Text>No data available</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    padding: 10,
  },
  table: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 100,
    textAlign: 'center',
    color: "#1B3B5F",
    paddingBottom: 8,
  },
  tableHeaderContainer: {
    backgroundColor: '#87CEEB',
  },
  tableCell: {
    fontSize: 12,
    width: 100,
    textAlign: 'center',
    paddingTop: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default Fuelconsumed;