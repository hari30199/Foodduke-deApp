import React,{useState,useEffect,useContext} from 'react';
import {Switch,Text,View,} from 'react-native';
import { AuthContext } from '../../../AuthContext';
import BackgroundGeolocation, {Location,Subscription} from "react-native-background-geolocation";
import { ConstantClass } from './Locfind';
const HelloWorld = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [loc,setloc] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {userInfo} = useContext(AuthContext);
  
  const token = userInfo.auth_token
  // console.log(token)
  const id = userInfo.id
  // // console.log(id)
  // var lat = location.latitude
  // var long = location.longitude
  // console.log(lat,long)

  ConstantClass.Email = location.latitude;
  ConstantClass.Password = location.longitude;
  const Ordered = () => {

    fetch(`https://demo.foodduke.com/public/api/delivery/set-delivery-guy-gps-location`,{
      method:'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "token" : token,
        "user_id":id,
        "delivery_lat": ConstantClass.Email ,
        "delivery_long":ConstantClass.Password ,
        "heading":""
      }),
    })
    .then((response) =>(response.json()))
    .then((result) => {
      console.log(result)
      setloc(result); 
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    const timer = setTimeout(() => {
      Ordered();
  
    }, 20000);

    return () => clearTimeout(timer);
}
useEffect(()=>{
  Ordered()
},[])

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation:Subscription = BackgroundGeolocation.onLocation((location) => {
      // console.log('[onLocation]', location);
      setLocation(location.coords, null, 2);
    })

    const onMotionChange:Subscription = BackgroundGeolocation.onMotionChange((event) => {
      // console.log('[onMotionChange]', event);
    });

    const onActivityChange:Subscription = BackgroundGeolocation.onActivityChange((event) => {
      // console.log('[onMotionChange]', event);
    })

    const onProviderChange:Subscription = BackgroundGeolocation.onProviderChange((event) => {
      // console.log('[onProviderChange]', event);
    })

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      reset: true,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 200,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'https://demo.foodduke.com/locations',
      batchSync: true,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
     
    
    }).then((state) => {
      setEnabled(state.enabled)
      // console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    }
  }, []);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.start();
      
    }
  }, [enabled]);

  return (
    location == null ? <Text>hello</Text> :
    <View style={{flexDirection:'row',justifyContent:'flex-end',height:0}}>
      {enabled ?( <Text style={{color:'grey',top:2}}>Location serice Enabled  </Text>):(<Text style={{color:'grey',top:2}}>! kindle enable location serices  </Text>)}
      
     
      {/* {Object.entries(location).map(([key,v])=>{
        console.log(v?.coords)
            return <View ><Text>{v}</Text></View>
        })} */}
      {/* <Text>{ location.latitude}</Text>
      <Text>{ location.longitude}</Text> */}
  
    </View>
  )
}

export default HelloWorld;
