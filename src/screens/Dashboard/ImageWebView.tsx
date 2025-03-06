import React, { useState} from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ActionBar from '../../components/ActionBar';
import { hp, wp } from '../../utils/Responsive';
import i18n from '../../utils/i18n';

import Images from '../../utils/Images';
import ImageView from 'react-native-image-viewing';
import { useRoute } from '@react-navigation/native';
import Constant from '../../utils/Constant';

const ImageWebView : React.FC = () => {
        const route: any = useRoute();
        const webUrl = route.params.url;
        const name = route.params.name;
        const [visibleImage, setVisibleImage] = useState(false);
        const [visibleButton, setVisibleButton] = useState(false);
        console.log("url" + name);
        const FeedbackButton = () => {
            console.log(visibleButton)
            return (
                <View style={{
                    position: 'absolute',
                    width: wp('25'),
                    bottom: hp('4'),
                    right: wp('3'),
                }}>
                    {visibleButton? (
                    <Button
                        title={'Gallery'}
                        colorScheme={'blue'}
                        size={'md'}
                        rounded={'3xl'}
                        onPress={ImageGalleryFun}>
                    </Button>
                    ):null}
                </View>
            );
        };
        const ImageGalleryFun = () => {
            setVisibleImage(true);
        };

        const ImageGallery = () => {
            console.log("Pressed");
            if(name=='DashBoard.greenPark')
            {
                setVisibleButton(true);
                return (
                <View>
                    {Constant.GREEN_PARK_IMAGES.length > 0 && (
                        <ImageView
                            images={Constant.GREEN_PARK_IMAGES}
                            imageIndex={0}
                            visible={visibleImage}
                            animationType={'fade'}
                            onRequestClose={() => setVisibleImage(false)}/>
                    )}
                </View>
            );}
            else if(name=='DashBoard.nanaRaoPark')
            {
                setVisibleButton(true);
                return (
                <View>
                    {Constant.NANA_RAO_PARK.length > 0 && (
                        <ImageView
                            images={Constant.NANA_RAO_PARK}
                            imageIndex={0}
                            visible={visibleImage}
                            animationType={'fade'}
                            onRequestClose={() => setVisibleImage(false)}/>
                    )}
                </View>
            );}
            else if(name=='DashBoard.CONVENTION')
            {
                setVisibleButton(true);
                return (
                <View>
                    {Constant.CONVENTION_CENTRE.length > 0 && (
                        <ImageView
                            images={Constant.CONVENTION_CENTRE}
                            imageIndex={0}
                            visible={visibleImage}
                            animationType={'fade'}
                            onRequestClose={() => setVisibleImage(false)}/>
                    )}
                </View>
            );}
            else 
                return(
                    <View>
                    </View>
                )
        };

        return (
            <>
                <ActionBar
                    title={i18n.t(name)}
                    containerStyle={{
                        height: 70,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                />
                <View style={{flex:1}}>
                    <WebView
                        startInLoadingState={true}
                        source={{ uri: webUrl }}
                        renderLoading={() => {
                            return <View style={{ flex: 1 }}>
                                <ActivityIndicator size={'large'} />
                            </View>;
                        }}
                    />
                    <FeedbackButton/>
                    <ImageGallery/>
                </View>
            </>
        );
}
export default ImageWebView;


