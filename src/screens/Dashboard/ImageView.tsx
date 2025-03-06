import React, { Component, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ActionBar from '../../components/ActionBar';
import { hp } from '../../utils/Responsive';
import i18n from '../../utils/i18n';
import { BackButton } from '../../components/BackButton';
import styles from './styles';
import Images from '../../utils/Images';
import Constant from '../../utils/Constant';
import ImageView from 'react-native-image-viewing';
//import Gallery from 'react-native-image-gallery';

const DashboardImageView: React.FC = () => {
    {
        const [imageSilderIndex, setImageSilderIndex] = useState<number>(0);
        const [visibleImage, setVisibleImage] = useState(true);
        const [imageSlider, setImageSlider] = useState<any>([Images.DASHBOARD_IMAGE_VIEW1, Images.DASHBOARD_IMAGE_VIEW2]);

        const images = [
            {
                uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW1).uri,
                
            },
            {
                uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW2).uri,
            },
            {
                uri: Image.resolveAssetSource(Images.DASHBOARD_IMAGE_VIEW3).uri,
            },
        ];
        console.log(images);
        const ImageGallery = () => {

            return (
                <View>
                    {images.length > 0 && (
                        <ImageView
                            images={images}
                            imageIndex={imageSilderIndex}
                            visible={visibleImage}
                            animationType={'fade'}
                            onRequestClose={() => setVisibleImage(false)}/>
                    )}
                </View>
            );
        };

        return (
            <>
                <ImageGallery />
            </>
        );
    }
}
export default DashboardImageView;

