import React from 'react';
import {
    Text,
    Image,
    View,
    TextInput
} from 'react-native';

const Input = () => {
    const [value, onChangeText] = React.useState('Search for any Movie')
    return (
        <View>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 2,
                    fontSize: 40,
                    padding: 50,
                    textAlign: 'center'
                }}
                onChangeText={text => onChangeText(text)}
            />
            <Text>{TextInput.value}</Text>
        </View>
    )

};

export default Input;