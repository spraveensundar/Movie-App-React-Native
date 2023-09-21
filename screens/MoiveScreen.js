import React, { useState,useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {View,ScrollView,SafeAreaView,TouchableOpacity,Image,Dimensions,Text} from 'react-native';
import {ChevronLeftIcon,HeartIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../themes';
import Cast from '../components/cast';
import Loading from '../components/loading';
import Movie from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moivedb';





const {width,height} = Dimensions.get("window");


function MoiveScreen(){

    const {params: item} =useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const [cast,setCast] = useState([]);
    const [similarMovie,setSimilarMoive] =useState([]);
    const [movie,setMovie]= useState({});
    const[loading, setLoading] =useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        //console.log(item.id)
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovie(item.id);
    },[item]);

    const getMovieDetails = async id =>{

        const data = await fetchMovieDetails(item.id);
        //console.log("I got it movies",data.poster_path);
        if(data) setMovie(data);     
    }

    const getMovieCredits = async id =>{

        const data = await fetchMovieCredits(item.id);
        if(data && data.cast) setCast(data.cast);
    }

    const getSimilarMovie= async id=>{
        const data = await fetchSimilarMovies(item.id);
        //console.log("Similar",data)
        if(data && data.results) setSimilarMoive(data.results)
    }




    // const MoiveName ="Ant-Man and the Wasp:Quantumania"
    return(

        <ScrollView
            contentContainerStyle={{paddingBottom:20}}
             className="flex-1 bg-neutral-900">

            <View className="w-full">
                
            <SafeAreaView className={"absolute w-full z-20 flex-row justify-between items-center px-3 my-4"}>
               <TouchableOpacity className="p-3 rounded-xl" onPress={()=>navigation.goBack()} style={styles.background}>
                    <ChevronLeftIcon color="#fff"  strokeWidth={2.5} size="23"/>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>toggleFavourite(!isFavourite)}>
                    <HeartIcon color={isFavourite ? "red":"#fff"} size="45"/>    
                </TouchableOpacity>
             </SafeAreaView>

             {
                loading? (
                    <Loading />
                ):(
                    <View>
                    <Image //source={require("../assets/images/moviePoster2.png")} 
                          source={{uri: image500(movie?.poster_path) ||fallbackMoviePoster}}
                     style={{width,height:height*0.60}}/>

                 <LinearGradient
                   colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                   style={{width, height: height*0.40}}
                   start={{ x: 0.5, y: 0 }}
                   end={{ x: 0.5, y: 1 }}
                   className="absolute bottom-0"/>   
             </View>
                )
             }

            <View style={{marginTop:-(height*0.09)}} className="space-y-2 m-2">
 
                <Text className="text-white text-center text-4xl font-bold tracking-wider">
                    { movie?.title}
                </Text>

                {
                    movie?.id?(
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                          {movie?.status}-{movie?.release_date?.split("-")[0]}-{movie?.runtime} min
                        </Text>
                    ):null
                }
                

            </View>


            <View className="flex-row justify-center my-2 mb-3  space-x-4">

               {

                  movie?.genres?.map((genre, index)=>{
                    return(
                        <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                        {genre?.name}  
                        </Text>
                    )
                  })
               }


                {
                /* <Text className="text-neutral-400 font-semibold text-base text-center">
                 Thrill  
                </Text>


                <Text className="text-neutral-400 font-semibold text-base text-center">
                 Comedy  
                </Text> 
                */}
            </View>

            <View>
                <Text className="text-neutral-400 mx-5 tracking-wider">
                     {
                        movie?.overview
                     }
               </Text>
            </View>

            <Cast navi={navigation} cast={cast}/>
          

           <Movie title="Similar Movies" hideSeeAll={true} data={similarMovie}/>

            </View> 
        </ScrollView>
    )
}

export default MoiveScreen;