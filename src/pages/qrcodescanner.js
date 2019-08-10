import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

import api from '../services/api';


class QrCodeScannerScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={styles.qrmarker}
        />


      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    const key = this.props.navigation.getParam('key',0);

    let message = '';
    let title = '';

    const response = await api.post('/admin/presence', {
      schedule_id: key,
      user_id: data,
    });
    if (response.status === 201) {
      title = 'Leitura realizada com sucesso!';
      message = response.data.enrollment+' - '+response.data.firstname;
      console.log(response.data);
    } else {
      title = 'Ops, aconteceu algum erro!';
      message = response.data.message;
    }

    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => this.setState({ scanned: false })},
      ],
      {cancelable: false},
    );
  };
}

export default QrCodeScannerScreen;

const styles = StyleSheet.create({
  qrmarker: {
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').width / 1.3,
    marginBottom: Dimensions.get('window').height / 3.5,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
  },
});