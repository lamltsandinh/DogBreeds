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

// source at https://dog.ceo/dog-api/
const URL_GET_BREEDDOG = 'https://dog.ceo/api/breeds/list'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrBreedDogs: [],
            textSearch: '',
        }
        this.spinValue = new Animated.Value(0)
    }

    renderHeader = () => {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.header}>
                <Animated.View
                    style={[styles.headerLogo, { transform: [{ rotate: spin }] }]}>
                    <Ionicons
                        name='md-paw'
                        size={constant.icon.BIG}
                        style={styles.appPadding} />
                </Animated.View>
                <Text style={styles.headerTitle}>List all breed names</Text>
            </View>
        )
    }

    renderSearch = () => {
        const { textSearch } = this.state;
        return (
            <View style={{
                marginHorizontal: constant.MARGIN_HOR * 2,
                marginVertical: constant.MARGIN_VER
            }}>
                <View style={styles.appHor}>
                    <Ionicons
                        name='ios-search-outline'
                        size={constant.icon.NOMAL} />
                    <TextInput
                        style={styles.inputSearch}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.setState({
                            textSearch: text.toLowerCase()
                        })}
                        value={textSearch}
                        placeholderTextColor='gray'
                        placeholder='Search Name'
                    />
                </View>
                <View style={styles.appHor}>
                    {Array.from({ length: 360 }, (v, i) => i).map(v =>
                        <View
                            key={v}
                            style={[styles.aPixelColor, { backgroundColor: getColor(360, v) }]} />)
                    }
                </View>
            </View>
        )
    }

    renderContext = () => {
        const { arrBreedDogs, textSearch } = this.state;

        //finter after search value
        let dataSource = arrBreedDogs.filter(item => item.indexOf(textSearch) != -1);

        return (
            <ScrollView>
                <View style={styles.arrNameBreedDogs}>
                    {dataSource.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.itemNameBreedDogs,
                                { backgroundColor: getColor(dataSource.length, index), }
                            ]}
                            onPress={() => this.props.navigation.navigate('detail',
                                { name: item })}>
                            <Text style={styles.appText}>{`#${item}`}</Text>
                        </TouchableOpacity>)}
                </View >
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={appStyle.appScreen}>
                {this.renderHeader()}
                {this.renderSearch()}
                {this.renderContext()}
            </View >
        );
    }

    componentDidMount() {
        this.aniLogo();
        this.handerGetArrBreedDogs();
    }

    handerGetArrBreedDogs = () => {
        fetch(URL_GET_BREEDDOG)
            .then(response => response.json())
            .then(response => {
                this.setState({ arrBreedDogs: response.message });
            });
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
    ...appStyle,
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLogo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: constant.font.LOGO,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    inputSearch: {
        flex: 1,
        height: 40,
        textAlign: 'center',
        color: color.text,
        fontSize: constant.font.NOMAL
    },
    aPixelColor: {
        width: (constant.APP_WIDTH - 40) / 360,
        height: 3
    },
    arrNameBreedDogs: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },

})