import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions, ScrollView,
  Animated,
  Easing
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import { getColor, getRandomColor } from '../utils';
import { appStyle, color } from '../theme'
import constant from '../constant';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrImgDogs: [],
    };
  }

  renderHeader = () => {
    const name = this.props.navigation.state.params.name;
    return (
      <View style={[styles.itemNameBreedDogs, { backgroundColor: getRandomColor(), flex: undefined }]}>
        <Text style={styles.headerText}>{`#${name}`}</Text>
      </View>
    )
  }

  renderContext = () => {
    const { arrImgDogs } = this.state;

    const arrItem = arrImgDogs.map((item, index) => {
      return (
        <View key={item} style={[styles.appShadow, { backgroundColor: getRandomColor() }]}>
          <Image source={{ uri: item }} style={styles.itemImage} />
        </View>
      );
    })

    return (
      <View>
        <Carousel
          inactiveSlideOpacity={0.6}
          ref={(carousel) => { this.carousel = carousel; }}
          sliderWidth={constant.APP_WIDTH}
          itemWidth={constant.APP_WIDTH - 54}
          sliderHeight={constant.APP_WIDTH}
          itemHeight={constant.APP_WIDTH}>
          {arrItem}
        </Carousel>
      </View>

    )
  }

  renderFonter = () => {
    return (
      <View style={styles.fonter}>
        <TouchableOpacity style={styles.fab} onPress={() => this.carousel.snapToPrev({ animated: true })}>
          <Ionicons name='ios-arrow-round-back' size={constant.icon.NOMAL} color={color.access} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name='ios-paw-outline' size={constant.icon.NOMAL} color={color.access} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fab} onPress={() => this.carousel.snapToNext({ animated: true })}>
          <Ionicons name='ios-arrow-round-forward' size={constant.icon.NOMAL} color={color.access} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.const}>
        {this.renderHeader()}
        {this.renderContext()}
        {this.renderFonter()}
      </View >
    );
  }

  componentDidMount() {
    this.handleGETarrImg();
  }

  handleGETarrImg = () => {
    let URL = `https://dog.ceo/api/breed/${this.props.navigation.state.params.name}/images`
    fetch(URL)
      .then(response => response.json())
      .then(response => {
        this.setState({ arrImgDogs: response.message })
      }).catch(error => console.log(error));
  }
}
const styles = StyleSheet.create({
  ...appStyle,
  const: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 20
  },
  itemImage: {
    width: constant.APP_WIDTH - 60,
    height: constant.APP_WIDTH,
  },
  headerText: {
    fontSize: constant.font.BIG,
    fontWeight: 'bold'
  },
  fab: {
    ...appStyle.appShadow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: getRandomColor(),
  },
  fonter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  }
});