import React, {
  useState
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';

import axios from 'axios';

export default function App() {
  const [state, setState] = useState({
      searchbar: 'search for any movie',
      results: [],
      selected: {},
      isVisible: false
  });

  const openPopup = id => {
    axios.get(`http://localhost:8000/${id}`).then(({ data }) => {
      let result = data;
      console.log(result);
      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  };


  const search = () => {
    // const queryString = state.searchbar.toString();
    console.log(`Search query is ${state.searchbar}`);
    axios.post(`http://localhost:8000/search`, {
      query: state.searchbar
    }).then(({ data }) => {
        let results = data;

        if (results !== 'no-results') {
          console.log('Search results are:');
          console.log(results);
          setState(prevState => {
            return { ...prevState, results: results };
        })}
        else {
          console.log(`No results found.`);
        } 
    }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        getHub
          <Image source={require('./assets/logo.png')} style={{width: 70, height: 50}}/>
      </Text>
      <Text style={styles.motto}> The easiest way to GET /movies</Text>
  
    <View>
      <TextInput
        style={styles.searchbar}
        placeholder={state.searchbar}
        onChangeText={text => setState(prevState => {
          return {...prevState, searchbar: text}
        })}
        onSubmitEditing={search}
        />
    </View> 

    <ScrollView style={styles.results}>
      {state.results?
      state.results.map(result => (
        <TouchableHighlight
          key={result.imdbID}
          onPress={() => openPopup(result.imdbID)}
        >
          <View style={styles.result}>
            <Image
              source={{ uri: result.Poster }}
              style={{
                width: '100%',
                height: 300
              }}
              resizeMode='cover'
            />
            <Text style={styles.heading}>{result.Title}
              <Text style={styles.year}> ({result.Year})</Text>
            </Text>       
          </View>
        </TouchableHighlight>
      ))
      : ''
      }  
      </ScrollView>
      
      <Modal
        animationType='slide'
        transparent={false}
        visible={(typeof state.selected.Title != 'undefined')}
        style={styles.modal}
      >
        <View style={styles.popup}>
        <Image
              source={{ uri: state.selected.Poster }}
              style={{
                width: 200,
                height: 200
              }}
              resizeMode='cover'
            />
          <Text style={styles.popTitle}>{state.selected.Title} {state.selected.Year}</Text>
          <Text>Runtime: {state.selected.Runtime}</Text>
          <Text>Directed by: {state.selected.Director}</Text>
          <Text style={{marginBottom: 20}}>Rating: {state.selected.Rated}</Text>
          <Text>{state.selected.Plot}</Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {}}
          })}
        >
          <Text style={styles.closeBtn}>Close</Text>
        </TouchableHighlight>
      </Modal>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 65,
    fontWeight: 'bold',
  },
  motto: {
    fontSize: 25,
    color: 'green',
    fontWeight: 'normal',
    paddingBottom: 10,
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
    marginBottom: 30,
    // outlineWidth: 0
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: 'darkgreen'
  },
  year: {
    fontWeight: 'normal'
  },
  popup: {
    padding: 20
  },
  popTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: 'darkgreen',
    color: '#fff'
  }
});