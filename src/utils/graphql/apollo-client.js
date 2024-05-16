import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import store from '../../redux/store';

// AuthLink will be called for every request.
const authLink = setContext((_, {headers}) => {
  const getBaseHeader = () => {
    // We will extract logged in user token fom the redux store.
    // useSelector would be nicer here but we cant use it outside of a hook
    const mToken = store?.getState()?.user?.user?.token;
    // alert('mToken', mToken);
    if (mToken) {
      return {
        headers: {...headers, Authorization: mToken},
      };
    }
    return {headers: {...headers}};
  };

  const baseHeaders = getBaseHeader();

  return new Promise(async resolve => {
    baseHeaders.headers = {...baseHeaders.headers};
    console.log('Final Headers: ', baseHeaders);
    resolve(baseHeaders);
  });
});

// Lets create a httpLink

// const apiBase = 'https://graph.shoutti.com/graphql';
// const apiBase = 'http://localhost:4040/graphql';
const apiBase = 'http://172.20.10.4:4040/graphql';
// const apiBase = 'https://thrifty-dev.onrender.com/graphql';

const httpLink = createHttpLink({uri: apiBase});

// To disable cache
// https://www.apollographql.com/docs/react/api/core/ApolloClient/#defaultoptions
const defaultOptions = {
  watchQuery: {fetchPolicy: 'no-cache', errorPolicy: 'ignore'},
  query: {fetchPolicy: 'no-cache', errorPolicy: 'all'},
};

// This way we can be sure for every rrquest, the authlink comes to play
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({addTypename: false}),
  defaultOptions: defaultOptions,
});

export default client;
