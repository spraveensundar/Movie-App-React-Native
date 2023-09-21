import { View, Text, ScrollView, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import {fallbackPersonImage, image185 } from '../api/moivedb';


export default function Cast({cast,navi}) {

  //const PersonName ="Keanu Reeves";

  //const ActorName ="John Wick"  

  return (
    <View>
      <Text className="text-white text-xl mx-5 my-4">Top Cast</Text>

      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}>
        {
            cast && cast.map((person, index)=>{
                return(
                    <TouchableOpacity 
                    key={index}
                    className="items-center mb-5"
                    onPress={()=>navi.navigate("Person",person)}>
                        <View className="overflow-hidden rounded-full mx-5 h-20 w-30  border border-neutral-500">
                           <Image className="w-20 h-20 rounded-2xl"
                           // source={require("../assets/images/castImage1.png")
                            source={{uri: image185(person?.profile_path)||fallbackPersonImage}}/> 
                        </View>

                        <Text className="text-white text-l text-center ">

                          {
                              person?.character.length>10? person?.character.slice(0,10)+"...":person?.character
                             
                          }
                          
                        </Text>

                        <Text className="text-neutral-400">

                          {
                              person?.original_name.length>10? person?.original_name.slice(0,10)+"...":person?.original_name
                          }

                          </Text>
        
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}