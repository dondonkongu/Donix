import {Dimensions,Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PropertiesCard = ({data,name,count,image}) => {

    const {width,height}=Dimensions.get('window')
    const imageWidth = (width - 60) / 2;
    const imageHeight = imageWidth * 1.5;
  return (
    <View>
      <Pressable style={{margin:15,flexDirection:'row',backgroundColor:'#fff'}}>
      <View>
        <Image style={{width:100,height:100}} source={{uri:image}}></Image>
      </View>
      </Pressable>
    </View>
  )
}

export default PropertiesCard

const styles = StyleSheet.create({})