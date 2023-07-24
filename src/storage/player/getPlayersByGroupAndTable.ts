import { listPlayersByGroup } from './listPlayersByGroup';

export async function getPlayersByGroupAndTable(group: string, table: string) {
  try {
    const storedPlayers = await listPlayersByGroup(group);

    const players = storedPlayers.filter(player => player.table === table);

    return players;
  } catch(error) {
    throw error;
  }
}
