import axios from "axios";
import { apiKey } from "../constants";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMovieList = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMovieList = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const popularMovieList = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`
const searchMoviesEndpoint =`${apiBaseUrl}/search/movie?api_key=${apiKey}`;


const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;




const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;


export const image500 = path => path ? 'https://image.tmdb.org/t/p/w500'+path: null;
export const image345 = path => path ? 'https://image.tmdb.org/t/p/w345'+path: null;
export const image185 = path => path ? 'https://image.tmdb.org/t/p/w185'+path: null;


export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';





const apiCall = async (endpoint, params) =>{

    const opstions ={
        method:"GET",
        url:endpoint,
        params:params ? params:{}
    }

    try{

        const response = await axios.request(opstions);
        return response.data;
    }
    catch(error){
        console.log("error",error);
        return{};
    }
}

export const fetchTrendingMovieList = ()=>{
    return apiCall(trendingMovieList);
}


export const fetchPopularMovieList= ()=>{
    return apiCall(popularMovieList);
}


export const fetchUpComingMovieList = ()=>{
    return apiCall(upcomingMovieList);
}


export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}

export const fetchPersonDetails = (personId)=>{
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId)=>{
    return apiCall(personMoviesEndpoint(personId));
}


export const searchMoives = params =>{
    return  apiCall(searchMoviesEndpoint,params)
}