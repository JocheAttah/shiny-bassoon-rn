import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) return value;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSessionID = async () => {
  try {
    const value = await AsyncStorage.getItem('sessionID');
    if (value !== null) return value;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
