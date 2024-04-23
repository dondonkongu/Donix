import React from 'react';
import { View, Text } from 'react-native';

const Divider = () => {
  return (
    <View
      style={{
        marginTop:20,
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 10, 
      }}
    >
      <View
        style={{
          borderBottomColor: 'black', 
          borderBottomWidth: 1,
          flex: 1, 
          marginLeft:25,
        }}
      />
      <Text style={{ marginHorizontal: 10 }}> Or </Text>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          flex: 1, 
          marginRight:25,
        }}
      />
    </View>
  );
};

export default Divider;
