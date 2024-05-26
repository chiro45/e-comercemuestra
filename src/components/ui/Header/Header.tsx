import { AppBar, Toolbar } from "@mui/material";
import { IconCustom } from "../Icon/Icon";
import { alertError } from "../../../helpers/alerts";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const handleAlert = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };
  const navigate = useNavigate();
  const returnCategories = () => {
    navigate("/");
  };
  return (
    <AppBar position="static" style={{ backgroundColor: "var(--primary)" }}>
      <Toolbar variant="dense">
        <div
          style={{
            width: "100%",
            height: "8vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconCustom icon="local_mall" fnOnclick={returnCategories} />
          <div
            style={{
              width: "20%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconCustom fnOnclick={handleAlert} icon="account_circle" />
            <IconCustom fnOnclick={handleAlert} icon="shopping_cart" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};
