import React, { useEffect ,useState,useRef,useContext} from 'react';
import {platform, Text,View,Image,Linking,FlatList,TextInput,RefreshControl, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import ThemeManager, { useTheme } from '../../../them';
import openMap from 'react-native-open-maps';
import styled from 'styled-components/native';
import thumbIcon from '../../assets/Vector.png';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../AuthContext';
import DashedLine from 'react-native-dashed-line';
import SwipeButton from 'rn-swipe-button';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import call from 'react-native-phone-call';
import TimeAgo from 'react-native-timeago';
import Dialog from "react-native-dialog";
import { createOpenLink } from 'react-native-open-maps';
import OTPTextView from 'react-native-otp-textinput';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Container = styled.View`
  flex: 1;
  background:${props => props.theme.backgroundAlt};`
  
  const Card = styled.View`
  background-Color:${props => props.theme.backgroundAlt1};
  borderRadius:14px;
  margin:10px;
  height:490px;
  marginBottom:-40px`

  const ItemCard = styled.View`
  background-Color:${props => props.theme.backgroundAlt1};
  margin:10px;
  border-bottom-left-radius: 10px
  border-bottom-right-radius: 10px`

  const Orderitems = styled.View`
  background-Color:${props => props.theme.backgroundAlt2};
  margin:10px;
  border-top-left-radius: 10px
  border-top-right-radius: 10px
  border-width: 1px;
  border-color:#eeeeee
  height:60px`

  const Deliverypin = styled.TextInput`
  background-Color:${props => props.theme.backgroundAlt4};
  margin:10px;
  borderRadius:4px;
  height:60px;
  bottom:10px`

  const Heading = styled.View`
  background-Color:${props => props.theme.backgroundAlt2};
  height:60px;
  justify-content: center;`


  const Title = styled.Text`
  font-size: 14;
  color: ${props => props.theme.text};
  padding:8px;
  width:350px;`

  const Title1 = styled.Text`
  font-size: 14;
  color: ${props => props.theme.text};
  padding:8px;`

  const OrderTitle1 = styled.Text`
  font-size: 14;
  color: ${props => props.theme.text};
  padding:8px;`
  const ItemCard1 = styled.View`
  background-Color:${props => props.theme.backgroundAlt1};
  margin:10px;
  borderRadius:26px
  bottom:16px`
  const ItemCircle = styled.View`
  background-Color:${props => props.theme.backgroundAlt5};
  margin:10px;
  borderRadius:50px;
  bottom:16px`

export default function  Notification  (props)  {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemdata,setitemdata] = useState([]);
  const [deliverypin,setdeliverypin] = useState([]);
  const [deliveryorder,setdeliveryorder] = useState([]);
  const [pickupdata,setpickupdata] = useState([]);
  const [acceptdata,setacceptdata] = useState([]);
  const {orderid} = props.route.params;
  const [isLoading, setLoading] = useState(true);
  const LottieRef = useRef(null); 
  const {userInfo} = useContext(AuthContext);
  const {navigation} = props;
  const theme = useTheme()
  
const  _goToYosemite =()=> {
  const lat = itemdata.restaurant.latitude
  const long = itemdata.restaurant.longitude
    openMap({ latitude: Number(lat), longitude: Number(long) });
  }
  const yosemite = { latitude: 37.865101, longitude: -119.538330 };
  const openYosemite = createOpenLink(yosemite);
  const openYosemiteZoomedOut = createOpenLink({ ...yosemite, zoom: 30 });
  // console.log('where',itemdata.location.latitude)
  const triggerCall = () => {
    const phone = itemdata.user.phone
    Linking.openURL(`tel:${phone}`);
  };
  const otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.submit();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setitemdata(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
//  console.log(orderid)
 const token = userInfo.auth_token
 const id = userInfo.id
 console.log(token)
  const Ordered = () => {

    fetch(`https://demo.foodduke.com/public/api/delivery/get-single-delivery-order`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" :  token,
        "unique_order_id": orderid
      }),
    })
    .then((response) => response.json())
    .then((json) => setitemdata(json))
    .then((itemdata) => JSON.stringify(itemdata))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
      // console.log(itemdata.orderstatus_id)
    
    
}
useEffect(()=>{
  Ordered()
},[])

