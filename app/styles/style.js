import { StyleSheet } from 'react-native';
const React = require('react-native');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    picker: {
      color: '#666',
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
    },
    icon: {
      color: '#fff'
    },
    iconmarginRight: {
      marginRight: 20,
      color: '#888'
    },
    titleCard: {
      fontSize: 16,
      color: '#444'
    },
    card: {
      backgroundColor: '#fff'
    },
    subTitleCard: {
      fontSize: 12,
      color: '#00796B'
    },
    textCard: {
      color: '#00796B',
      paddingBottom: 5
    },
    spaceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1
    },
    fab: {
      backgroundColor: '#37474F'
    },
    tabbar: {
      //backgroundColor: '#3F51B5',
      backgroundColor: '#37474F',
    },
    statusBarColor: {
      backgroundColor: '#111',
    },
    indicator: {
      backgroundColor: '#fff',
    },
    label: {
      color: '#fff',
      fontWeight: '500',
    },
});
// viabilizamos a exportação do módulo.
module.exports = styles;
