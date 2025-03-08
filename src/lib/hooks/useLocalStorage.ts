/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useLocalStorage = () => {
  const [storage, setStorage] = useState<{ [key: string]: any }>({});

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const data: { [key: string]: any } = {};
      Object.keys(localStorage).forEach((key) => {
        data[key] = JSON.parse(localStorage.getItem(key) || 'null');
      });
      setStorage(data);
    } catch (error) {
      console.error('Error loading localStorage:', error);
    }
  }, []);

  // Obtener un valor de la caché interna
  const getValue = <T>(key: string): T | null => {
    return storage[key] ?? null;
  };

  // Establecer un valor en caché y en localStorage
  const setValue = <T>(key: string, value: T) => {
    try {
      setStorage((prev) => ({ ...prev, [key]: value }));
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  // Eliminar un valor de caché y localStorage
  const removeValue = (key: string) => {
    try {
      setStorage((prev) => {
        const newStorage = { ...prev };
        delete newStorage[key];
        return newStorage;
      });
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Limpiar todo localStorage y la caché interna
  const clearStorage = () => {
    try {
      setStorage({});
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return {
    getValue,
    setValue,
    removeValue,
    clearStorage,
  };
};
