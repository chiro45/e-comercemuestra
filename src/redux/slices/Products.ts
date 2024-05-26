import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Iproduct } from "../../types/Iproduct";

interface IInitialState {
  products: Iproduct[];
  productActive: Iproduct | null;
}

// Define el estado inicial utilizando esa interfaz
const initialState: IInitialState = {
  products: [],
  productActive: null,
};

// Crea el slice de Redux
export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductActive: (state, action: PayloadAction<Iproduct>) => {
      state.productActive = action.payload;
    },
    setProducts: (state, action: PayloadAction<Iproduct[]>) => {
      state.products = action.payload;
    },
    resetProductActive: (state) => {
      state.productActive = null;
    },
    sortProductsByPrice: (state, action: PayloadAction<boolean>) => {
      const sortOrder = action.payload ? 1 : -1;
      state.products.sort(
        (a, b) => (parseInt(a.price) - parseInt(b.price)) * sortOrder
      );
    },
  },
});

// Exporta las acciones del slice
export const {
  setProductActive,
  setProducts,
  resetProductActive,
  sortProductsByPrice,
} = Products.actions;

// Exporta el reducer del slice
export default Products.reducer;
