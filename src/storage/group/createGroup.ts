import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@errors/AppError';

import { listGroups } from './listGroups';

import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function createGroup(newGroup: string) {
  try {
    const storedGroups = await listGroups();

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError('This group name is already registered');
    }

    const groups = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
  } catch(error) {
    throw error;
  }
}
