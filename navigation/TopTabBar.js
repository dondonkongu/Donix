import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Post from '../screens/Post';
import EvualateKoc from '../screens/EvualateKoc';
import Pictures from '../screens/Pictures';

const Tab = createMaterialTopTabNavigator();
screenOptions = {
  tabBarShowLabel: true,
  headerShown: true,
  tabBarHideOnKeyboard: true,
  
}
function TopTabBar({profileId}) {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen initialParams={{ profileId: profileId }} name="Bài viết" component={Post} />
      <Tab.Screen initialParams={{ profileId: profileId }} name="Ảnh" component={Pictures} />
      <Tab.Screen initialParams={{ profileId: profileId }} name="Đánh giá" component={EvualateKoc} />
    </Tab.Navigator>
  );
}
export default TopTabBar;