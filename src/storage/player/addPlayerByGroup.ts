import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@errors/AppError';

import { PlayerStorageDTO } from './dtos/PlayerStorageDTO';
import { listPlayersByGroup } from './listPlayersByGroup';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await listPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError('This player is already registered in a team.');
    }

    const players = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch(error) {
    throw error;
  }
}
