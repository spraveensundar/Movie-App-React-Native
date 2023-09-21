import { View,Dimensions,ActivityIndicator} from 'react-native'
import React, { Component } from 'react';
import { theme } from '../themes';

const {width, height} =  Dimensions.get('window');

export default class Loading extends Component {
  render() {
    return (
     <>
<View style={{height, width}} className="absolute flex-row justify-center items-center">
       <ActivityIndicator size={100} color={theme.background}/>
</View>
</>
    )
  }
}