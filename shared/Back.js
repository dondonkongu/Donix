import { StyleSheet, View,TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import React from 'react'

const Back = ({navigation}) => {
  return (
    <View style={{ marginHorizontal: 2}}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{
                        marginTop:35,
                        position: 'absolute',
                        left: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        zIndex: 9999,
                        
                    }}
                >
                    <MaterialCommunityIcons
                        name='chevron-left-circle'
                        size={35}
                        color='#fff'
                    ></MaterialCommunityIcons>
                </TouchableOpacity>

            </View>
  )
}

export default Back

const styles = StyleSheet.create({})