import { useNavigation } from "@react-navigation/native";
import { Text, View } from "native-base"
import React, { } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import Constant from "../../utils/Constant";
import i18n from "../../utils/i18n";
import styles from "./styles";
import Fontisto from 'react-native-vector-icons/Fontisto';



const Population: any = () => {
    const navigation = useNavigation();
    const onWebService = (urlData: any) => {
        navigation.navigate('MyWeb', urlData);
    };
    return (
        <>
            <View style={styles.deskBox2}>
                <Text style={styles.textHead}>{i18n.t('DashBoard.population')}</Text>
            </View>
            <View style={[styles.deskBox, { flex: 1 }]}>
                {Constant.POPULATION_DATA.map(item => {
                    return (
                        <View style={styles.populationView}>
                            <TouchableOpacity onPress={() => onWebService(item)}>
                                <Fontisto name={item.icon} size={25} color={Colors.dashBoardIconColor}>
                                    <View>
                                        <Text style={styles.textHead2}>{item.data}</Text>
                                    </View>
                                </Fontisto>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </>
    )
}

export default Population;