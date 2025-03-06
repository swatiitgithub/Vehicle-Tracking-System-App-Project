import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionBar from '../../components/ActionBar';
import { colors } from '../../config/theme/theme';

function VehicleHistory() {
  const [trackDate, setTrackDate] = useState(new Date());
  const [selectedVehicleNo, setSelectedVehicleNo] = useState('');
  const [selectedSpeed, setSelectedSpeed] = useState('1x');
  const [vehicleNos, setVehicleNos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [center, setCenter] = useState({
    latitude: 26.4499, // Latitude for Kanpur
    longitude: 80.3319, // Longitude for Kanpur
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isMapModalVisible, setMapModalVisible] = useState(false); // State for modal visibility
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState<any>(null); // State for selected vehicle details
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]); // State for route coordinates
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0); // State for current position in the route
  const mapRef = useRef<MapView>(null); // Ref for MapView

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
          const arr = res.data.data.map((item: any) => ({
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

  // Speed dropdown options
  const speedOptions = [
    { label: '1x', value: '1x' },
    { label: '2x', value: '2x' },
    { label: '3x', value: '3x' },
    { label: '4x', value: '4x' },
  ];

  // Fetch map data based on selected vehicle, date, and speed
  const getMapData = () => {
    const collectData = {
      where: selectedVehicleNo ? selectedVehicleNo : "",
      orderby: "",
      pageNo: 0,
      pageSize: 0,
      intnotnullvalue1: 0,
      userId: "",
      parameterValues: [""],
      str1: "",
      str2: "",
      str3: "",
      str4: trackDate.toISOString(),
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
      data: "",
      success: true,
      error: "",
      selectPerindex: 0,
      show: true,
    };

    setLoading(true);
    axios
      .post('http://103.12.1.132:8166/api/vVehicletrackHis/GetvVehicletrackHis', collectData)
      .then((res) => {
        const arr = res?.data?.data?.map((item: any) => ({
          vehicleNo: item?.vehicleNo,
          lat: item.lattitude,
          lng: item.longitude,
          id: item.id,
          speed: item.speed * parseInt(selectedSpeed.replace('x', '')), 
          tracktime: item.trackTime ? formatTrackTime(item.trackTime) : "",
          empMobileNo: item.empMobileNo,
          empName: item.empName,
          icon:
            item.speed === 0
              ? "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-red-truck-transportation-png-image_11507611.png"
              : "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-green-truck-transport-png-image_11508688.png",
        }));

        setLoading(false);
        setVehicles(arr);
        setCenter(calculateCenter(arr));

        if (arr.length > 0) {
          adjustZoomLevel(arr);
        }

        // Set route coordinates for Polyline
        const coordinates = arr.map((vehicle: any) => ({
          latitude: vehicle.lat,
          longitude: vehicle.lng,
        }));
        setRouteCoordinates(coordinates);

        // Open the modal after fetching data
        setMapModalVisible(true);

        // Start animation for the vehicle
        startVehicleAnimation(arr);
      })
      .catch((error) => {
        console.error('Error fetching map data:', error);
        setLoading(false);
      });
  };

  // Helper function to calculate the center of the map based on the vehicles
  const calculateCenter = (vehicles: any) => {
    if (vehicles.length === 0) return center;

    const latitudes = vehicles.map((v: any) => v.lat);
    const longitudes = vehicles.map((v: any) => v.lng);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) * 1.5,
      longitudeDelta: (maxLng - minLng) * 1.5,
    };
  };

  // Helper function to adjust the zoom level based on the vehicles
  const adjustZoomLevel = (vehicles: any) => {
    if (vehicles.length === 0) return;

    const latitudes = vehicles.map((v: any) => v.lat);
    const longitudes = vehicles.map((v: any) => v.lng);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    setCenter({
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) * 1.5,
      longitudeDelta: (maxLng - minLng) * 1.5,
    });
  };

  // Helper function to format track time
  const formatTrackTime = (trackTime: any) => {
    // Implement your track time formatting logic here
    return trackTime;
  };

  // Function to handle marker click
  const handleMarkerClick = (vehicle: any) => {
    setSelectedVehicleDetails(vehicle);
  };

  // Function to start vehicle animation
  const startVehicleAnimation = (vehicles: any[]) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < vehicles.length - 1) {
        setCurrentPositionIndex(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000 / parseInt(selectedSpeed.replace('x', ''))); // Adjust speed based on selected speed
  };

  useEffect(() => {
    getVehicleNo();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ActionBar title="Vehicle History" containerStyle={{ backgroundColor: colors.red.DASHBOARD_HEADER_BACKGROUND }} />
      </View>

      {/* Track Date Input */}
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={styles.dateText}>{trackDate.toDateString()}</Text>
          <Icon name="calendar-today" size={20} color="#6200ee" />
        </TouchableOpacity>
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={trackDate}
          onConfirm={(date) => {
            setDatePickerVisibility(false);
            setTrackDate(date);
          }}
          onCancel={() => {
            setDatePickerVisibility(false);
          }}
        />
      </View>

      {/* Vehicle Number and Speed Dropdowns in a row */}
      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.flex1]}>
          <Picker
            selectedValue={selectedVehicleNo}
            onValueChange={(itemValue) => setSelectedVehicleNo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Vehicle No" value="" />
            {vehicleNos.map((item: any) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <View style={[styles.inputContainer, styles.flex1]}>
          <Picker
            selectedValue={selectedSpeed}
            onValueChange={(itemValue) => setSelectedSpeed(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Speed" value="" />
            {speedOptions.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Playback Button */}
      <View style={styles.playbackButtonContainer}>
        <Button
          mode="contained"
          onPress={getMapData}
          style={styles.playbackButton}
          loading={loading}
          disabled={loading}
        >
          Playback
        </Button>
      </View>

      {/* Modal for Map */}
      <Modal
        visible={isMapModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMapModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMapModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>

            {/* Map */}
            <MapView
              ref={mapRef}
              style={styles.map}
              region={center}
            >
              {/* Polyline to connect the vehicles */}
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#0000FF" // Blue color for the route line
                strokeWidth={2}
              />

              {/* Marker for the current position of the vehicle */}
              {vehicles.length > 0 && currentPositionIndex < vehicles.length && (
                <Marker
                  coordinate={{
                    latitude: vehicles[currentPositionIndex].lat,
                    longitude: vehicles[currentPositionIndex].lng,
                  }}
                  title={vehicles[currentPositionIndex].vehicleNo}
                  description={`Speed: ${vehicles[currentPositionIndex].speed}, Time: ${vehicles[currentPositionIndex].tracktime}`}
                  onPress={() => handleMarkerClick(vehicles[currentPositionIndex])}
                >
                  <Image
                    source={{ uri: vehicles[currentPositionIndex].icon }}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                </Marker>
              )}

              {/* Arrows along the route */}
              {routeCoordinates.map((coord, index) => {
                if (index < routeCoordinates.length - 1) {
                  const nextCoord = routeCoordinates[index + 1];
                  const angle = Math.atan2(nextCoord.latitude - coord.latitude, nextCoord.longitude - coord.longitude) * (180 / Math.PI);
                  return (
                    <Marker
                      key={index}
                      coordinate={coord}
                      rotation={angle}
                    >
                      <Icon name="arrow-forward" size={20} color="#0000FF" />
                    </Marker>
                  );
                }
                return null;
              })}
            </MapView>

            {/* Vehicle Details Popup */}
            {selectedVehicleDetails && (
              <View style={styles.vehicleDetailsPopup}>
                <Text style={styles.vehicleDetailsText}>Vehicle No: {selectedVehicleDetails.vehicleNo}</Text>
                <Text style={styles.vehicleDetailsText}>Speed: {selectedVehicleDetails.speed}</Text>
                <Text style={styles.vehicleDetailsText}>Employee Mobile No: {selectedVehicleDetails.empMobileNo}</Text>
                <Text style={styles.vehicleDetailsText}>Employee Name: {selectedVehicleDetails.empName}</Text>
                <TouchableOpacity
                  style={styles.closePopupButton}
                  onPress={() => setSelectedVehicleDetails(null)}
                >
                  <Text style={styles.closePopupButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginBottom: 10,
  },
  dateContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
    marginRight: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  playbackButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  playbackButton: {
    width: '50%',
    backgroundColor: '#0EA293',
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  vehicleDetailsPopup: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  vehicleDetailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closePopupButton: {
    backgroundColor: '#0EA293',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closePopupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VehicleHistory;