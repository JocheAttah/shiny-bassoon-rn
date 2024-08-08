import { getAds } from '@/api';
import { apiService } from '@/api/axios';
import { GET_RESTAURANTS } from '@/api/urls';
import { makeAutoObservable } from 'mobx';

export default class RestaurantStore {
  ads = [];
  adsLoading = false;
  restaurants = [];
  restaurantsLoading = false;
  popRestaurants = [];
  popRestaurantsLoading = false;
  orders = [];
  ordersLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setData(key, value) {
    this[key] = value;
  }

  async getAds() {
    this.adsLoading = true;
    try {
      const response = await apiService.get(GET_RESTAURANTS);
      this.setData('ads', response.data?.slice(20, 23));
      console.log('ads', response.data?.slice(20, 23));
      setTimeout(() => this.setData('adsLoading', false), 100);
    } catch (error) {
      console.error(error);
      setTimeout(() => this.setData('adsLoading', false), 100);
      throw error;
    }
  }
  async getRestaurants() {
    this.restaurantsLoading = true;
    try {
      const response = await apiService.get(GET_RESTAURANTS);
      this.setData('restaurants', response.data?.slice(10, 15));
      console.log('restaurants', response.data?.slice(10, 15));
      setTimeout(() => this.setData('restaurantsLoading', false), 100);
    } catch (error) {
      console.error(error);
      setTimeout(() => this.setData('restaurantsLoading', false), 100);
      throw error;
    }
  }
  async getPopRestaurants() {
    this.popRestaurantsLoading = true;
    try {
      const response = await apiService.get(GET_RESTAURANTS);
      this.setData('popRestaurants', response.data?.slice(1, 11));
      console.log('popRestaurants', response.data?.slice(1, 11));
      setTimeout(() => this.setData('popRestaurantsLoading', false), 100);
    } catch (error) {
      console.error(error);
      setTimeout(() => this.setData('popRestaurantsLoading', false), 100);
      throw error;
    }
  }
  async getPopOrders() {
    this.ordersLoading = true;
    try {
      const response = await apiService.get(GET_RESTAURANTS);
      this.setData('orders', response.data?.slice(16, 20));
      console.log('orders', response.data?.slice(16, 20));
      setTimeout(() => this.setData('ordersLoading', false), 100);
    } catch (error) {
      console.error(error);
      setTimeout(() => this.setData('ordersLoading', false), 100);
      throw error;
    }
  }
}
