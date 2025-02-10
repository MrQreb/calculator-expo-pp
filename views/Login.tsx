import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, useColorScheme, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [loginData, setloginData] = useState<{ email: string; password: string }>({ email: '', password: '' });

  const handleEmailChange = (email: string) => {
    setloginData({ ...loginData, email });
  };

  const handlePasswordChange = (password: string) => {
    setloginData({ ...loginData, password });
  };

  const checkCredentials = (loginData: { email: string; password: string }) => {

    const emailAdmin = 'admin';
    const passwordAdmin = 'admin';

    const emailAccountant = 'contador';
    const passwordAccountant = 'contador';

    const adminCredentials = loginData.email === emailAdmin && passwordAdmin === loginData.password;
    const accountantCredentials = loginData.email === emailAccountant && passwordAccountant === loginData.password;


    //TODO: Guadar el nombre del rol para tipo de informacion
    if(adminCredentials){
        console.log('es admin')
    }

    if(accountantCredentials){
        console.log('es contador')
    }
    

  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Inicia Sessión</Text>
      
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        style={[styles.input, { color: isDarkMode ? '#ffffff' : '#000000', borderColor: isDarkMode ? '#ffffff' : '#000000' }]}
        onChangeText={handleEmailChange}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        secureTextEntry
        style={[styles.input, { color: isDarkMode ? '#ffffff' : '#000000', borderColor: isDarkMode ? '#ffffff' : '#000000' }]}
        onChangeText={handlePasswordChange}
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isDarkMode ? '#1E90FF' : '#007AFF' }]}
        onPress={() => checkCredentials(loginData)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 16,
    fontSize: 14,
  },
});