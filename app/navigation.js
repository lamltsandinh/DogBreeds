import React, { Component } from 'react';
import home from './screens/home'
import detail from './screens/detail'
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { appStyle, color } from './theme'
import constant from './constant'
export default StackNavigator({
    home: {
        screen: home,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
    detail: {
        screen: detail,
    },

}, {
        headerMode: 'none',
        cardStyle: {
            paddingTop: Constants.statusBarHeight,
            backgroundColor: color.bg_app,
        }
    });