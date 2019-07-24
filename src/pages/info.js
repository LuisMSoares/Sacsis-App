import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';


class InfoScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 16}}>Meu Qr Code</Text>
        <QRCode
          value="2749"
          size={200}
        />
      </View>
    );
  }
}

export default InfoScreen;