import React, { useContext } from 'react'
import { Ionicons,  MaterialCommunityIcons, MaterialIcons, } from "@expo/vector-icons"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Message from '../pages/message';
import Setting from '../pages/setting';
import ProfileUser from '../pages/profileUser';
import { UserContext } from './UserContext';
import ProfileRecruit from '../pages/NTD/ProfileRecruit';
import HomePageRecruit from '../pages/NTD/HomePageRecruit';
import ManageRecruit from '../pages/NTD/ManageRecruit';
import { View} from 'react-native';
import Loading from '../screens/Loading';
import AdminScreen from '../pages/NTD/AdminScreen';
import Upposts from '../pages/KOC/Upposts';
import News from '../pages/KOC/News';


const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elvation: 0,
        height: 60,
    }
}


const BottomTabNav = () => {
    const {userRole}=useContext(UserContext)
        return (
        
        <Tab.Navigator screenOptions={screenOptions}>
            {userRole === '' &&(   <Tab.Screen
                name='Loading'
                component={Loading}
                options={{
                    tabBarIcon: () => {
                        return (
                            
                            <View style={{backgroundColor:"#fff"}}>

                            </View>
                        )
                    }
                }}

            >
                

            </Tab.Screen>)}
            {userRole === 'admin' && (
           <Tab.Screen
                name='HomePageRecruit'
                component={HomePageRecruit}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            
                            <Ionicons
                                name={focused? 'home':'home-outline'}
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >
                            </Ionicons>
                        )
                    }
                }}

            >

            </Tab.Screen>)}
            {userRole === 'admin' && (
           <Tab.Screen
                name='adminScreen'
                component={AdminScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            
                            <Ionicons
                                name={focused? 'settings':'settings-outline'}
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >
                            </Ionicons>
                        )
                    }
                }}

            >

            </Tab.Screen>)}
           {userRole === 'KOC' && (
            <Tab.Screen
            name='HomPageRecruit'
            component={HomePageRecruit}
            options={{
                tabBarIcon: ({focused})=>{
                    return(
                        <Ionicons
                        name={focused? 'home':'home-outline'}
                        size={24}
                        color={focused ? '#CC3333' : '#ccc'}
                    >
                    </Ionicons>
                    )
                }
            }}
        />)}
            {userRole === 'NTD'&&(
                <Tab.Screen
                    name='HomPageRecruit'
                    component={HomePageRecruit}
                    options={{
                        tabBarIcon: ({focused})=>{
                            return(
                                <Ionicons
                                name={focused? 'home':'home-outline'}
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >
                            </Ionicons>
                            )
                        }
                    }}
                />
            )}
            {userRole === 'KOC' &&(<Tab.Screen
                name='Message'
                component={Message}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name='message-text-outline'
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >

                            </MaterialCommunityIcons>
                        )
                    }
                }}

            >

            </Tab.Screen>)}
            {userRole === 'NTD' &&(<Tab.Screen
                name='Message'
                component={Message}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused?'message-text':'message-text-outline'}
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >
                            </MaterialCommunityIcons>
                        )
                    }
                }}
            >
            </Tab.Screen>)}
                
         {userRole==='KOC'&&(
         <Tab.Screen
                name='News'
                component={News}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name='post-outline'                                
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >

                            </MaterialCommunityIcons>
                        )
                    }
                }}

            >

            </Tab.Screen>)}
            

            
         {userRole==='KOC'&&(
         <Tab.Screen
                name='Setting'
                component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons
                                name='settings'
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >

                            </MaterialIcons>
                        )
                    }
                }}

            >

            </Tab.Screen>)}
            {userRole==='NTD'&&(
         <Tab.Screen
                name='ManageRecruit'
                component={ManageRecruit}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused?'clipboard-list':'clipboard-list-outline'}
                                size={24}
                                color={focused ? '#CC3333' : '#ccc'}
                            >

                            </MaterialCommunityIcons>
                        )
                    }
                }}

            >

            </Tab.Screen>)}
            
            
            
           
            {userRole === 'KOC' && (
        <Tab.Screen
          name="Profile"
          component={ProfileUser}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? '#CC3333' : '#ccc'}
              />
            ),
          }}
        />
      )}

      {userRole === 'NTD' && (
        <Tab.Screen
          name="ProfileRecruit"
          component={ProfileRecruit}
          options={{
            tabBarIcon: ({ focused }) => (
                <MaterialIcons
                name='person-outline'
                
                size={24}
                color={focused ? '#CC3333' : '#ccc'}
            >
            </MaterialIcons>
            ),
          }}
        />
        
      )}
        

        </Tab.Navigator>
    )
}

export default BottomTabNav