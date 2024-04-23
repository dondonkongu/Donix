import React from 'react';
import { View, Text } from 'react-native';

const Divide = () => {
  return (
    <View
      style={{
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 10, 
      }}
    >
      <View
        style={{
          borderBottomColor: '#000', 
          borderBottomWidth: 1,
          flex: 1, 
          marginHorizontal:25,
        }}
      />
      
    </View>
  );
};

export default Divide;
