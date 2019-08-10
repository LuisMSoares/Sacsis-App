import React, { Component } from 'react';
import api from '../services/api';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SectionList,
  AsyncStorage,
} from 'react-native';

class ScheduleScreen extends Component {
  state = {
    data: [],
    refreshing: false,
    admin: false,
  };
  async componentDidMount() {
    const admin = await AsyncStorage.getItem('@UserData:admin');
    if (admin === '1') {
      this.setState({admin: true});
    }
    const response = await api.get('/schedule/?appvalues=1');
    if (response.status === 200) {
      this.setState({ data: response.data });
    }
  }
  
  _onRefresh = async () => {
    this.setState({refreshing: true});
    const response = await api.get('/schedule/?appvalues=1');
    if (response.status === 200) {
      this.setState({data: response.data});
    } else {
      const data = await AsyncStorage.getItem('@UserData:data');
      this.setState({ data: data });
    }
    this.setState({refreshing: false});
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SectionList
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          sections={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.flatlist}
              onPress={() => {
                if (this.state.admin) {
                  this.props.navigation.navigate('ScheduleDetailsScreen',{
                    key: item.id,
                    title: item.titulo
                  })
                }
              }}
            >
              <Text style={styles.itemTitle}>
                {item.titulo}
              </Text>
              <Text style={styles.itemDetails}>
                Local: {item.local}    Horário: {item.data_inicio} - {item.data_fim}
              </Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section}) => {
            if (section.status === -1) {
              return <Text style={itemHeaderPassed}>{section.title}</Text>
            } else if (section.status === 0) {
              return <Text style={itemHeaderActive}>{section.title}</Text>
            } else if (section.status === 1) {
              return <Text style={itemHeaderWaiting}>{section.title}</Text>
            }
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default ScheduleScreen;

const styles = StyleSheet.create({
  flatlist: {
    width: Dimensions.get('window').width - 10,
    padding: 5,
    borderBottomColor: '#00000036',
    borderBottomWidth: 1,
    paddingLeft: 15,
    alignSelf: 'stretch',
  },
  itemTitle: {
    fontSize: 16
  },
  itemDetails: {
    fontSize: 12
  },
  itemHeaderDefault: {
    fontSize: 18,
    padding: 10,
    borderRadius: 2,
    marginTop: 5,
    color: 'white'
  },
});
const itemHeaderActive = StyleSheet.flatten([
  styles.itemHeaderDefault,
  {backgroundColor: '#35b448'},
]);
const itemHeaderPassed = StyleSheet.flatten([
  styles.itemHeaderDefault,
  {backgroundColor: '#db434e'},
]);
const itemHeaderWaiting = StyleSheet.flatten([
  styles.itemHeaderDefault,
  {backgroundColor: '#4495cb'},
]);