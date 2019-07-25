import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

class ScheduleScreen extends Component {
  state = {
    data: [
      {
        key: 404,
        title: 'Introdução ao LaTeX',
        locate: 'PVA226',
        hourStart: '14:00',
        hourFinish: '15:40',
      },
      {
        key: 304,
        title: 'Introdução ao Git',
        locate: 'PVA226',
        hourStart: '16:00',
        hourFinish: '17:40',
      },
    ],
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.flatlist}
              onPress={() => this.props.navigation.navigate('ScheduleDetailsScreen',{
                key: item.key,
                title: item.title
              })}
            >
              <Text style={styles.itemTitle}>
                {item.title}
              </Text>
              <Text style={styles.itemDetails}>
                Local: {item.locate}    Horário: {item.hourStart} - {item.hourFinish}
              </Text>
            </TouchableOpacity>
          )}
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
