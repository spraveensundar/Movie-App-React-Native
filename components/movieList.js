import React from 'react';
import { Text,TouchableWithoutFeedback,View, Image, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moivedb';


var {width,height} = Dimensions.get("window")


function Movie({title,data,hideSeeAll}){

    // const moiveName = "Ant-Man and Wasp: Quantumania"

    const navigation =useNavigation();
    return(
        
       <View className="mb-5">

             <View className="flex-row justify-between items-center mx-6 my-2">
                 <Text className="text-white text-xl  mb-3">{title}</Text>

                 {
                   !hideSeeAll && (
                    <TouchableOpacity>
                        <Text className="text-xl text-yellow-400">View All</Text>
                   </TouchableOpacity>
                   )
                 }
                 
            </View>

         

         <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         >
            {
                data.map((item, index) =>{
                  return(
                    <TouchableWithoutFeedback 
                    key={index}
                    onPress={()=> navigation.navigate("Movie",item)}>
                        <View className="space-y-1 mr-4">
                            <Image  className="rounded-xl" //source={require('../assets/images/moviePoster2.png')} 
                             source={{uri:image185(item.poster_path) || fallbackMoviePoster}}
                            style={{width:width*0.4,height:height*0.3}}/>
                        <Text className="text-neutral-300 text-center">
                          {
                            item.title.length>14? item.title.slice(0,14)+'...': item.title
                          }
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                  )   
                })
            }

         </ScrollView>
          
          

       </View>
    )
}

export default Movie;

