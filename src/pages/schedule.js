import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

class ScheduleScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => (
            <View style={styles.flatlist}>
              <Text>{item.key}</Text>
              <Text>
                Local: {item.key}    Horário: {item.key} - {item.key}
              </Text>
            </View>
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
});
