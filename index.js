/**
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry, Platform, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Toast from 'react-native-toast-message';
import {Fragment} from 'react';
import {windowHeight, windowWidth} from './src/utils/Dimensions';
import {COLORS} from './src/theme/themes';

const RootApp = ({isHeadless}) => {
  const toastConfig = {
    thriftyToast: ({text2}) => (
      <View
        style={{
          height: Platform.OS == 'ios' ? windowHeight / 15 : 60,
          width: windowWidth / 1.1,
          backgroundColor: 'black',
          borderRadius: 5,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
          {text2}
        </Text>
      </View>
    ),
  };

  return (
    <Fragment>
      <App />
      <Toast config={toastConfig} />
    </Fragment>
  );
};
AppRegistry.registerComponent(appName, () => RootApp);
