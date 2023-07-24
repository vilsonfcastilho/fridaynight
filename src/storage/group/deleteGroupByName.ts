import AsyncStorage from '@react-native-async-storage/async-storage';

import { listGroups } from './listGroups';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

export async function deleteGroupByName(groupName: string) {
  try {
    const storedGroups = await listGroups();

    const groups = storedGroups.filter(group => group !== groupName);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch(error) {
    throw error;
  }
}
