import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(1); // 1: nhập email, 2: nhập OTP, 3: đặt lại mật khẩu

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    try {
      const response = await fetch('https://food-app-api-demo.onrender.com/api/users/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'OTP đã được gửi đến email của bạn');
        setStage(2);
      } else {
        Alert.alert('Thất bại', data.message || 'Đã xảy ra lỗi');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã OTP');
      return;
    }

    try {
      const response = await fetch('https://food-app-api-demo.onrender.com/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'Mã OTP chính xác. Vui lòng nhập mật khẩu mới.');
        setStage(3);
      } else {
        Alert.alert('Thất bại', data.message || 'Mã OTP không chính xác');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      console.error('Error verifying OTP:', error);
    }
  };

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới');
      return;
    }

    try {
      const response = await fetch('https://food-app-api-demo.onrender.com/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thành công', 'Mật khẩu đã được đặt lại. Vui lòng đăng nhập.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Thất bại', data.message || 'Đặt lại mật khẩu thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      {stage === 1 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Button title="Gửi mã OTP" onPress={handleSendOtp} />
        </>
      )}
      {stage === 2 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập mã OTP"
            onChangeText={(text) => setOtp(text)}
            value={otp}
          />
          <Button title="Xác minh OTP" onPress={handleVerifyOtp} />
        </>
      )}
      {stage === 3 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
        </>
      )}
      <View style={styles.loginRedirect}>
        <Text>Nhớ mật khẩu? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </Pressable>
      </View>
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
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
