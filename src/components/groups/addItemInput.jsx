import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {
  ArrowRight2,
  CloseCircle,
  People,
  Profile2User,
} from 'iconsax-react-native';
import Colors from '../../theme/colors';

const AddItemInput = ({changeText, newItem}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Profile2User size={24} color={Colors.BLUE} />
      </View>
      <TextInput
        value={newItem}
        style={[{}, styles.title]}
        onChangeText={text => changeText(text)}
      />
    </View>
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
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
});

export default AddItemInput;
