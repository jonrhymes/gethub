import React from 'react';
import {
    Text,
    Image,
    View,
    TextInput
} from 'react-native';

const Input = () => {
    return (
        <View>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 2
                }}
                placeholder="Search for any Movie"
            />
            <Text>{TextInput.value}</Text>
        </View>
    )

};

export default Input;