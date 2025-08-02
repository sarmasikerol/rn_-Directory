//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {screenHeight, screenWidth} from '../../utils/constants';

import {fullName, getInitial} from '../../utils/functions';
import Colors from '../../theme/colors';

// create a component
const ContactDetail = ({route}) => {
  const person = route.params.person;
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          height: screenHeight * 0.4,
          backgroundColor: Colors.GRAY,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: screenWidth * 0.6,
            height: screenWidth * 0.6,
            borderRadius: 1000,
            backgroundColor: Colors.DARKGRAY,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 75, color: Colors.WHITE, fontWeight: 'bold'}}>
            {getInitial(person.name, person.surname)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 30,
            color: Colors.WHITE,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          {fullName(person.name, person.surname)}
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Telefon</Text>
        <Text>{person.phone}</Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>E-Posta</Text>
        <Text>{person.email}</Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Adres</Text>
        <Text>{person.address}</Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Şirket</Text>
        <Text>{person.company}</Text>
      </View>
    </ScrollView>
  );
};

//make this component available to the app
export default ContactDetail;
