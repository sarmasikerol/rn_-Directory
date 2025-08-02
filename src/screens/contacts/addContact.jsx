import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {Formik} from 'formik';
import {Input} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {setUpdateList} from '../../store/slices/contactsSlice';

const db = openDatabase({name: 'myDataBase'});

const AddContact = ({route}) => {
  const group_id = route?.params?.group_id;

  const dispatch = useDispatch();

  const addNewPerson = person => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO persons (name,surname,email,address,phone,company,group_id) VALUES (?,?,?,?,?,?,?)`,
        [
          person.name,
          person.surname,
          person.email,
          person.address,
          person.phone,
          person.company,
          group_id,
        ],
        (sqlTxn, res) => {
          dispatch(setUpdateList());
          getGroups(setList);
        },
        error => console.log('Ekleme hatası', error),
      );
    });
  };

  return (
    <View style={defaultScreenStyle.container}>
      <Formik
        initialValues={{
          name: 'erol',
          surname: 'sarmasik',
          phone: '2323232323',
          company: 'ZON',
          email: 'sarmasikerol@gmail.com',
          address: 'İstanbul',
        }}
        onSubmit={values => addNewPerson(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.formContainer}>
            <Input
              style={styles.input}
              placeholder="Adınızı girin"
              label={'Ad'}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />

            <Input
              style={styles.input}
              placeholder="Soyadınızı girin"
              label={'Soyad'}
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
            />

            <Input
              style={styles.input}
              placeholder="Telefon numarası"
              label={'Telefon'}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType="phone-pad"
            />

            <Input
              style={styles.input}
              placeholder="Şirket adı"
              label={'Şirket'}
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              value={values.company}
            />

            <Input
              style={styles.input}
              placeholder="E-posta adresi"
              label={'E-posta'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              style={styles.input}
              placeholder="Adres bilgileri"
              label={'Adres'}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              multiline={true}
              textStyle={{minHeight: 60}}
            />

            <Button
              onPress={handleSubmit}
              title="Kaydet"
              color="#007AFF"
              style={styles.button}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
});

export default AddContact;
