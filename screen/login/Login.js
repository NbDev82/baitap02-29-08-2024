import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateRegister = () => {
    navigation.navigate('Register');
  };

  const navigateForgotPassword = () => {
      navigation.navigate('ForgotPassword');
    };


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://food-app-api-demo.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(response.ok)
      if (response.ok) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Đăng nhâp thất bại', data.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
       <View style={styles.spacing} />
      <Button title="Đăng ký" onPress={navigateRegister} />
      <View style={styles.spacing} />
      <Button title="Quên mật khẩu" onPress={navigateForgotPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  spacing: {
      marginVertical: 10,
    },
});

export default Login;