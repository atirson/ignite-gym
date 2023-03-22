import Async from '@react-native-async-storage/async-storage';

import { UserDTO } from '../dtos/UserDTO';
import { USER_STORAGE } from '@storage/storageConfig';

export async function storageUserSave(user: UserDTO) {
  await Async.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await Async.getItem(USER_STORAGE);
  
  const user: UserDTO = storage ? JSON.parse(storage) : null;

  return user;
}

export async function storageUserClear() {
  await Async.removeItem(USER_STORAGE);
}