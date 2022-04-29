import React from 'react';
import {Switch} from 'react-native';
import styled from 'styled-components/native';
import {AuthProvider} from './AuthContext';
import ThemeManager, { useTheme } from './them';
import Navigation from './Navigation';
import InternetConnectionAlert from "react-native-internet-connection-alert";

class App extends React.Component{
  
render(){
  return (
    <InternetConnectionAlert
     onChange={(connectionState) => {
    // console.log("Connection State: ", connectionState);
     }}
     >
    <ThemeManager>
    <AuthProvider>   
          <Navigation/>
    </AuthProvider>
    </ThemeManager> 
    </InternetConnectionAlert>
  );
}
};
 
export default App;