//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {Add, ArrowLeft2, TagUser} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import ContactItem from '../../components/contacts/contactItem';
import {ADDCONTACT} from '../../utils/routes';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts} from '../../store/slices/contactsSlice';

const db = openDatabase({name: 'myDataBase'});

// create a component
const ContactList = ({route, navigation}) => {
  const backScreen = route.name;
  const {item} = route?.params;
  const {contacts, updateList} = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const getPersons = group_id => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons JOIN groups ON persons.group_id=groups.id WHERE groups.id= ?',
        [group_id],
        (sqlTxn, res) => {
          let result = [];
          for (let i = 0; i < res.rows.length; i++) {
            let item = res.rows.item(i);
            result.push(item);
          }
          dispatch(setContacts(result));
        },
        error => console.log('HATA:', error.message),
      );
    });
  };

  useEffect(() => {
    getPersons(item.id);
    CommonActions.setParams({group_id: item.id});
    return () => {
      dispatch(resetStore());
    };
  }, [updateList]);

  return (
    <SafeAreaView style={defaultScreenStyle.container}>
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', marginVertical: 10}}>
          {item.title}
        </Text>
        <FlatList
          contentContainerStyle={{flex: 1}}
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TagUser size="80" color="#BBB" variant="bold" />
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                No Contacts Found
              </Text>
              <Text style={{fontSize: 14, color: '#2b2b2b', marginTop: 20}}>
                Tap the button below to add a new contact.
              </Text>
              <Button
                onPress={() =>
                  navigation.navigate(ADDCONTACT, {group_id: item.id})
                }
                title="Add Contact"
              />
            </View>
          }
          data={contacts}
          renderItem={({item}) => <ContactItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default ContactList;
