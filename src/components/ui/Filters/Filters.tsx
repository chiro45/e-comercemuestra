import { useEffect, useState } from "react";
import { IconCustom } from "../Icon/Icon";
import { ICategories } from "../../../types/ICategories";
import { ProductService } from "../../../services/ProductService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setProducts,
  sortProductsByPrice,
} from "../../../redux/slices/Products";
import { CategoryService } from "../../../services/CategoryService";
import {
  setCategory,
  setPrice,
  setSearch,
} from "../../../redux/slices/Filters";
import styles from "./Fiters.module.css";
const URLAPI = import.meta.env.VITE_API_URL;
export const Filters = () => {
  const filtersValues = useAppSelector((state) => state.filters);

  const [openPrice, setOpenPrices] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  const handleCategoriesOptions = () => {
    setOpenCategories(!openCategories);
    if (openPrice) setOpenPrices(!openPrice);
  };

  const handlePricesOptions = () => {
    setOpenPrices(!openPrice);
    if (openCategories) setOpenCategories(!openCategories);
  };

  const [categories, setCategories] = useState<ICategories[]>([]);

  const productService = new ProductService(`${URLAPI}/products`);

  const dispatch = useAppDispatch();

  const handleSetCategorieActive = async (categorie: string | null) => {
    dispatch(setCategory(categorie));
    setOpenCategories(false);
    if (categorie) {
      const response = await productService.getByCategory(categorie);
      dispatch(setProducts(response));
      dispatch(setSearch(""));
    } else {
      const response = await productService.getAll();
      dispatch(setProducts(response));
      dispatch(setPrice(null));
      dispatch(setSearch(""));
    }
  };

  const handleSetfilterPriceActive = async (price: string | null) => {
    if (price) {
      price === "Mayor Precio"
        ? dispatch(sortProductsByPrice(false))
        : dispatch(sortProductsByPrice(true));
      dispatch(setPrice(price));
    } else {
      const response = filtersValues.category
        ? await productService.getByCategory(filtersValues.category)
        : await productService.getAll();

      dispatch(setProducts(response));
      dispatch(setPrice(null));
    }
    setOpenPrices(false);
  };

  const categoryService = new CategoryService(`${URLAPI}/categories`);
  const getCategories = async () => {
    const res = await categoryService.getAll();
    setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className={styles.containerPrincipal__filters}>
          <div
            onClick={handleCategoriesOptions}
            className={styles.container__filters}
          >
            <h3>Categorias</h3>
            <IconCustom icon="category" />
          </div>
          <div
            onClick={handlePricesOptions}
            className={styles.container__filters}
          >
            <h3>Precio</h3>
            <IconCustom icon="payment" />
          </div>
          {openCategories && (
            <div className={styles.containerCategories}>
              <div
                className={styles.containerCategoriesDiv}
                onClick={() => {
                  handleSetCategorieActive(null);
                }}
              >
                <p>Limpiar filtro</p>
              </div>
              {categories.map((el) => (
                <div
                  className={styles.containerCategoriesDiv}
                  key={el.id}
                  onClick={() => {
                    handleSetCategorieActive(el.denomination);
                  }}
                >
                  <p>{el.denomination}</p>
                </div>
              ))}
            </div>
          )}
          {openPrice && (
            <div className={styles.containerPrices}>
              {["Limpiar filtro", "Mayor Precio", "Menor Precio"].map(
                (el, index) => (
                  <div
                    className={styles.containerPricesDiv}
                    key={index}
                    onClick={() => {
                      if (el !== "Limpiar filtro") {
                        handleSetfilterPriceActive(el);
                      } else {
                        handleSetfilterPriceActive(null);
                      }
                    }}
                  >
                    <p>{el}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      {(filtersValues.category || filtersValues.price) && (
        <div className={styles.container__filterActives}>
          {filtersValues.category && (
            <p>
              {filtersValues.category} {filtersValues.price && ">"}
            </p>
          )}

          {filtersValues.price && <p>{filtersValues.price}</p>}
        </div>
      )}
    </>
  );
};
