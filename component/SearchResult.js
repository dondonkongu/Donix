import { FlatList, Pressable, StyleSheet,Image,  View } from 'react-native'
import { Text } from 'react-native-elements'
import React from 'react'

const SearchResult = ({data,input,navigation}) => {

const nobanner ='https://firebasestorage.googleapis.com/v0/b/influx-269a5.appspot.com/o/avatars%2Fno-banner-default.jpg?alt=media&token=52886315-d3e5-4ef8-880b-b84dd378271c&_gl=1*186kutw*_ga*NzA1ODU3NTYxLjE2OTMxNDg3ODQ.*_ga_CW55HF8NVT*MTY5NzgxNzYzNy40Ni4xLjE2OTc4MjE2OTcuNTMuMC4w'

const handleDetails =(item)=>{
  navigation.navigate('DetailsRecruitments',{detailRecruitId: item.jobId, profileRecruitId: item.userId })
}

  return (
    <View style={{padding:10}}>
      <FlatList data={data} renderItem={({item})=>{
        if(item.nameRe.toLowerCase().includes(input.toLowerCase())){
          if(input === ""){
            return null;
          }
         
          return (
            <Pressable style={{flexDirection:'row',alignItems:'center',marginVertical:10}}
              onPress={()=>handleDetails(item)}
            >
              <View>
                <Image style={{width:70,height:70}} source={{uri: item.imageProduct?item.imageProduct:nobanner}}></Image>
              </View>
              <View style={{marginLeft:10}}>
                <Text style={{fontSize:15,fontWeight:'500'}}>{item.nameRe}</Text>
                <Text style={{fontSize:14,fontWeight:'400'}}>{item.socialsRe}</Text>
                <Text style={{fontSize:13,fontWeight:'300'}}>{item.deadlineTimeRe}</Text>
              </View>
            </Pressable>
          )
        }
        
      }}></FlatList>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({})