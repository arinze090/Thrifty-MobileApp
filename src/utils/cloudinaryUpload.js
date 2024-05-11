import axios from 'axios';
import store from '../redux/store';

export const baseURL =
  'https://api.cloudinary.com/v1_1/cloudinary-viper-dev/image/';

// using axios to create a reusuable instance across
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

// use the redux token as the token for intercxeptors
const addTokenToRequest = async requestHeader => {
  // const token = sessionStorage.getItem("#f8WEB#");
  const mToken = store.getState()?.user?.user?.token;
  console.log('mtoken', mToken);

  requestHeader.headers.Authorization = `Bearer ${mToken}`;
  return requestHeader;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