const acceptorderid = itemdata.id
// console.log(acceptorderid)
// console.log(id)
// console.log(token)
const Acceptorder = () => {

  fetch(`https://meatapp.smartstorez.com/public/api/delivery/accept-to-deliver`,{
    method:'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "delivery_guy_id":id,
      "order_id":acceptorderid,
      "token":token,
    }),
  })
  .then((response) =>(response.json()))
  .then((result) => {
    // console.log('name',result)
     setacceptdata(result);Ordered();
  })
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));

}

var objectstring = itemdata?.location
var objectStringArray = (new Function("return [" + objectstring+ "];")());
// console.log(objectStringArray[0].lat)
// const refr = () =>{
//   useEffect
// }

const pickeduporder = () => {

  fetch(`https://demo.foodduke.com/public/api/delivery/pickedup-order`,{
    method:'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "order_id":acceptorderid,
      "token":token,
    }),
  })
    .then((response) =>(response.json()))
    .then((result) => {
      // console.log('name',result)
       setpickupdata(result);Ordered();
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}


const Deliveryorder = () => {
// console.log(deliverypin)
  fetch(`https://demo.foodduke.com/public/api/delivery/deliver-order`,{
    method:'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "delivery_pin":deliverypin,
      "order_id":acceptorderid,
      "token":token,
    }),
  })
    .then((response) =>(response.json()))
    .then((result) => {
      console.log('name',result)
       setdeliveryorder(result.user),Ordered();
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}

const pinverify = () =>{
  if (deliverypin == '' )
  return alert('Enter Delivery Pin')
  else if (deliveryorder?.delivery_pin == deliverypin)
  return Deliveryorder()
  else return alert('Incorrect Delivery Pin')
}

const incorrectmsg = () =>{
  return(
  <View style={{width:'94%',margin:10,height:70,bottom:20}}>
              <Text style={{backgroundColor:'#f44336',width:'100%',textAlign:'center',padding:20,borderRadius:36,color:'white'}}>Incorrect Delivery Pin</Text>
              </View>
   )
}


var time = itemdata.updated_at

let timestamp = time;


const getTime = () =>{
  var i= 0 
  const views = [];
 //  console.log('hello',item.orderitems.length)
  for (i=0; i<itemdata.orderitems.length;i++){
   //  console.log('hell',i)
    views.push(
     <View style={{flexDirection:'row',left:16,}}>
       <View style={{borderBottomWidth:1,borderBottomColor:'red', borderStyle: 'dashed',}}>
    <Title1 style={{fontWeight:'bold'}}>{itemdata.orderitems[i].quantity}<Entypo name={'cross'} size={10}></Entypo></Title1>
    </View>
       <View style={{borderBottomWidth:1,borderBottomColor:'red',width:'80%', borderStyle: 'dashed',}}>
       <Title1 style={{fontWeight:'bold'}}>         {itemdata.orderitems[i].name}</Title1>
       </View>
   
      
     
      </View>
    )
  }
  return views
 //  return console.log(i)
}  

if (itemdata.orderstatus_id == 5){
   alert('order delivered'),()=>navigation.goBack()
}
 
// console.log(deliverypin)
  return (
    <SafeAreaView style={styles.container}>
<Container style={{ flex: 1,}}>
<Heading>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={navigation.goBack}
         style={{width:54,height:60,justifyContent:'center',}}>
        <Title><Ionicons name='chevron-back' size={30}/></Title>
        </TouchableOpacity>
        <DashedLine axis='vertical' dashLength={5} />
            <Title style={{fontSize:18,fontWeight:'bold',width:'60%',}}>{orderid} </Title>
      </View>

      </Heading>
<ScrollView>


<Container>
      {isLoading ? 
       <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',height:600,top:10}}>
       <Image style={{width:250,height:250}}
        source={require('../../assets/loader.gif')} />
          </View>:
        <View>
           {itemdata.orderstatus_id == 4 ? (
              <View style={{top:10}}>
                <ItemCard1 style={{justifyContent:'center',alignItems:'center',height:60}}>
                  <Title1 style={{fontSize:20}}>{itemdata.payment_mode} -  <FontAwesome name='rupee' size= {17}/>{itemdata.sub_total}</Title1>
                  </ItemCard1>
                  <Deliverypin 
             placeholder='Enter Delivery Pin' 
             onChangeText={text => setdeliverypin(text)}
             value={deliverypin} 
             keyboardType="numeric"
             style={{textAlign:'center'}}>
             </Deliverypin>
              {/* <OTPTextView
               handleTextChange={(e) => {}}
               containerStyle={styles.textInputContainer}
               textInputStyle={styles.roundedTextInput}
               inputCount={5}
              //  ref={e => (otpInput = e)}
              setValue={deliverypin}
              // setalue={deliverypin}
                /> */}
               {/* {incorrectmsg()} */}
              
              </View>
            
            ):(
              <Text style={{height:0}}></Text>
            )}
        <Orderitems style={{zIndex:3}}><OrderTitle1 style={{fontWeight:'400',left:16,top:10,fontSize:16}}><AntDesign name='clockcircleo' size={14}/>  <TimeAgo time={timestamp} interval={2000} /></OrderTitle1></Orderitems>
        <Card style={{flexDirection:'row',bottom:50}}>
         
          <View style={{top:30 ,left:10}}>
            
          <Title style={{width:18,height:'auto',left:12}}>|</Title>
          <View>
            </View>  
            <View style={{backgroundColor:'white',width:40,height:40,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Ionicons name='cart-outline' size={20} color='black'/>
            </View>
             <Title style={{width:18,height:'auto',left:12}}>||||||||</Title>
             <View style={{backgroundColor:'white',width:40,height:40,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
             <EvilIcons name='location' size={20} color='black'/>
            </View>
              <Title style={{width:18,height:'auto',left:12}}>||||||||||</Title>
          </View>
         <View> 
         <View style={{top:55,left:20}}>
          <Title style={{fontWeight:'bold'}}>{itemdata.restaurant.name}</Title>
          <Title style={{width:'40%'}}>{itemdata.restaurant.address}</Title>
          <TouchableOpacity onPress={() => {
         const lat = itemdata.restaurant.latitude
         const long = itemdata.restaurant.longitude
            Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&origin=` +
                `&destination=` +
                lat +
                `,` +
                long +
                `&travelmode=driving`
            );
            
        }} style={styles.getdirections}>
          <Text style={{color:'white',fontWeight:'bold'}}><Ionicons name='md-arrow-redo-outline' size={20}/> Get Direction</Text>
          </TouchableOpacity>
          
          </View>
          
          <View style={{top:120,left:20,}}>
          <Title style={{fontWeight:'bold'}}>{itemdata.user.name}</Title>
          <Title style={{bottom:6}}>{itemdata.user.phone}</Title>
          <Title style={{bottom:8,width:'40%'}}>{objectStringArray[0]?.address}</Title>
          <View style={{flexDirection:'row',}}>
          <TouchableOpacity style={styles.getdirections} onPress={() => {
         const ulat = objectStringArray[0]?.lat
         const ulong = objectStringArray[0]?.long
            Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&origin=` +
                `&destination=` +
                ulong +
                `,` +
                ulat +
                `&travelmode=driving`
            );
            
        }}>
          <Text style={{color:'white',fontWeight:'bold'}}><Ionicons name='md-arrow-redo-outline' size={20}/> Get Direction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.getdirections,{width:126,paddingTop:8}]} onPress={()=>triggerCall()}>
          <Text style={{color:'white',fontWeight:'bold'}}> <SimpleLineIcons name='call-out' size={16}/> Call Now</Text>
          </TouchableOpacity>
          </View>
          
          </View>
         </View>
          
         
         
        </Card>
        <Orderitems ><OrderTitle1 style={{fontWeight:'400',left:16,top:10,fontSize:16}}><Feather name='list' size={14}/>  Order Items</OrderTitle1></Orderitems>
        <ItemCard style={{paddingBottom:10,flexBasis:'auto',bottom:22}}>
        
      {getTime()}
      
      </ItemCard>
      </View>
}
            </Container>
           
           
            
            </ScrollView>
           </Container>
          
           <Heading style={{backgroundColor:'#86C200'}}>
           { itemdata.orderstatus_id == 2 ?
           (
            <SwipeButton
            shouldResetAfterSuccess="true"
            containerStyles={{borderRadius: 5,right:10}}
            height={60}
            width={400}
            thumbIconImageSource={thumbIcon}
            titleStyles={{color:'white',fontWeight:'bold',fontSize:16}}
            // onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            // onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeSuccess={() =>
             { Acceptorder() ,Ordered()}
            }
            railBorderColor="#86C200"
            railBackgroundColor="#86C200"
            thumbIconBorderColor='#86C200'
            title="Accept"
            thumbIconBackgroundColor="#0d101d"
            railFillBackgroundColor="#0d101d"
            railFillBorderColor="#0d101d"
            railStyles={{borderRadius:1,borderWidth:4}}
            // thumbIconImageSource={{}}
            thumbIconWidth={80} 
            
            thumbIconStyles={{borderRadius:0.1,borderWidth:0.1,height:20,}}
          />
           ):(
            itemdata.orderstatus_id == 3 ?
              
            <SwipeButton
            shouldResetAfterSuccess="true"
            containerStyles={{borderRadius: 5,right:10}}
            height={60}
            width={400}
            thumbIconImageSource={thumbIcon}
            titleStyles={{color:'white',fontWeight:'bold',fontSize:16}}
            // onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            // onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeSuccess={() =>
              {pickeduporder(),Ordered()}
            }
            railBorderColor="#86C200"
            railBackgroundColor="#86C200"
            thumbIconBorderColor='#86C200'
            title="Picked Up"
            thumbIconBackgroundColor="#0d101d"
            railFillBackgroundColor="#0d101d"
            railFillBorderColor="#0d101d"
            railStyles={{borderRadius:1,borderWidth:4}}
            // thumbIconImageSource={{}}
            thumbIconWidth={80} 
            
            thumbIconStyles={{borderRadius:0.1,borderWidth:0.1,height:20,}}
          />:
            <SwipeButton
            shouldResetAfterSuccess="true"
            containerStyles={{borderRadius: 5,right:10}}
            height={60}
            width={400}
            // thumbIconImageSource={thumbIcon}
            titleStyles={{color:'white',fontWeight:'bold',fontSize:16}}
            // onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            // onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeSuccess={() =>
              pinverify()
            }
            railBorderColor="#86C200"
            railBackgroundColor="#86C200"
            thumbIconBorderColor='#86C200'
            title="Delivered"
            thumbIconBackgroundColor="#0d101d"
            railFillBackgroundColor="#0d101d"
            railFillBorderColor="#0d101d"
            railStyles={{borderRadius:1,borderWidth:4}}
            thumbIconImageSource={thumbIcon}
            thumbIconWidth={80} 
            
            thumbIconStyles={{borderRadius:0.1,borderWidth:0.1,height:20}}
          />
          )}
           
                 </Heading>
            
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
 flex:1
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    height:60,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
   
  },
  logout:{
    left:52,
    fontSize:14,
    backgroundColor:'#8360c2',
    padding:6,
    borderRadius:4,
    color:'white',
    fontWeight:'bold',
    top:6,
    paddingBottom:8
  },
  getdirections:{
    backgroundColor:'#86C200',
    padding:6,
    width:126,
    borderRadius:4,
    top:10,
    marginRight:20
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});




