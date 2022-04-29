import React from 'react';
import {StyleSheet,Text,View,SectionList,SafeAreaView,FlatList,TouchableOpacity,Image, ImageBackground,ScrollView} from 'react-native';
// import {  } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={{top:10,}}
    >

<Image style={{width:'26%',height:150,borderRadius:10,left:20}} source={{uri:'https://foodduke.com/assets/img/slider/1623995859cZnjGl1z1E.png'}} />
<Image style={{width:'26%',height:150,borderRadius:10,left:30}} source={{uri:'https://foodduke.com/assets/img/slider/1623995965gjO6q68WMg.png'}} />
<Image style={{width:'26%',height:150,borderRadius:10,left:40}} source={{uri:'https://foodduke.com/assets/img/slider/1623996101JawKWlFLyp.png'}} />
<Image style={{width:'26%',height:150,borderRadius:10,left:50}} source={{uri:'https://foodduke.com/assets/img/slider/1623499131GmBgASnD0B.jpg'}} />
<TouchableOpacity onPress={() => navigation.navigate('DetailsScreen')}><View style={style.imge}><Image  source={require('../../assets/ofer.png')} /></View></TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('DetailsScreen')}><View style={style.imge}><Image  source={require('../../assets/ofer.png')} /></View></TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('DetailsScreen')}><View style={style.imge}><Image  source={require('../../assets/ofer.png')} /></View></TouchableOpacity>


</ScrollView>
  );
}
const style = StyleSheet.create({ 
   imge:{
     margin:10,
     width:"100%",
     height:130,
     justifyContent:'center',
   },
  
});