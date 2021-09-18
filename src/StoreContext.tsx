import React from "react";
import store, { StoreType } from "./redux/reduxStore";

const StoreContext = React.createContext(store);

export type ProviderType = {
  store: StoreType,
  children: React.ReactNode
}

export const Provider = (props: ProviderType) => {
  return <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
}

export default StoreContext;