import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './pages/register';
import BottomTabNav from './navigation/bottomTabNav';
import SearchScreen from './screens/SearchScreen';
import DetailsProfile from './screens/DetailsProfile'
import EditProfile from './screens/EditProfile'
import ImagesSelect from './component/ImagesSelect';
import { useEffect, useState } from 'react';
import { UserContext } from './navigation/UserContext';
import ProfileRecruit from './pages/NTD/ProfileRecruit';
import Loading from './screens/Loading';
import EditProfileRecruitment from './pages/NTD/EditProfileRecruitment';
import DetailsProfileRecruitment from './pages/NTD/DetailsProfileRecruitment';
import CreatRecruitPageTwo from './screens/CreatRecruitPageTwo';
import ManageUsers from './pages/Admin/ManageUsers';
import ProfileWallDetail from './pages/KOC/ProfileWallDetail';
import DetailsRecruitments from './pages/NTD/DetailsRecruitments';
import HomePageRecruit from './pages/NTD/HomePageRecruit';
import ManageRecruitments from './pages/Admin/ManageRecruitments';
import SavedRecruitments from './pages/NTD/SavedRecruitments';
import ApplyRecruit from './pages/NTD/ApplyRecruit';
import Candidate from './pages/NTD/Candidate';
import Message from './pages/message';
import UpToLegit from './pages/KOC/UpToLegit';
import MangeAccounts from './pages/Admin/MangeAccounts';
import DataUpLegit from './pages/Admin/DataUpLegit';
import SubmitJobs from './pages/KOC/SubmitJobs';
import ReportCampaign from './pages/NTD/ReportCampaign';
import ListKocScreen from './pages/KOC/ListKocScreen';
import ListRecruitmentsScreen from './pages/NTD/ListRecruitmentsScreen';
import DieuKhoanDichVu from './screens/DieuKhoanDichVu';
import { auth } from './firebase';
import MoreInfor from './pages/KOC/MoreInfor';
import BankCard from './pages/KOC/BankCard';
import AddressReview from './pages/KOC/AddressReview';
import ProfileWallRecruit from './pages/NTD/ProfileWallRecruit';
import LikeKocs from './pages/NTD/LikeKocs';
import MessageNtd from './pages/NTD/MessageNtd';
import CreatRecruit from './pages/NTD/CreatRecruit';
import Chat from './pages/Chat';
import FileRecruit from './pages/NTD/FileRecruit';
import Evalute from './pages/NTD/Evalute';
import Post from './screens/Post';
import EvualateKoc from './screens/EvualateKoc';
import Upposts from './pages/KOC/Upposts';
import News from './pages/KOC/News';
import DetailPost from './pages/KOC/DetailPost';


const Stack = createNativeStackNavigator();


export default function App() {

  const [userRole,setUserRole] = useState('')
  const [user,setUser] = useState(null)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  

  return (
    
    <NavigationContainer>
        <UserContext.Provider value={{ userRole, setUserRole  }}>
      
        <Stack.Navigator initialRouteName={user?'BottomTabnavigation':'Login'} screenOptions={{headerShown:false}}>
      <Stack.Screen name='BottomTabnavigation'
          component={BottomTabNav}
          options={{
            headerShown:false
          }}
        ></Stack.Screen>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name='DetailsProfile' component={DetailsProfile}/>
        <Stack.Screen name='EditProfile' component={EditProfile}/>
        <Stack.Screen name='ImagesSelect' component={ImagesSelect}/>
        <Stack.Screen name='ProfileRecruit' component={ProfileRecruit}/>
        <Stack.Screen name ='Loading' component={Loading}/>
        <Stack.Screen name = 'EditProfileRecruitment' component={EditProfileRecruitment} />
        <Stack.Screen name = 'DetailsProfileRecruitment' component={DetailsProfileRecruitment}/>
        <Stack.Screen name ='CreatRecruitPageTwo' component={CreatRecruitPageTwo}/>
        <Stack.Screen name ='ManageUsers' component={ManageUsers}/>
        <Stack.Screen name = 'ProfileWallDetail' component={ProfileWallDetail}/>
        <Stack.Screen name='DetailsRecruitments' component={DetailsRecruitments}/>
        <Stack.Screen name= 'HomePageRecruit' component={HomePageRecruit}/>
        <Stack.Screen name='ManageRecruitments' component={ManageRecruitments} />
        <Stack.Screen name='ManageAccounts' component={MangeAccounts}/>
        <Stack.Screen name='SavedRecruitments'component={SavedRecruitments}/>
        <Stack.Screen name='ApplyRecruit' component={ApplyRecruit}/>
        <Stack.Screen name='Candidate' component={Candidate}/>
        <Stack.Screen name='message' component={Message}/>
        <Stack.Screen name='UpToLegit' component={UpToLegit}/>
        <Stack.Screen name='DataUpLegit' component={DataUpLegit}/>
        <Stack.Screen name='SubmitJobs' component={SubmitJobs}/>
        <Stack.Screen name='MoreInfor' component={MoreInfor}/>
        <Stack.Screen name='ReportCampaign' component={ReportCampaign}/>
        <Stack.Screen name='BankCard' component={BankCard}/>
        <Stack.Screen name='ListKocScreen' component={ListKocScreen}/>
        <Stack.Screen name='AddressReview' component={AddressReview}/>
        <Stack.Screen name='ListRecruitmentsScreen' component={ListRecruitmentsScreen}/>
        <Stack.Screen name='DieuKhoanDichVu' component={DieuKhoanDichVu}/>
        <Stack.Screen name='ProfileWallRecruit' component={ProfileWallRecruit}/>
        <Stack.Screen name='LikeKocs' component={LikeKocs}/>
        <Stack.Screen name='MessageNtd' component={MessageNtd}/>
        <Stack.Screen name='CreateRecruit' component={CreatRecruit}/>
        <Stack.Screen name='Chat' component={Chat}/>
        <Stack.Screen name='FileRecruit' component={FileRecruit}/>
        <Stack.Screen name='Evalute' component={Evalute}/>
        <Stack.Screen name='Upposts' component={Upposts}/>
        <Stack.Screen name='News' component={News}/>
        <Stack.Screen name='DetailPost' component={DetailPost}/>
      </Stack.Navigator>
      
      </UserContext.Provider>
    </NavigationContainer>
    
  );
}


