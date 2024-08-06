import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 0,
        backgroundColor: '#FAFAFA',
      }}
    >
      <Image
        source={require('../../assets/images/header.png')}
        style={{
          height: '30%',
          width: '100%',
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
