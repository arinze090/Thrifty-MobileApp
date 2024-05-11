import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as ReduxStoreProvider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ApolloProvider} from '@apollo/client';
import client from './src/utils/graphql/apollo-client';

import store, {persistor} from './src/redux/store';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import UploadProgress from './src/components/common/UploadProgress';
import AppNavigation from './src/navigation/AppNavigation';

// LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ReduxStoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            {/*  Upload progress is for when the artust is uploading a video to the database */}
            <UploadProgress />

            <AppNavigation />
          </NavigationContainer>
        </PersistGate>
      </ReduxStoreProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
