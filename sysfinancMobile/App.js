import React from 'react';
import { View } from 'react-native';

import {LoginComponent} from './components/login/LoginComponent';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
          <LoginComponent/>
      
        
      </View>
    );
  }
}
