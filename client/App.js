import React from 'react';
import Navigation from './Navigation/navigation'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import { ApolloProvider } from '@apollo/react-hooks'
import client from './Apollo'

export default function App() {
  return (
    <ApolloProvider client={client}>
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Navigation></Navigation>
    </ApplicationProvider>
    </ApolloProvider>
  );
}


