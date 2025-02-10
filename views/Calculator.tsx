import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculatorView = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('history');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (e) {
        console.error('Failed to load history.', e);
      }
    };

    loadHistory();
  }, []);

  const saveHistory = useCallback(async (newHistory: string[]) => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save history.', e);
    }
  }, []);

  const handlePress = useCallback((value: string) => {
    if (value === '=') {
      try {
        const result = eval(display).toString();
        setDisplay(result);
        const newHistory = [...history, `${display} = ${result}`];
        setHistory(newHistory);
        saveHistory(newHistory);
      } catch (e) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else if (value === '⌫') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay(display + value);
    }
  }, [display, history, saveHistory]);

  const renderButton = useCallback((value: string, isOperator = false) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? (isOperator ? '#ff9500' : '#333') : (isOperator ? '#ff9500' : '#fff') },
      ]}
      onPress={() => handlePress(value)}
    >
      <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#000' }]}>{value}</Text>
    </TouchableOpacity>
  ), [handlePress, isDarkMode]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={[styles.displayContainer, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}>
        <Text style={[styles.displayText, { color: isDarkMode ? '#fff' : '#000' }]}>{display}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {['7', '8', '9', '/'].map(value => renderButton(value, true))}
        {['4', '5', '6', '*'].map(value => renderButton(value, true))}
        {['1', '2', '3', '-'].map(value => renderButton(value, true))}
        {['0', '.', '=', '+'].map(value => renderButton(value, true))}
        {['C', '⌫'].map(value => renderButton(value))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  displayText: {
    fontSize: 40,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '25%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default CalculatorView;