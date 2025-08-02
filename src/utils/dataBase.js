// utils/dataBase.js
import {openDatabase} from 'react-native-sqlite-storage';
import {useDispatch} from 'react-redux';
import {setGroups} from '../store/slices/groupSlice';

const db = openDatabase({name: 'myDataBase'});

export const createTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`,
      [],
      () => console.log('Tablo oluşturuldu'),
      error => console.log('Tablo oluşturulamadı', error),
    );
  });
};

export const createPersonsTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS persons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        surname VARCHAR(100),
        phone VARCHAR(15),
        company VARCHAR(100),
        email VARCHAR(50),
        address VARCHAR(200),
        group_id INTEGER,
        FOREIGN KEY (group_id) REFERENCES groups(id)
      )`,
      [],
      (sqlTxn, res) => console.log('Kişiler tablosu oluşturuldu'),
      error => console.log('Tablo oluşturulurken hata:', error.message),
    );
  });
};

export const addNewGroups = (title, setList) => {
  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO groups (title) VALUES (?)`,
      [title],
      (sqlTxn, res) => getGroups(setList),
      error => console.log('Ekleme hatası', error),
    );
  });
};

export const getGroups = (setList, dispatch) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM groups',
      [],
      (sqlTxn, res) => {
        let result = [];
        for (let i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          result.push(item);
        }
        dispatch(setGroups(result));
      },
      error => console.log('HATA:', error.message),
    );
  });
};

export const deleteGroups = (id, setList) => {
  db.transaction(txn => {
    txn.executeSql(
      ' DELETE FROM groups WHERE id=?',
      [id],
      (sqlTxn, res) => console.log('veri siliindi', res.rows),
      getGroups(setList),
      error => console.log('HATA', error.message),
    );
  });
};
