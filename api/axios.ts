import Axios from 'axios';
import { API_KEY, BASE_API_URL } from './config';

export const apiService = Axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'chinese-food-db.p.rapidapi.com',
  },
});

export const getRestaurants = async (params) => {
  try {
    const response = await apiService.get('/', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
