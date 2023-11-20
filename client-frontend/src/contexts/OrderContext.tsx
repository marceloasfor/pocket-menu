'use client';

import React, { createContext, useReducer } from 'react';

const initialState = {
  orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        orders: state.orders.filter(
          (item) => item.item_id !== action.payload.item_id
        ),
      };

    case 'INCREMENT_ITEM_QTY':
      return {
        ...state,
        orders: state.orders.map((item, idx) =>
          item.item_id === action.payload.item_id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        ),
      };

    case 'DECREMENT_ITEM_QTY':
      return {
        ...state,
        orders: state.orders.map((item, idx) =>
          item.item_id === action.payload.item_id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        ),
      };

    default:
      return state;
  }
};

export const OrderContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
