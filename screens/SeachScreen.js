import { View, Text,TouchableWithoutFeedback, SafeAreaView,Dimensions ,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native'
import React,{useCallback, useState}from 'react';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { debounce} from 'lodash';
import { fallbackMoviePoster, image500, searchMoives } from '../api/moivedb';



const {width , height} = Dimensions.get("window")

export default function SeachScreen() {

    const [result,setResult]=useState([]);
    const navigation = useNavigation()
   // const MoiveName="Ant-Man and the Wasp:Quantumania"

    const handleSearch = value=>{
        
        if(value && value.length >2){
            searchMoives({
                query: value,
                 include_adult: 'false', 
                 language: 'en-US',
                  page: '1'
            }).then(data=>{
                //console.log(data)
                if(data && data.results) setResult(data.results)
            })
        }else{
            setResult([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400),[])




  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
        <View
        className="mx-5 mt-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
            <TextInput
             onChangeText={handleTextDebounce}
            placeholder='Search Movie'
            placeholderTextColor={"lightgray"}
            className="pl-5 pb-2 text-base  text-white"/>
            <TouchableOpacity onPress={()=>navigation.navigate("Home")} className="rounded-full p-3 bg-neutral-500 m-1">
                <XMarkIcon size={20} color="white"/>
            </TouchableOpacity>
        </View>

        {
            result.length > 0 ?(
                <ScrollView
        showsVerticalScrollIndicator={false}>

            <View className="mt-3 mx-5">
                <Text className="text-xl text-white">Results({result.length})</Text>
            </View>

            <View className="flex-row justify-between mx-5 mt-4 flex-wrap">
                {
                    result.map((item,index)=>{
                        return(
                           <TouchableWithoutFeedback
                           onPress={()=>navigation.navigate("Home",item)}
                           key={index}>
                             <View className="mb-4">
                                <Image //source={require('../assets/images/moviePoster1.png')}
                                        source={{uri:image500(item?.poster_path) || fallbackMoviePoster}}
                                style={{width:width*0.4,height:height*0.3}}/>
                                <Text className="text-white text-center">{item?.title.length > 22 ? item?.title.slice(0,20)+"...":item?.title}</Text>
                            </View>
                            
                           </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
        </ScrollView>
            ):(
                <View className="flex-row justify-center">
                   <Image source={require("../assets/images/movieTime.png")}
                   className="h-96 0 w-96"/>
                </View>
            )
        }

    </SafeAreaView>

   
  )
}