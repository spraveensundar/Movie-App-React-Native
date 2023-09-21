import React,{useEffect, useState} from 'react';
import { View,Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { Bars3BottomLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../themes';
import TrendingMovie from '../components/trendingMovie';
import Movie from '../components/movieList';
import Loading from '../components/loading';
import { fetchPopularMovieList, fetchTrendingMovieList, fetchUpComingMovieList } from '../api/moivedb';


export default function HomeScreen(){

  const [trending,setTrending] = useState([])
  const[upcoming,setUpcoming] = useState([])
  const[rate,setRate] = useState([]);
  const[loading, setLoading] =useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    getTrendingMovie();
    getUpComingMovie();
    getPopularMovie();
  },[])

  const getTrendingMovie = async ()=>{

    const data = await fetchTrendingMovieList();
    if(data && data.results) setTrending(data.results);
  }


  const getUpComingMovie = async ()=>{

    const data = await fetchUpComingMovieList();
    if(data && data.results) setUpcoming(data.results);
  }

  const getPopularMovie = async () =>{

    const data = await fetchPopularMovieList();
    if(data && data.results) setRate(data.results);
  }



    return( 
        <View className="flex-1 text-center bg-neutral-900">
           <SafeAreaView>
            <StatusBar  backgroundColor="#111"/>
            <View className="flex-row justify-between items-center mx-6 my-2">
              <Bars3BottomLeftIcon  size="35" strokeWidth={2} color="white"/>
              <Text className="text-white text-3xl font-bold">
                <Text style={styles.text} className="text-4xl">M</Text>ovies
              </Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
                <MagnifyingGlassIcon  size="30" strokeWidth={2} color="white"/>
              </TouchableOpacity>
            </View>
           </SafeAreaView>

          {
            loading ?(
              <Loading/>
            ):(
              <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:10}}>
    
               {/*Trending*/}
               { trending.length > 0 && <TrendingMovie data={trending}/>}
   
               {/* Upcoming */}
               { upcoming.length > 0 && <Movie title="Coming Soon" data={upcoming}/>}
   
               {/* Upcoming */}
               { rate.length > 0 && <Movie title="Popular Movie" data={rate}/>}
             
              </ScrollView>
            )
          }
        </View>

        
    )
}

