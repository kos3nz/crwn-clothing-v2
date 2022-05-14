import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

// this is a type that describes a key-value map for
// any function returning a PayloadAction type.
export type ActionCreators = {
  [key: string]: ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;
};

export type ActionsTypes<T extends ActionCreators> = {
  // this tells ts, that for every `key` of object `T` it
  // need to take corresponding value, extract `ReturnType`
  // of it, and map to target object within same key.
  [key in keyof T as Capitalize<string & key>]: ReturnType<T[key]>;
};

export type PayloadTypes<T extends ActionCreators> = {
  // this makes same as above, but it extracts
  // type of "payload" of the returned value.
  [key in keyof T & string as Capitalize<key>]: ReturnType<T[key]>['payload'];
};

// type Actions = ActionsTypes<typeof cartSlice.actions>;
/* output
  type Actions = {
      AddItemToCart: {
          payload: Product;
          type: string;
      };
      RemoveItemFromCart: {
          payload: Product;
          type: string;
      };
      ClearItemFromCart: {
          payload: Product;
          type: string;
      };
      ToggleCartDropdown: {
          ...;
      };
  }
*/

// type Payloads = PayloadTypes<typeof cartSlice.actions>
/* output
  type Payloads = {
      addItemToCart: Product;
      removeItemFromCart: Product;
      clearItemFromCart: Product;
      toggleCartDropdown: undefined;
  }
*/

// type AddItemToCartPayload = Actions['AddItemToCart']['payload'];
/* output
  type AddItemToCartPayload = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}
*/
