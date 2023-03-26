import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthToken, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";
import { storageUserRemove, storageUserGet, storageUserSave } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
  singOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);


export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);


  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);
      
      await storageUserSave(userData);
      await storageAuthToken(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const singOut = async () => {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ 
        user, 
        signIn,
        singOut,
        isLoadingUserStorageData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}