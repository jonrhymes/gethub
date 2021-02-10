import React, { useState } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    Text,
} from 'react-native';

import axios from 'axios';
// import api_key from '../js/config.js'

// Sourced from Tyler Potts's Code a Movie APP in React Native: https://www.youtube.com/watch?v=aZYCEGyMIN0

// const API_KEY = config.API_KEY;
// const api_uri = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const Input = () => {
    // const api_key = './js/config.API_KEY';
    // const api_uri = `http://www.omdbapi.com/?apikey=${api_key}`;
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
        <View>
            <TextInput
                style={{
                    flex: 0.3,
                    height: 30,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'green',
                    borderWidth: 2,
                    borderRadius: 10,
                    fontSize: 40,
                    padding: 20,
                    textAlign: 'left',
                }}
                // value={state.searchbar}
                placeholder={state.searchbar}
                onChangeText={text => setState(prevState => {
                    return {...prevState, searchbar: text}
                })}
                onSubmitEditing={search}
            />

            <ScrollView>
                {state.results.map(result => (
                    <View key={result.imdbID} style={style.result}>
                        <Text style={style.results}>{result.Title}</Text>       
                    </View>
                ))}
            </ScrollView>
        </View>
    )

};

export default Input;