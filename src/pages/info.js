import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';


class InfoScreen extends Component {
  state = {
    qrcode: '',
    nome: '',
    pagamento: '',
    minicurso1: '',
    minicurso2: '',
  };

  async componentDidMount() {
    const data = JSON.parse(await AsyncStorage.getItem('@UserData:data'));
    this.setState({ qrcode: data.qrcode });
    this.setState({ nome: data.nome });
    this.setState({ pagamento: data.pgmt });
    this.setState({ minicurso1: data.course1 });
    this.setState({ minicurso2: data.course2 });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 16}}>{ this.state.nome }</Text>
        {this.state.qrcode !== '' && (
          <QRCode
            value={this.state.qrcode}
            size={200}
          />
        )}
      </View>
    );
  }
}

export default InfoScreen;