import React from 'react'
import { View,
Text,
TouchableOpacity,
Dimensions,
Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moivedb';

var {width, height} = Dimensions.get('window')

const TrendingMovie = ({data}) => {
   
  const navigation = useNavigation();

  const handleClick =(item) =>{
    navigation.navigate("Movie",item)
  }
  return (
    <View>
        <Text className="text-white text-xl mx-5 mb-5 mt-3">Latest Release</Text>
         
         <Carousel
         data={data}
         renderItem={({item})=><MovieCard item={item} handleClick={handleClick}/>}
         firstItem={1}
         sliderWidth={width}
         itemWidth={width*0.63}
         slideStyle={{display:'flex', alignItems: 'center',}}
         />

    </View>
  )
}

export default TrendingMovie;

const MovieCard = ({item,handleClick})=>{
  return(
    <TouchableOpacity onPress={()=>handleClick(item)}>
      <Image //source={require("../assets/images/moviePoster1.png")}
               source={{uri:image500(item.poster_path)}}
             style={{
                 width:width*0.6,
                 height:height*0.4
             }}
             className="rounded-3xl"/>
    </TouchableOpacity>
  )
}


