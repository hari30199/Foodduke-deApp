import 'react-native-gesture-handler';
import React,{useContext,useEffect,useState} from 'react';
import {Text,View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconBadge from 'react-native-icon-badge';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import neworder from '../screens/neworder';
import acceptedorder from '../screens/acceptedorder';
import pickedup from '../screens/pickedup'
import ProfileScreen from '../screens/ProfileScreen';
import { AuthContext } from '../../../AuthContext';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const [orderedlist,setorderedlist] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const token = userInfo.auth_token
  // console.log(token)
  const Ordered = () => {

    fetch(`https://demo.foodduke.com/public/api/delivery/get-delivery-orders`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" :  token
      }),
    })
    .then((response) =>(response.json()))
    .then((result) => {
      // console.log(result)
      setorderedlist(result); 
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}
useEffect(()=>{
  Ordered()
},[])

// var count = Object.entries(orderedlist.new_orders)?.length;
// console.log('count',count)

const size = ( orderedlist.new_orders != null &&  orderedlist.new_orders != undefined) ? (
  Object.values(orderedlist.new_orders).length
 ):(
   <Text></Text>
 )
// console.log(size)

const size1 = ( orderedlist.accepted_orders != null &&  orderedlist.accepted_orders != undefined) ? (
  Object.values(orderedlist.accepted_orders).length
 ):(
   <Text></Text>
 )
// console.log(size)

const size2 = ( orderedlist.pickedup_orders != null &&  orderedlist.pickedup_orders != undefined) ? (
  Object.values(orderedlist.pickedup_orders).length
 ):(
   <Text></Text>
 )
// console.log(size)
  return (
    
    <Tab.Navigator
     
      screenOptions={{
        headerShadowVisible:true,
        keyboardHidesTabBar:true,
        showLabel: true,
        activeTintColor: 'orange',
        width:'90%',
        bottom:10
      }}>
      <Tab.Screen
        name="New Orders"
        component={neworder}
        options={{
          tabBarIcon: ({color}) => (
            <IconBadge
            MainElement={
              <View style={{
                width:20,
                height:22,
                margin:12,
                top:6
              }}><Icon name="bell" color={color} size={20} /></View>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF',fontSize:8}}>{size}</Text>
            }

            IconBadgeStyle={
              {width:2,
              height:20,
              top:6,
              backgroundColor: 'orange'}
            }
            />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Ordered"
        component={acceptedorder}
        options={{
          tabBarIcon: ({color}) => (
            <IconBadge
            MainElement={
              <View style={{
                width:20,
                height:22,
                margin:12,
                top:6
              }}><Icon name="social-dropbox" color={color} size={20} /></View>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF',fontSize:8}}>{size1}</Text>
            }

            IconBadgeStyle={
              {width:2,
              height:20,
              top:6,
              backgroundColor: 'orange'}
            }
            />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Picked-Up"
        component={pickedup}
        options={{
          tabBarIcon: ({color}) => (
            <IconBadge
            MainElement={
              <View style={{
                width:20,
                height:22,
                margin:12,
                top:6
              }}><Icon name="bag" color={color} size={20} /></View>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF',fontSize:8}}>{size2}</Text>
            }

            IconBadgeStyle={
              {width:2,
              height:20,
              top:6,
              backgroundColor: 'orange'}
            }
            />
          ),
          headerShown:false
        }}
      />
    
        <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user" color={color} size={20} />
          ),
          headerShown:false
        }}
      />
        
       
         
    </Tab.Navigator>
    
  );
};

export default BottomNavigator;
