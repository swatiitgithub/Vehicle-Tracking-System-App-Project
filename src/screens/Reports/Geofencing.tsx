import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, TextInput, Button, Text, Switch, Modal, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const Geofencing = () => {
    const [vehicles, setVehicles] = useState([]);
    const [center, setCenter] = useState({
        latitude: 26.4499, // Kanpur's latitude
        longitude: 80.3319, // Kanpur's longitude
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // State for input fields
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [radius, setRadius] = useState('');
    const [fenceName, setFenceName] = useState('');
    const [showExisting, setShowExisting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [zones, setZones] = useState([]);

    // Ref for synchronizing horizontal scroll
    const headerScrollRef = useRef<ScrollView>(null);
    const dataScrollRef = useRef<ScrollView>(null);

    const getDashData = () => {
        const collectData = {
            fencId: null,
            fenceName: null,
            lsVehType: [],
            lsVehNos: [],
            dateSaveFr: new Date().toISOString(),
            dateSaveTo: new Date().toISOString(),
        };

        axios.post('http://103.12.1.132:8166/api/NTRead/GetDashData', collectData)
            .then((res) => {
                const arr = res?.data?.data?.listNTSumm.map((item: any) => ({
                    vehicleNo: item.vehicleno || "No ID",
                    lat: item.lattitude,
                    lng: item.longitude,
                    id: item.id,
                    speed: item.speed,
                    tracktime: formatTrackTime(item.tracktime),
                    departmentname: item.departmentname,
                    empName: item.empName,
                    vehicleTypename: item.vehicleTypename,
                    icon: item.speed === 0
                        ? "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-red-truck-transportation-png-image_11507611.png"
                        : "https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-green-truck-transport-png-image_11508688.png",
                }));
                setVehicles(arr);
                setCenter(calculateCenter(arr));

                if (arr.length > 0) {
                    adjustZoomLevel(arr);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const formatTrackTime = (tracktime: any) => {
        // Implement your logic to format track time
        return tracktime;
    };

    const calculateCenter = (arr: any) => {
        if (arr.length === 0) return center;

        const lat = arr.reduce((sum: any, item: any) => sum + item.lat, 0) / arr.length;
        const lng = arr.reduce((sum: any, item: any) => sum + item.lng, 0) / arr.length;

        return {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };
    };

    const adjustZoomLevel = (arr: any) => {
        // Implement your logic to adjust zoom level based on the markers
    };

    // Update latitude, longitude, and radius on map region change
    const handleMapRegionChange = (region: any) => {
        setLatitude(region.latitude.toFixed(6));
        setLongitude(region.longitude.toFixed(6));
        // Calculate radius based on latitudeDelta (approximation)
        const radiusInMeters = (region.latitudeDelta * 111320).toFixed(2); // 1 degree ≈ 111,320 meters
        setRadius(radiusInMeters);
    };

    const handleSaveFencing = () => {
        // Implement your logic to save the fencing
        console.log('Fencing Saved:', { latitude, longitude, radius, fenceName });
    };

    const fetchZonesData = async () => {
        try {
            const collectData = {
                orderby: "",
                pageNo: 0,
                pageSize: 0,
                intnotnullvalue1: 0,
                userId: "",
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
                data: "",
                success: true,
                error: "",
                selectPerindex: 0,
                show: true,
            };
            const response = await axios.post('http://103.12.1.132:8166/api/GeoFencing/GetGeofencing', collectData);
            const data = response?.data?.data;

            // Ensure the API response has the required fields
            const zonesWithIds = data.map((zone: any, index: any) => ({
                ...zone,
                serialNo: index + 1,
                id: index + 1,
                fenceName: zone.fenceName || "N/A",
                latitude: zone.latitude || "N/A",
                longitude: zone.longitude || "N/A",
                radius: zone.radius || "N/A",
                polygon: zone.polygon || "N/A",
            }));
            setZones(zonesWithIds);
        } catch (error) {
            console.error('Error fetching zones data:', error);
        }
    };

    // Synchronize horizontal scrolling of header and data
    const handleHeaderScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        if (dataScrollRef.current) {
            dataScrollRef.current.scrollTo({ x: offsetX, animated: false });
        }
    };

    const handleDataScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        if (headerScrollRef.current) {
            headerScrollRef.current.scrollTo({ x: offsetX, animated: false });
        }
    };

    useEffect(() => {
        getDashData();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={center}
                region={center}
                onRegionChangeComplete={handleMapRegionChange} // Auto-fill lat, long, and radius on map scroll
            >
                {vehicles.map((vehicle: any) => (
                    <Marker
                        key={vehicle.id}
                        coordinate={{ latitude: vehicle.lat, longitude: vehicle.lng }}
                        title={vehicle.vehicleNo}
                        description={`Speed: ${vehicle.speed}, Department: ${vehicle.departmentname}`}
                    >
                        <View style={styles.marker}>
                            <Image
                                source={{ uri: vehicle.icon }}
                                style={styles.icon}
                            />
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Input fields at the bottom */}
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, styles.flex1]}
                        placeholder="Latitude"
                        value={latitude}
                        onChangeText={setLatitude}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.flex1, styles.marginLeft]}
                        placeholder="Longitude"
                        value={longitude}
                        onChangeText={setLongitude}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, styles.flex1]}
                        placeholder="Radius (meters)"
                        value={radius}
                        onChangeText={setRadius}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.flex1, styles.marginLeft]}
                        placeholder="Fence Name"
                        value={fenceName}
                        onChangeText={setFenceName}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Button
                        title="Save Fencing"
                        onPress={handleSaveFencing}
                    />
                    <View style={styles.checkboxContainer}>
                        <Switch
                            value={showExisting}
                            onValueChange={(value) => {
                                setShowExisting(value);
                                if (value) {
                                    setModalVisible(true);
                                    fetchZonesData();
                                }
                            }}
                        />
                        <Text style={styles.label}>Show Existing</Text>
                    </View>
                </View>
            </View>

            {/* Modal for showing existing zones */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* Header ScrollView (Horizontal Only) */}
                        <ScrollView
                            horizontal
                            ref={headerScrollRef}
                            onScroll={handleHeaderScroll}
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                            style={styles.headerScrollView}
                        >
                            <View style={styles.tableHeaderRow}>
                                <Text style={[styles.tableHeader, { width: 80 }]}>Sr No</Text>
                                <Text style={[styles.tableHeader, { width: 150 }]}>Fence Name</Text>
                                <Text style={[styles.tableHeader, { width: 120 }]}>Latitude</Text>
                                <Text style={[styles.tableHeader, { width: 120 }]}>Longitude</Text>
                                <Text style={[styles.tableHeader, { width: 100 }]}>Radius</Text>
                                <Text style={[styles.tableHeader, { width: 150 }]}>polycord</Text>
                            </View>
                        </ScrollView>

                        {/* Data ScrollView (Vertical and Horizontal) */}
                        <ScrollView
                            horizontal
                            ref={dataScrollRef}
                            onScroll={handleDataScroll}
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                        >
                            <ScrollView
                                style={styles.dataScrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                {zones.map((zone: any) => (
                                    <View key={zone.id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { width: 80 }]}>{zone.serialNo}</Text>
                                        <Text style={[styles.tableCell, { width: 150 }]}>{zone.fenceName}</Text>
                                        <Text style={[styles.tableCell, { width: 120 }]}>{zone.latitude}</Text>
                                        <Text style={[styles.tableCell, { width: 120 }]}>{zone.longitude}</Text>
                                        <Text style={[styles.tableCell, { width: 100 }]}>{zone.radius}</Text>
                                        <Text style={[styles.tableCell, { width: 150 }]}>{zone.polygon}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    marker: {
        width: 30, // Reduced icon size
        height: 30, // Reduced icon size
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    flex1: {
        flex: 1,
    },
    marginLeft: {
        marginLeft: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 8,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%', // Increase the width of the modal
        maxHeight: '80%', // Set a max height for the modal
    },
    headerScrollView: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dataScrollView: {
        width: '100%',
        maxHeight: Dimensions.get('window').height * 0.6, // Adjust height as needed
    },
    tableHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableCell: {
        textAlign: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Geofencing;