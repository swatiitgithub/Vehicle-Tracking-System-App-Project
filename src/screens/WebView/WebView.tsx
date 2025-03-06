import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ActionBar from '../../components/ActionBar';
import { hp } from '../../utils/Responsive';
import styles from './style';
import i18n from '../../utils/i18n';
import ActionBar1 from '../../components/ActionBar1';

export default class MyWeb extends React.Component {
    render() {

        const webUrl = this.props.route.params.url;
        const name = this.props.route.params.name;

        return (
            <>
                <ActionBar1
                    title={i18n.t(name)} 
                    containerStyle={{
                        height: 70,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    />
                <View style={styles.container}>
                    <WebView
                        startInLoadingState={true}
                        source={{ uri: webUrl }}
                        renderLoading={() => {
                            return <View style={{ flex: 1 }}>
                                <ActivityIndicator size={'large'} />
                            </View>;
                        }}
                    />
                </View>
            </>
        );
    }
}


