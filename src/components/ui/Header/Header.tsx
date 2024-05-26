import { AppBar, Toolbar } from "@mui/material";
import { IconCustom } from "../Icon/Icon";
import { alertError } from "../../../helpers/alerts";

export const Header = () => {
  const handleAlert = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconCustom icon="local_mall" />
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
