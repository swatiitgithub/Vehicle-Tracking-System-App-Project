import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Text, View } from "native-base"
import React, { ReactElement, useEffect, useState } from "react";
import { ImageBackground, ActivityIndicator, StyleSheet } from "react-native";
import ActionBar from "../../components/ActionBar";
import { LIST_OBJECT, LIST_BG } from "../../types";
import Constant from "../../utils/Constant";
import Images from "../../utils/Images";
import { fontSize, hp, wp } from '../../utils/Responsive';
import TicketCard from "./TicketCard";


const TicketList: React.FC = () => {
    const data = Constant.TICKET_CARD;
    const navigation = useNavigation();

    
    const onPress = (data: any): void => {
        console.log('onPress');
        console.log(data.url);
        navigation.navigate('MyWeb', data)
    }

    const renderItemCard = ({ item }: any): ReactElement => {
        return <TicketCard item={item} onPress={onPress} />
    }



    return (
        <>
            <ImageBackground style={{ flex: 1 }} source={Images.BG_1}>
            <ActionBar
                title={'Tickets'}
            />

            <FlatList
                data={data}
                renderItem={renderItemCard}
                contentContainerStyle={{
                    paddingBottm: 30
                }}

            />

            </ImageBackground>
        </>
    )
}

export default TicketList;