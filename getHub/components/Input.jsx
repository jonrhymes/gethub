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
                    flex: 0.3,
                    height: 30,
                    borderColor: 'green',
                    borderWidth: 2,
                    borderRadius: 10,
                    fontSize: 40,
                    padding: 20,
                    textAlign: 'left',
                }}
                onChangeText={text => onChangeText(text, TextInput.value)}
            />
            <Text>{TextInput.value}</Text>
        </View>
    )

};

export default Input;