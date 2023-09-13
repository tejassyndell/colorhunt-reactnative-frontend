/* eslint-disable */
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cartData, SetCartData] = useState();

  return (
    <DataContext.Provider value={{ cartData, SetCartData }}>
      {children}
    </DataContext.Provider>
  );
};

