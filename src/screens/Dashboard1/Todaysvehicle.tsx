import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, Modal, TextInput, Dimensions } from 'react-native';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';
import Images from '../../utils/Images'; // Ensure this imports your local images
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

function TodaysVehicle() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isVehicleModalVisible, setVehicleModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [status, setStatus] = useState<string>('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vehicleModalData, setVehicleModalData] = useState<any | null>(null);
  const [vehicleLocationData, setVehicleLocationData] = useState<any | null>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [center, setCenter] = useState({
    latitude: 26.4499, // Latitude for Kanpur, Uttar Pradesh
    longitude: 80.3319, // Longitude for Kanpur, Uttar Pradesh
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data); // Reset filtered data when search is cleared
    } else {
      const filtered = data.filter(item =>
        (item.vehicleNo && item.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.empName && item.empName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleItemPress = async (value: any) => {
    setSelectedItem(value);
    await IgnitionData(value);
    setModalVisible(true);
  };

  const handleVehicleDetailsPress = async (item: any) => {
    setVehicleModalData(item);
    await getCurrentData(item); // Fetch vehicle location data
    setVehicleModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCloseVehicleModal = () => {
    setVehicleModalVisible(false);
  };

  const IgnitionData = async (value: any) => {
    try {
      const dt = value === "On" ? true : false;
      const url = `https://vtsapi.mssplonline.in/api/NTRead/GetTopFuelConsNTOnOff/onoff=${dt}`;
      console.log(value, dt, url);

      const response = await axios.get(url, {
        headers: {
          Accept: '*/*',
        },
      });

      const fetchedData = response.data.data;
      setModalData(fetchedData);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://vtsapi.mssplonline.in/api/NTRead/GetNTDashboard', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.data);
      setFilteredData(json.data); // Set filtered data to the fetched data initially
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = async (row: any) => {
    const collectData = {
      where: "VehicleNo=(@0)",
      orderby: "",
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: "string",
      parameterValues: [row.vehicleNo],
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
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
      date3: new Date().toISOString(),
      date4: new Date().toISOString(),
      dec1: 0,
      dec2: 0,
      dec3: 0,
      dec4: 0,
      flag: true,
      data: "string",
      success: true,
      error: "string",
      selectPerindex: 0,
      show: true,
    };

    try {
      const response = await axios.post('http://103.12.1.132:8166/api/Dashboard/GetVehileCurrentDay', collectData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.data) {
        const arr = response.data.data.map((item: any) => ({
          lat: item.lattitude,
          lng: item.longitude,
          id: item.id,
          speed: item.speed,
          tracktime: formatTrackTime(item.trackTime),
          distance: item.distance,
          nearme: item?.nearme,
          vehicleNo: item?.vehicleNo,
          icon: item.speed === 0
            ? "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-red-truck-transportation-png-image_11507611.png"
            : "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-green-truck-transport-png-image_11508688.png",
        }));
        setVehicles(arr);
        setCenter(calculateCenter(arr));
        setVehicleLocationData(arr[0]);
      } else {
        console.error('No data found in the response');
      }
    } catch (error) {
      console.error('Error fetching vehicle location:', error);
    }
  };

  const formatTrackTime = (trackTime: string) => {
    const date = new Date(trackTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const calculateCenter = (locations: any[]) => {
    if (locations.length === 0) return center;

    let lat = 0, lng = 0;
    locations.forEach(location => {
      lat += location.lat;
      lng += location.lng;
    });

    return {
      latitude: lat / locations.length,
      longitude: lng / locations.length,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  const renderModalTableRow = (item: any, index: any) => (
    <View style={styles.tableRow} key={index}>
      <Text style={styles.tableCell}>{item.srno}</Text>
      <Text style={styles.tableCell}>{item.vehicleNo}</Text>
      <Text style={styles.tableCell}>{item.empName}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActionBar title="Today's Vehicle Status" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
        <ActivityIndicator size="large" color={colors.red.DASHBOARD_HEADER_BACKGROUND} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActionBar title="Today's Vehicle Status" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />

      {/* Search Container */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search by Vehicle No or Driver"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Feather name="search" size={18} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Outer ScrollView for Horizontal Scroll */}
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          {/* Header Row */}
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableHeader}><Image source={Images.Serial} style={styles.icon} /> Sr No</Text>
            <Text style={styles.tableHeader}><Image source={Images.Starttime} style={styles.icon} /> Time Stamp</Text>
            <Text style={styles.tableHeader}><Image source={Images.Vehicle} style={styles.icon} /> Vehicle No</Text>
            <Text style={styles.tableHeader}><Image source={Images.Driver} style={styles.icon} /> Driver</Text>
            <Text style={styles.tableHeader}><Image source={Images.Zone} style={styles.icon} /> Zone</Text>
            <Text style={styles.tableHeader}><Image source={Images.Department} style={styles.icon} /> Department</Text>
            <Text style={styles.tableHeader}><Image source={Images.Vehicletype} style={styles.icon} /> Vehicle Type</Text>
            <Text style={styles.tableHeader}><Image source={Images.status} style={styles.icon} /> Status</Text>
            <Text style={styles.tableHeader}><Image source={Images.Speed} style={styles.icon} /> Speed</Text>
            <Text style={styles.tableHeader}><Image source={Images.Ignition} style={styles.icon} /> Ignition</Text>
            <Text style={styles.tableHeader}><Image source={Images.Idle} style={styles.icon} /> Idle</Text>
            <Text style={styles.tableHeader}><Image source={Images.Zone} style={styles.icon} /> Location</Text>
          </View>

          {/* Inner ScrollView for Vertical Scroll for Data Rows */}
          <ScrollView>
            {filteredData.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{item.srno}</Text>
                <Text style={styles.tableCell}>
                  {(() => {
                    const date = new Date(item.trackTime);
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                  })()}
                </Text>
                <TouchableOpacity
                  style={[styles.tableCell, { backgroundColor: item.isSelected ? 'lightblue' : 'skyblue' }]}
                  onPress={() => handleVehicleDetailsPress(item)}
                >
                  <Text style={styles.tableCellText}>{item.vehicleNo}</Text>
                </TouchableOpacity>

                <Text style={styles.tableCell}>{item.empName}</Text>
                <Text style={styles.tableCell}>{item.zoneName}</Text>
                <Text style={styles.tableCell}>{item.departmentName}</Text>
                <Text style={styles.tableCell}>{item.vehicleTypename}</Text>
                <Text style={styles.tableCell}>{item.flag}</Text>
                <Text style={styles.tableCell}>{item.speed}</Text>
                <TouchableOpacity style={[styles.tableCell, { backgroundColor: item.isSelected ? 'lightblue' : 'skyblue' }]} onPress={() => handleItemPress(item.ignition)}>
                  <Text style={styles.tableCellText}>{item.ignition}</Text>
                </TouchableOpacity>
                <Text style={styles.tableCell}>{item.idleTime}</Text>
                <Text style={styles.tableCell}>{item.nearme}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Modal for Vehicle Location */}
      <Modal animationType="slide" transparent visible={isVehicleModalVisible} onRequestClose={handleCloseVehicleModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: width * 0.9, height: height * 0.8 }]}>
            <Text style={styles.modalTitle}>Vehicle Location</Text>

            {/* Map Container */}
            <View style={[styles.mapContainer, { height: height * 0.6 }]}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: vehicleLocationData?.lat || 26.4499,
                  longitude: vehicleLocationData?.lng || 80.3319,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {/* Marker for Vehicle Location */}
                {vehicleLocationData && vehicleLocationData.lat && vehicleLocationData.lng ? (
                  <Marker
                    coordinate={{
                      latitude: vehicleLocationData.lat,
                      longitude: vehicleLocationData.lng,
                    }}
                    title="Vehicle Location"
                    description={`Vehicle No: ${vehicleModalData?.vehicleNo}`}
                    icon={vehicleLocationData.icon} // Use custom icon
                  />
                ) : null}
              </MapView>
            </View>

            {/* Close Button */}
            <TouchableOpacity onPress={handleCloseVehicleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Ignition Details */}
      <Modal animationType="slide" transparent visible={isModalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: width * 0.9, height: height * 0.8 }]}>
            <Text style={styles.modalTitle}>Ignition Details ({selectedItem})</Text>
            <ScrollView horizontal style={styles.horizontalScroll}>
              <ScrollView style={styles.verticalScroll}>
                <View style={styles.tableHeaderRow}>
                  <Text style={styles.tableHeader}>Sr No</Text>
                  <Text style={styles.tableHeader}>Vehicle</Text>
                  <Text style={styles.tableHeader}>Driver</Text>
                </View>

                {modalData.length > 0
                  ? modalData.map((item, index) => renderModalTableRow(item, index))
                  : <Text>No Data Available</Text>}
              </ScrollView>
            </ScrollView>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginLeft: 10,
  },
  tableContainer: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    backgroundColor: '#87CEEB',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 120,
    textAlign: 'center',
    color: "#1B3B5F",
  },
  tableCell: {
    fontSize: 12,
    width: 120,
    textAlign: 'center',
  },
  tableCellText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'blue',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTable: {
    flexDirection: 'column',
  },
  modalTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  modalTableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 120,
    textAlign: 'center',
    color: "#1B3B5F",
  },
  modalTableCell: {
    fontSize: 12,
    width: 120,
    textAlign: 'center',
  },
  horizontalScroll: {
    maxHeight: 400,
  },
  verticalScroll: {
    flexDirection: 'column',
  },
  closeButton: {
    backgroundColor: '#1B3B5F',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
});

export default TodaysVehicle;