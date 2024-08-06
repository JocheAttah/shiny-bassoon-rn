import React, { useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const StartScreen = () => {
  useEffect(() => {
    const data = async () => {
      //   try {
      //     const value = await SecureStore.getItemAsync('ge_client__token');
      //     if (value !== null) {
      //       // We have data!!
      //       router.replace('/(tabs)/');
      //     } else {
      //       router.replace('/auth/welcome');
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      router.replace('/auth');
    };
    data();
  }, []);
  return <Redirect href='/auth' />;
};

export default StartScreen;
