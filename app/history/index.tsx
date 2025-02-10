import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OperationsView from '@/views/Operations';

export default function History() {
  const [operations, setOperations] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('history');
        if (savedHistory) {
          setOperations(JSON.parse(savedHistory));
        }
      } catch (e) {
        console.error('Failed to load history.', e);
      }
    };

    loadHistory();
  }, []);

  return <OperationsView operations={operations} />;
}