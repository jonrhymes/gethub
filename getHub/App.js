import React, {
  useState,
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Input from './components/Input.jsx'

export default function App() {
  const api_key = "http://www.omdbapi.com/?apikey=${api_key}"

  return (
    <View style={styles.container}>
      <Text style={styles.logo} >getHub</Text>
      <Text styles={styles.motto}>The easiest way to GET /movies</Text>
      <Input style={styles.input}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 30,
  },
  motto: {
    paddingBottom: 10,
  },
  input: {
    padding: 40,
  }
});
