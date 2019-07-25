import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SectionList,
} from 'react-native';

class ScheduleScreen extends Component {
  state = {
    data: [
      {
        data: [
          {
            key: 404,
            title: 'Introdução ao LaTeX 1',
            locate: 'PVA226',
            hourStart: '14:00',
            hourFinish: '15:40',
          },
          {
            key: 304,
            title: 'Introdução ao Git 1',
            locate: 'PVA226',
            hourStart: '16:00',
            hourFinish: '17:40',
          },
        ],
        title: 'Segunda-feira'
      },
      {
        data: [
          {
            key: 405,
            title: 'Introdução ao LaTeX 2',
            locate: 'PVA226',
            hourStart: '14:00',
            hourFinish: '15:40',
          },
          {
            key: 306,
            title: 'Introdução ao Git 2',
            locate: 'PVA226',
            hourStart: '16:00',
            hourFinish: '17:40',
          },
        ],
        title: 'Terça-feira'
      },
      {
        data: [
          {
            key: 505,
            title: 'Introdução ao LaTeX 3',
            locate: 'PVA226',
            hourStart: '14:00',
            hourFinish: '15:40',
          },
          {
            key: 606,
            title: 'Introdução ao Git 3',
            locate: 'PVA226',
            hourStart: '16:00',
            hourFinish: '17:40',
          },
        ],
        title: 'Quarta-feira'
      },
      {
        data: [
          {
            key: 407,
            title: 'Introdução ao LaTeX 4',
            locate: 'PVA226',
            hourStart: '14:00',
            hourFinish: '15:40',
          },
          {
            key: 308,
            title: 'Introdução ao Git 4',
            locate: 'PVA226',
            hourStart: '16:00',
            hourFinish: '17:40',
          },
        ],
        title: 'Quinta-feira'
      },
      {
        data: [
          {
            key: 506,
            title: 'Introdução ao LaTeX 5',
            locate: 'PVA226',
            hourStart: '14:00',
            hourFinish: '15:40',
          },
          {
            key: 607,
            title: 'Introdução ao Git 5',
            locate: 'PVA226',
            hourStart: '16:00',
            hourFinish: '17:40',
          },
        ],
        title: 'Sexta-feira'
      },
    ],
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SectionList
          sections={this.state.data}
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
          renderSectionHeader={({section}) => {
            if (section.title === 'Segunda-feira') {
              return <Text style={itemHeaderPassed}>{section.title}</Text>
            } else if (section.title === 'Terça-feira') {
              return <Text style={itemHeaderActive}>{section.title}</Text>
            } else {
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