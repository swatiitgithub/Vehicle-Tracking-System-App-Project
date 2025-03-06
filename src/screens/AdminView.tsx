import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActionBar from '../components/ActionBar';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const data = [1, 2, 3, 4, 5];

function row(getdata: any) {
    return (
        <View style={{ height: 45, flexDirection: 'row', borderWidth: 1 }}>
            
            <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', borderRightWidth: 1, }} >
                <Text style={styles.textdata}>{getdata}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' ,justifyContent: 'center', }} >
                <Text style={styles.textdata}>{getdata}</Text>
            </View>
        </View>
    )
}
function Header() {
    return (
        <View style={{ height: 46, width: '100%', justifyContent: 'center', backgroundColor: '#5B5EA0' }}>
            <Text style={{ textAlign: 'center', }}>{'Member of Parliament'}</Text>
        </View>
    )
}

function Constituency() {

    return (
        <> 
        <ScrollView>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            </ScrollView>
        </>
    );

}
function JalkalVibhag() {
    return (
        <> 
        <ScrollView>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            </ScrollView>
        </>
    );
}
function Tehsil() {
    return (
        <> 
        <ScrollView>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            </ScrollView>
        </>
    );
}
function Vilage() {
    return (
        <> 
        <ScrollView>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            <Header />
            <View style={{ alignItems: 'center', }}>
                {data.map((data) => {
                    return row(data);
                })}
            </View>
            </ScrollView>
        </>
    );
}

const Tab = createMaterialTopTabNavigator();
export default function AdminView() {
    const route: any = useRoute();
    let { subCategoryName } = route.params.data.subItem;
    return (
        <><ActionBar title={subCategoryName} /><View style={styles.container}></View>

            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { color: '#FFFFFe', fontSize: 11, fontWeight: '700' },
                    tabBarItemStyle: { flex: 1, borderRightWidth: 1, borderColor: '#FFFFFF' },
                    tabBarStyle: { backgroundColor: '#5B5EA0', borderWidth: 1, borderColor: '#FFFFFF' },
                    tabBarPressColor: 'blue',
                    tabBarActiveTintColor: 'white',
                }}>

                <Tab.Screen name={'Constituency'} component={Constituency} />
                <Tab.Screen name='Jalkal Vibhag' component={JalkalVibhag} />
                <Tab.Screen name='Tehsil' component={Tehsil} />
                <Tab.Screen name='Vilage & Panchayat' component={Vilage} />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    textdata: {
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center',
    }
});