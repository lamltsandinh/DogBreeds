import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColor } from '../utils';
import { appStyle, color } from '../theme'
import constant from '../constant';

export default class Animation extends Component {
    constructor(props) {
        super(props)
        this.spinValue = new Animated.Value(0)
    }

    render = () => {
        const { style } = this.props
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <Animated.View
                style={[style, { backgroundColor: 'transparent', transform: [{ rotate: spin }] }]}>
                <Ionicons
                    name='md-paw'
                    size={constant.icon.BIG}
                    style={styles.appPadding} />
            </Animated.View>

        )
    }

    componentDidMount() {
        this.aniLogo();
    }

    aniLogo() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.aniLogo())
    }


}
const styles = StyleSheet.create({
    ...appStyle
})