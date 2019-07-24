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
              onPress={() => Alert.alert('Chave: '+item.firstName)}
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
});