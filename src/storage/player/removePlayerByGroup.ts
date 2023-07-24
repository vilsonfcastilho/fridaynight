import AsyncStorage from '@react-native-async-storage/async-storage';

import { PlayerStorageDTO } from './dtos/PlayerStorageDTO';
import { listPlayersByGroup } from './listPlayersByGroup';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

export async function removePlayerByGroup(playerName: string, group: string) {
  try {
    const storedPlayers = await listPlayersByGroup(group);

    const filtered = storedPlayers.filter(player => player.name !== playerName);

    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch(error) {
    throw error;
  }
}
