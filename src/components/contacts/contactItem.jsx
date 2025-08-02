//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {fullName} from '../../utils/functions';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CONTACTDETAIL} from '../../utils/routes';

// create a component
const ContactItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTDETAIL, {person: item})}
      style={{padding: 10, borderBottomWidth: 0.5, borderColor: Colors.GRAY}}>
      <Text style={{fontSize: 20, fontWeight: '500'}}>
        {fullName(item.name, item.surname)}
      </Text>
    </Pressable>
  );
};

//make this component available to the app
export default ContactItem;
