import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactList from '../screens/contacts/contactList';
import {ADDCONTACT, CONTACTDETAIL, CONTACTLIST, GROUPS} from '../utils/routes';
import ContactDetail from '../screens/contacts/contactDetail';
import AddContact from '../screens/contacts/addContact';
import Groups from '../screens/groups';
import {Add} from 'iconsax-react-native';
import Colors from '../theme/colors';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={GROUPS}
        component={Groups}
      />
      <Stack.Screen
        name={CONTACTLIST}
        component={ContactList}
        options={({route, navigation}) => ({
          headerShown: true,
          headerRight: () => (
            <Add
              onPress={() =>
                navigation.navigate(ADDCONTACT, {
                  group_id: route.params.item.id,
                })
              }
              size={30}
            />
          ),
        })}
      />

      <Stack.Screen name={CONTACTDETAIL} component={ContactDetail} />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={ADDCONTACT}
        component={AddContact}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
