import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Linking,
} from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    error: '',
  };
  handleEmailChange = (email) => {
    this.setState({ email });
  };
  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  handleCreateAccountPress = () => {
    Linking.openURL('https://app.sacsis.tech/entrar').catch(err => console.error('An error occurred', err));
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço de e-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {this.state.error.length !== 0 && (
            <Text style={styles.errormessage}>{this.state.error}</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Dashboard')
            }}>
            <Text style={styles.buttontext}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singupbutton}
            onPress={this.handleCreateAccountPress}
          >
            <Text style={styles.singuptext}>Cadastrar agora</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    height: Dimensions.get('window').height * 0.3,
    paddingBottom: 20,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginBottom: 15,
    fontSize: 16,
  },
  errormessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#53D04B',
    alignSelf: 'stretch',
  },
  buttontext: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  singupbutton: {
    padding: 10,
    marginTop: 20,
  },
  singuptext: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
