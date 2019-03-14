import React from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import TouchID from 'react-native-touch-id';


export default class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
    state = { locked: true };

    _pressHandler() {
      const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
      };
      
      TouchID.authenticate('to demo this react-native component', optionalConfigObject)
        .then(success => {
          alert('Authenticated Successfully');
        })
        .catch(error => {
          alert('Authentication Failed');
        });
    }
  
    render() {
      return (
        <View style={styles.container}>
        <View>
            <Image
              source={require('../assets/images/Hyce_logo.png')}
              style={styles.welcomeImage}
            />
          </View>
          <Input placeholder='Username' 
                 leftIcon={{ type: 'font-awesome', name: 'user' }} 
                 containerStyle={styles.inputUser} 
                 inputStyle={styles.inputContaire}/>
          <Input placeholder='Password' 
                 leftIcon={{ type: 'font-awesome', name: 'lock' }} 
                 containerStyle={styles.inputPassword}
                 inputStyle={styles.inputContaire}/>
          <Button id="buttonLogin" title="Connection" buttonStyle={styles.buttonStyle} onPress={this._signInAsync} />
          <Button id="buttonLogin" title="TouchID" buttonStyle={styles.buttonTouchIdStyle} onPress={this._pressHandler} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('Main');
    };
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFED46',
    },
    buttonStyle: {
      backgroundColor: 'black',
      padding: 20,
      paddingLeft: 50,
      paddingRight: 50,
    },
    buttonTouchIdStyle: {
      marginTop: 10,
      padding: 20,
      paddingLeft: 50,
      paddingRight: 50,
    },
    inputUser: {
      marginBottom: 30,
    },
    inputContaire: {
      paddingLeft: 10,
    },
    inputPassword: {
      marginBottom: 30,
    }
  });