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
      selected: {}
  });

  const search = () => {
    console.log(`Search query is ${state.searchbar}`);
    axios.post(`http://localhost:8000/search`, {
      query: state.searchbar
    }).then(({ data }) => {
        let results = data;
        console.log(results)
        setState(prevState => {
          return { ...prevState, results: results }
      })
    })
  };

  const openPopup = id => {
    axios.get(`http://localhost:8000/search/${id}`).then(({ data }) => {
      let result = data;
      console.log(result);
      setState(prevState => {
        return { ...prevState, selected: result }
      })
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
          console.log(state.searchbar)
          return {...prevState, searchbar: text}
        })}
        onSubmitEditing={search}
        />
    </View> 

    <ScrollView style={styles.results}>
      {state.results.map(result => (
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
            <Text style={styles.heading}>{result.Title}</Text>       
          </View>
        </TouchableHighlight>
      ))}  
    </ScrollView>

    <Modal
      animationType='fade'
      transparent={false}
      visible={(typeof state.selected.Title != 'undefined')}
      >
        {/* <Text>Hello World!</Text> */}
      <View style={styles.popup}> 
          <Image
            source={{ uri: state.selected.Poster }}
            style={{ width: '100%', height: 300 }}
            resizeMode='center' />
        <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={{ marginBottom: 20 }}>Rating: {state.selected.imdbRating}</Text>
          <Text>{state.selected.Plot}</Text>
      </View>
      <TouchableHighlight
        onPress={() => setState(prevState => {
          return { ...prevState, selected: {} }
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
    height: 60,
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
  popup: {
    padding: 20
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 24,
    color: '#FFF',
    fontWeight: 700,
    backgroundColor: '#2484C4'
  }
});
