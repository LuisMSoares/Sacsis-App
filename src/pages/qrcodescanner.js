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

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    const key = this.props.navigation.getParam('key',0);
    Alert.alert(
      'Chave: '+key+' - Tipo: '+type,
      'Conteudo: '+data,
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
    borderColor: '#0f83a9',
    borderWidth: 3,
    justifyContent: 'center',
  },
});