import { StyleSheet, Text, TextInput,    View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Feather} from "@expo/vector-icons"
import SearchResult from '../component/SearchResult'
import { database } from '../firebase'
import { useEffect } from 'react'

const SearchScreen = ({navigation}) => {
    const [input,setInput]=useState('')
    const [data,setData]=useState([])

    useEffect(() => {
      const hh = database.ref('ListRecuits').once('value')
        .then((snapshot) => {
          const recruits = snapshot.val();
          if (recruits) {
            const allJobData = [];
            Object.keys(recruits).forEach((userId) => {
              const jobIds = Object.keys(recruits[userId]);
              jobIds.forEach((jobId) => {
                const jobData = recruits[userId][jobId];
                jobData.userId = userId
                jobData.jobId = jobId
                allJobData.push(jobData);
              });
            });
            setData(allJobData);
          }
        })
        .catch((error) => {
          console.log('Đã xảy ra lỗi: ', error);
        });
      return () => hh;
    }, []);
  
    
  return (
    <SafeAreaView >
      <View
        style={{
          padding:10,
          margin:10,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          borderColor:'#CC3333',
          borderRadius:10,
          borderWidth:2,
        }}
      >
        <TextInput value={input} onChangeText={(text)=>setInput(text)} placeholder='enter name recruitment'></TextInput>
        <Feather style={{marginRight:5}} name='search' size={24} color='#000'></Feather>

      </View>
      <SearchResult data={data} input={input} setInput={setInput} navigation={navigation}></SearchResult>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})