import { Dispatch, SetStateAction } from "react";

export interface Entry {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: number;
  container: number;
}

export interface Container {
  id: number;
  name: string;
  entries: Entry[];
}

export type Containers = Container[];

export interface JournalContextValueTypes {
  loading: boolean;
  containerList: Containers;
  selectedContainer: Container;
  setSelectedContainer: Dispatch<SetStateAction<number>>;
  currentThought: string;
  setCurrentThought: Dispatch<SetStateAction<string>>;
  currentThoughtTitle: string;
  setCurrentThoughtTitle: Dispatch<SetStateAction<string>>;
  setListUpdated: Dispatch<SetStateAction<boolean>>;
  selectedEntry: Entry;
  setSelectedEntry: Dispatch<SetStateAction<Entry>>
}

export interface AuthContextValueTypes {
  isAuthenticated: boolean;
  accessToken: string | null;
  // login: (token: string) => void;
  logout: () => void;
  userDetails: {}
}

export interface UserContextValueTypes {
  userDetails: {
    user: {
      id: number,
      username: string,
      email: string
    },
    containers: Containers
  },
  setContainersUpdated: Dispatch<SetStateAction<boolean>>
}