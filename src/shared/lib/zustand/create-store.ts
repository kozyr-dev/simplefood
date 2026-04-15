import { create, StateCreator } from "zustand";

export const createStore = <T>(creator: StateCreator<T>) => {
  return create<T>()(creator);
};
