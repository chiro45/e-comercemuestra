import { Button, TextField } from "@mui/material";
import styles from "./SearchBar.module.css";
import { IconCustom } from "../Icon/Icon";
import { ChangeEvent } from "react";
import { ProductService } from "../../../services/ProductService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setProducts } from "../../../redux/slices/Products";
import {
  setCategory,
  setPrice,
  setSearch,
} from "../../../redux/slices/Filters";
const URLAPI = import.meta.env.VITE_API_URL;

export const SearchBar = () => {
  const searchValue = useAppSelector((state) => state.filters.searchBar);
  const dispatch = useAppDispatch();

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const productService = new ProductService(`${URLAPI}/products`);

  const handleSearchByName = async () => {
    const res = await productService.findByName(searchValue);
    dispatch(setProducts(res));
    dispatch(setCategory(null));
    dispatch(setPrice(null));
  };

  return (
    <div className={styles.containner__SearchBar}>
      <TextField
        style={{ width: "98%" }}
        onChange={onchange}
        autoComplete="off"
        label="Ingrese un producto"
        name="product"
        value={searchValue}
        InputProps={{
          endAdornment: (
            <Button onClick={handleSearchByName} variant="contained">
              <IconCustom icon="search" />
            </Button>
          ),
        }}
      />
    </div>
  );
};


