import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Home Page</Text>
        <Text style={styles.greeting}>Hello!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
  },
});

export default Home;
