import React, { useEffect,useContext,useState } from 'react';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import { View, StyleSheet,Text } from 'react-native';
import {AuthContext} from '../../../AuthContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const config = {
  hasXAxisBackgroundLines: false,
  xAxisLabelCount:7,
  xAxisLabelStyle: {
    position: 'right',
    color:'black',
    prefix:'₹'
  },
  yAxisLabelStyle: {
    color:'black',
    // prefix: '$'
  }
};

export default function  YourComponent (){

  const [userlist,setuserlist] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const [loading,setLoading] = useState([]);
  const token = userInfo.auth_token
  const updateuser = () => {

    fetch(`https://demo.foodduke.com/public/api/delivery/update-user-info`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" : token
      }),
    })
    .then((response) =>(response.json()))
    .then((result) => {
      // console.log(result)
      setuserlist(result.chart); 
      // console.log(userlist)
      
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  useEffect(()=>{
  updateuser()
  },[])
      
      // ---------Xaxis data--------
      
      const someJsonArray =  userlist?.chartData != undefined && userlist?.chartData != null ?  userlist?.chartData : userlist?.chartData

      var finalArray = someJsonArray?.map(function (obj) {
        return obj.x;
      });
      
      // -----------Yaxis data----------
   
      // const someJsonarray =  userlist?.chartData != undefined && userlist?.chartData != null ?  userlist?.chartData : userlist?.chartData

      // var finalarray = someJsonarray?.map(function (obj) {
      //   return obj.x;
      // });
    
return (

  <View style={{top:14}}>
    <VerticalBarGraph
      data={[20, 45, 28, 60, 9, 43, 30]}
      labels={finalArray}
      width={375}
      height={300}
      barRadius={2}
      barColor='#84E9F4'
      barWidthPercentage={0.75}
      baseConfig={config}
      style={styles.chart}
      
    />
    
  </View>
);
}
const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    width: 375
  }
});