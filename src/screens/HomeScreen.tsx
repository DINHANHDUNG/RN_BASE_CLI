import React from 'react';
import {View, Text, Button} from 'react-native';
import {useAppDispatch} from '../store/hooks';
import {logout} from '../features/auth/authSlice';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
}
