import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  ArrowRight2,
  CloseCircle,
  People,
  Profile2User,
} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ADDCONTACT, CONTACTLIST} from '../../utils/routes';

const db = openDatabase({name: 'myDataBase'});

const GroupItem = ({item, showDelete, deleteItem}) => {
  const [personsCount, setPersonsCount] = useState(0);

  const navigation = useNavigation();

  const getPersons = group_id => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons JOIN groups ON persons.group_id=groups.id WHERE groups.id= ?',
        [group_id],
        (sqlTxn, res) => {
          setPersonsCount(res.rows.length);
        },
        error => console.log('HATA:', error.message),
      );
    });
  };

  useEffect(() => {
    getPersons(item.id);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTLIST, {item: item})}
      style={styles.container}>
      {showDelete && (
        <View
          style={{
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CloseCircle
            size={24}
            color="red"
            variant="bold"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      )}
      <View style={styles.iconWrapper}>
        {item.title == 'All Phone' ? (
          <People size={28} color={Colors.BLUE} />
        ) : (
          <Profile2User size={24} color={Colors.BLUE} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.rightSide}>
          <Text style={styles.count}>{personsCount}</Text>
          <ArrowRight2 size={24} color={Colors.GRAY} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  iconWrapper: {
    paddingRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize: 15,
    color: Colors.GRAY,
    marginRight: 6,
  },
});

export default GroupItem;
