import React,{useState,useEffect} from 'react';
import {Text,ScrollView,View,SafeAreaView,TouchableOpacity, Image, Dimensions} from 'react-native';
import { ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/solid';
import { useNavigation,useRoute} from '@react-navigation/native';
import { styles} from '../themes';
import Movie from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185} from '../api/moivedb';


const {width, height} = Dimensions.get("window");
function PersonScreen(){

    
    const{params: item} = useRoute();
    const [isFavourite,toggleFavourite] = useState(false);
    const [personMoive, setPersonMoive] = useState([]);
    const[person,setPerson] = useState({});
    const navigation = useNavigation();

    useEffect(()=>{
      //console.log(item)
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item])


    const getPersonDetails =async id=>{

      const data= await fetchPersonDetails(id);
      //console.log(data)
      if(data) setPerson(data)
    }

    const getPersonMovies = async id=>{

      const data = await fetchPersonMovies(id);
      if(data && data.cast) setPersonMoive(data.cast)
    }
    return(  

        <ScrollView 
        className="flex-1 bg-neutral-900"
        contentContainerStyle={{paddingBottom:20}}>
            
                <SafeAreaView className={"flex-row justify-between items-center px-3 my-4"}>
                   <TouchableOpacity className="p-3 rounded-xl" onPress={()=>navigation.goBack()} style={styles.background}>
                        <ChevronLeftIcon color="#fff"  strokeWidth={2.5} size="23"/>
                   </TouchableOpacity>
    
                   <TouchableOpacity onPress={()=>toggleFavourite(!isFavourite)}>
                        <HeartIcon color={isFavourite ? "red":"#fff"} size="45"/>    
                    </TouchableOpacity>
                 </SafeAreaView>            
<View>
<View className="flex-row justify-center" 
style={{
   shadowColor:'#ffffff',
   shadowRadius:80,
   shadowOffset: {width: 0, height: 5},
   shadowOpacity:0.16,
   elevation:30
}}
>
   <View className="items-center rounded-full overflow-hidden w-82 h-80 border-neutral-500 border-2">
       <Image 
       //source={require("../assets/images/castImage2.png")}
       source={{uri:image185(person?.profile_path) || fallbackPersonImage}}
       style={{width:width*0.74,height:height*0.53}}/>
   </View>
</View>
</View>


<View className="mt-4">
<Text className="text-white text-4xl font-bold text-center">
   {person?.name}
</Text>
<Text className="text-neutral-500 text-center">
   {person?.place_of_birth}
</Text>
</View>


<View className="mx-5 mt-6 p-4 flex-row justify-between bg-neutral-700 rounded-full">

<View className="border-r-2 border-neutral-400 px-3 items-center">
   <Text className="text-white font-semibold">Gender</Text>
   <Text className="text-neutral-300">
      {person?.gender==1 ? "Female":"Male"}
   </Text>
</View>

<View className="border-r-2 border-neutral-400 px-3 items-center">
   <Text className="text-white font-semibold">Birthday</Text>
   <Text className="text-neutral-300">
      {person?.birthday}
   </Text>
</View>

<View className="border-r-2 border-neutral-400 px-3 items-center">
   <Text className="text-white font-semibold">Known for</Text>
   <Text className="text-neutral-300">
      {person?.known_for_department}
   </Text>
</View>

<View className="px-2 items-center">
   <Text className="text-white font-semibold">Popularity</Text>
   <Text className="text-neutral-300">
       {person?.popularity?.toFixed(2)+"%"}   
   </Text>
</View>
</View>

<View className="my-6 mx-5">
<Text className="text-white text-lg font-bold">Biography</Text>
<Text className="mt-4 text-neutral-300">
{
   person?.biography || "N/A"
}
</Text>
</View>


<Movie title="Movie" hideSeeAll={true} data={personMoive}/>   

</ScrollView>
                 
    )
}


export default PersonScreen;