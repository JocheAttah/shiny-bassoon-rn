import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { isIOS } from '@/helpers/utils';
import { router } from 'expo-router';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secure, setSecure] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log({ data });
    router.replace('/(tabs)');
  };

  const Form = () => (
    <View
      style={{
        width: '98%',
        justifyContent: 'center',
        marginTop: 15,
        paddingHorizontal: 5,
      }}
    >
      <View>
        <Text
          style={{
            marginBottom: 8,
            color: colors.text,
            fontSize: 12,
          }}
        >
          Email address
        </Text>
        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              autoComplete='email'
              inputMode='email'
              textContentType='oneTimeCode'
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  borderColor: colors.text,
                },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Email Address'
            />
          )}
          name='email'
        />
        {/* error message */}
        {errors.email && (
          <View style={[styles.validationBanner]}>
            <Text
              style={{
                color: 'red',
                fontSize: 14,
              }}
            >
              {errors.email.message}
            </Text>
          </View>
        )}
        <Text
          style={{
            marginBottom: 8,
            color: colors.text,
            fontSize: 12,
          }}
        >
          Password
        </Text>
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                autoCapitalize='none'
                secureTextEntry={secure}
                textContentType='oneTimeCode'
                // returnKeyType="go"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    borderColor: colors.text,
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Password'
              />
              {/* create eye icon */}
              <Feather
                name={secure ? 'eye' : 'eye-off'}
                size={20}
                color={colors.primary}
                style={{
                  position: 'absolute',
                  right: isIOS() ? 10 : 20,
                  top: isIOS() ? 15 : 25,
                }}
                onPress={() => setSecure(!secure)}
              />
            </View>
          )}
          name='password'
        />
        {errors.password && (
          <View style={styles.validationBanner}>
            <Text
              style={{
                color: 'red',
                fontSize: 14,
              }}
            >
              {errors.password.message}
            </Text>
          </View>
        )}

        {/* Error */}
        {error ? (
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              textAlign: 'center',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}
          >
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: 10,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 14 }}>Forgot Your Password? </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          style={[
            styles.submitButton,
            {
              flexDirection: 'row',
            },
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          {loading && <ActivityIndicator size='small' color={colors.white} />}
          <Text
            style={{
              color: colors.white,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 20 }}>
          Login To Your Account
        </Text>
        <Form />
        <Text style={{ fontSize: 14 }}>Or Continue With</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            marginTop: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/images/facebook.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Facebook</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/images/google.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Google</Text>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}
        >
          <Text style={{ fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: colors.primary,
                fontWeight: '600',
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInput: {
    // borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 15,
    marginBottom: 24,
  },
  validationBanner: {
    backgroundColor: 'rgba(250,210,56,0.15)',
    borderRadius: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginBottom: 16,
  },
});
