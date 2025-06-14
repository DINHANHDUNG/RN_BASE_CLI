import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {useLoginMutation} from '../features/auth/authApi';
import {useAppDispatch} from '../store/hooks';
import {login} from '../features/auth/authSlice';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginApi, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      const res = await loginApi({username, password}).unwrap();
      dispatch(login(res));
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{borderWidth: 1, marginBottom: 8, width: 200}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth: 1, marginBottom: 8, width: 200}}
      />
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
      />
    </View>
  );
}
