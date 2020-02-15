import Axios from 'axios';

const BASE_URL = `https://mapp-backend.herokuapp.com/api`;

//`http://localhost:5000/api`
console.log(BASE_URL,process.env);
const requests = {
    rateActor(body){
        return Axios.post(`${BASE_URL}/movie/rate/actor`, body);
    },
    getMovieRatings(body){
        return Axios.get(`${BASE_URL}/users/ratings`, body);
    },
    rateMovie(body){
        return Axios.post(`${BASE_URL}/movie/rate`,body);
    },
    addToFavorite(body){
        return Axios.post(`${BASE_URL}/users/favorite`,body);
    },
    getMe(){
        return Axios.get(`${BASE_URL}/users/me`);
    },
    addToWatchList(body){
        return Axios.post(`${BASE_URL}/users/watchlist`, body);
    },
    getUpcomings(){
        return Axios.get(`${BASE_URL}/movie/upcoming`,{});
    },
    getMovies(body){
        return Axios.get(`${BASE_URL}/movie/movies`,body);
    },
    getTopReleases(){
        return Axios.get(`${BASE_URL}/movie/top`, {});
    },
    getNotifications(){
        return Axios.get(`${BASE_URL}/users/notifications`);
    },
    getSuggestions(body){
        return Promise.all([
            Axios.get(`${BASE_URL}/movie/suggestions`, { params: body }),
            Axios.get(`${BASE_URL}/users/suggestions`, { params: body })
        ]);
    },
    login(body) {
        return Axios.post(`${BASE_URL}/auth/login`, body);
    },
    register(body){
        return Axios.post(`${BASE_URL}/auth/register`, body);
    },
    logout(){
        return Axios.get(`${BASE_URL}/auth/logout`);
    },
    getMovie(movie){
        return Axios.get(`${BASE_URL}/movie/single`,{ params: { slug: movie } });
    },
};

export default requests;