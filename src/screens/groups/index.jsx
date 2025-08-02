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
import {
  addNewGroups,
  createPersonsTable,
  createTable,
  deleteGroups,
  getGroups,
  getPersons,
} from '../../utils/dataBase';
import GroupItem from '../../components/groups/groupItem';
import AddItemInput from '../../components/groups/addItemInput';
import {useDispatch, useSelector} from 'react-redux';

// create a component
const Groups = () => {
  const [list, setList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [add, setAdd] = useState(false);
  const [newItem, setNewItem] = useState('');

  const {groups} = useSelector(state => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    createTable();
    createPersonsTable();
    getGroups(setList, dispatch);
  }, []);

  const handleNewItem = () => {
    setAdd(!add);
    if (add && newItem) addNewGroups(newItem, setList);
    setNewItem('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 10, flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            title={showDelete ? 'Okay' : 'Edit'}
            onPress={() => setShowDelete(!showDelete)}
          />
          <Button onPress={() => handleNewItem()} title="Add List" />
        </View>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginVertical: 10}}>
          List
        </Text>
        <FlatList
          data={groups}
          ListFooterComponent={
            add && (
              <AddItemInput
                newItem={newItem}
                changeText={text => setNewItem(text)}
              />
            )
          }
          keyExtractor={item => item.id?.toString()}
          renderItem={({item}) => (
            <GroupItem
              item={item}
              showDelete={showDelete}
              deleteItem={id => deleteGroups(id, setList)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default Groups;
