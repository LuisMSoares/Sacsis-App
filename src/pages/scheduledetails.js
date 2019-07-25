import React, { Component } from 'react';
import { 
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';


class ScheduleDetailsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('title',''),
  });
  
  state = {
    key: this.props.navigation.getParam('key',0),
    data: [
      {
        enrollment: 1000,
        firstName: 'Mariazinha',
        hourStart: '14:00',
        hourFinish: '15:40',
      },
      {
        enrollment: 1001,
        firstName: 'Joãozinho',
        hourStart: '16:00',
        hourFinish: '17:40',
      },
    ],
  };

  render() {
    this.props.navigation.getParam('title','');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.flatlist}
              //onPress={() => Alert.alert('Chave: '+item.firstName)}
            >
              <Text style={styles.itemTitle}>
                {item.enrollment +' - '+ item.firstName}
              </Text>
              <Text style={styles.itemDetails}>
                Horário de leitura: {item.hourStart} - {item.hourFinish}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.btnbottom}
          onPress={() => 
            this.props.navigation.navigate('QrCodeScannerScreen',{
              key: this.state.key,
            })
          }>
          <Text style={styles.buttontext}>Realizar Leitura</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ScheduleDetailsScreen;

const styles = StyleSheet.create({
  flatlist: {
    width: Dimensions.get('window').width - 10,
    padding: 5,
    borderBottomColor: '#00000036',
    borderBottomWidth: 3,
    alignSelf: 'stretch',
  },
  itemTitle: {
    fontSize: 16
  },
  itemDetails: {
    fontSize: 12
  },
  btnbottom: {
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderColor: '#0f83a9',
    borderWidth: 2,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  buttontext: {
    color: '#0f83a9',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});