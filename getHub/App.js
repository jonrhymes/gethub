import React, {
  useState,
  Image
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Input from './components/Input.jsx';
import axios from 'axios';

const api_key = './js/config.API_KEY';

export default function App() {
  const api_url = `http://www.omdbapi.com/?apikey=${api_key}`;
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {}
  });

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
      <Image
        source={require('@/assets/video-solid.svg')}
      />getHub:
          <Text style={styles.motto}> The easiest way to GET /movies</Text>
      </Text>

      <Input />
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  motto: {
    fontSize: 25,
    color: 'blue',
    fontWeight: 'normal'
  },
});
