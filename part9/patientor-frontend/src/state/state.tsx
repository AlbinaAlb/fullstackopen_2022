import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient | null;
  diagnosis: { [id: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patient: null,
  diagnosis: {},
};

//состояние приложения и функция диспетчеризации, которая используется для внесения изменений в данные
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  //создание state и dispatcher и передача их в StateContext.Provider
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
//компоненты, которым необходимо получить доступ к state или dispatcher, используют useStateValue для их получения
export const useStateValue = () => useContext(StateContext);
