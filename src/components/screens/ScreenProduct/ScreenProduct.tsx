import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconCustom } from "../../ui/Icon/Icon";

import styles from "./ScreenProduct.module.css";

import { useState } from "react";
import { Carrousel } from "../../ui/Carrousel/Carrousel";
import { Footer } from "../../ui/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { resetProductActive } from "../../../redux/slices/Products";
import { alertError } from "../../../helpers/alerts";

export const ScreenProduct = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const handleNavigationBack = () => {
    dispatch(resetProductActive());
    navigation(-1);
  };

  const [amount, setAmount] = useState(1);

  const incrementAmount = () => {
    setAmount((prev) => prev + 1);
  };
  const decrementAmount = () => {
    if (amount > 0) {
      setAmount((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };
  const product = useAppSelector((state) => state.product.productActive);

  return (
    <>
      {product && (
        <>
          <div className={styles.containerPrincipal__Product}>
            <div className={styles.container__Product}>
              <div className={styles.buttonBack__product}>
                <Button onClick={handleNavigationBack} variant="contained">
                  <IconCustom icon="arrow_back" /> Volver atras
                </Button>
              </div>
              <div className={styles.container__gridProduct}>
                <div className={styles.container__imageAndTitle}>
                  <h2>{product.denomination}</h2>
                  <Carrousel images={product.images} />
                </div>
                <div>
                  <div>
                    <div>
                      <p>{product.description}</p>
                    </div>
                    <div>${product.price}</div>
                  </div>
                  <div className={styles.productContainerActions__Product}>
                    <div className={styles.productAmount__Product}>
                      <Button
                        disabled={amount === 0 && true}
                        variant="contained"
                        onClick={decrementAmount}
                      >
                        <IconCustom
                          icon={`${amount > 1 ? "remove" : "delete"}`}
                        />
                      </Button>
                      <h2>Cantidad: {amount}</h2>
                      <Button variant="contained" onClick={incrementAmount}>
                        <IconCustom icon="add" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleAddToCart}
                      color="success"
                      variant="contained"
                    >
                      Agregar al carrito <IconCustom icon="add_shopping_cart" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
