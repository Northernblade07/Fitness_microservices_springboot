import axios from 'axios'
const API_URL = 'http://3.237.36.60:8080/api';

const api = axios.create({
    baseURL:API_URL,
})

api.interceptors.request.use((config)=>{

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    if(userId){
        config.headers['X-USER-ID'] = userId;
    }
    return config;
});


export const getActivity =()=>{
    return api.get('/activity')
}

export const addActivity =(activity)=>{
   return api.post('/activity',activity)
}

export const getActivityDetail =(id)=>{
   return api.get(`/activity/${id}`)
}


export const getActivityrecommendations =(id)=>{
   return api.get(`/recommendations/activity/${id}`)
}

export const getUserRecommendations = (userId) => {
  return api.get(`/recommendations/user/${userId}`);
};  