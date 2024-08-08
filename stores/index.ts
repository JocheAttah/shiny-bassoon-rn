import { createContext, useContext } from 'react';
import RestaurantStore from './restaurant.store';

const StoresContext = createContext({
  restaurantStore: new RestaurantStore(),
});

export const useStores = () => useContext(StoresContext);
