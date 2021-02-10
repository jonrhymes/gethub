import React, {
  useState
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';

// import Input from './components/Input.jsx';
import axios from 'axios';

export default function App() {
  const [state, setState] = useState({
      searchbar: 'search for any movie',
      results: [],
      selected: {}
  });

  const search = () => {
      const api_uri = `http://www.omdbapi.com/?apikey=f5d63a56`;
      axios(api_uri + '&s=' + state.searchbar).then(({ data }) => {
          let results = data.Search;
          console.log(results)
          setState(prevState => {
              return { ...prevState, results: results }
          })
      })
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          {/* <Image
            style={styles.logo}
            source={icon}
          /> */}
        getHub:
            <Text style={styles.motto}> The easiest way to GET /movies</Text>
        </Text>
  
        <View>
            <TextInput
                style={styles.searchbar}
                placeholder={state.searchbar}
                onChangeText={text => setState(prevState => {
                    return {...prevState, searchbar: text}
                })}
                onSubmitEditing={search}
            />

        <ScrollView
        style={styles.results}>
                {state.results.map(result => (
                    <View key={result.imdbID}>
                        <Text>{result.Title}</Text>       
                    </View>
                ))}
            </ScrollView>
        </View>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
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
    color: 'green',
    fontWeight: 'normal'
  },
  logo: {
    width: 2,
    height: 2
  },
  searchbar: {
    width: '100%',
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 40,
    padding: 30,
    textAlign: 'left',
    marginBottom: 30
  },
  results: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {

  }
});
