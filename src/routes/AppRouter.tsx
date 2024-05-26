import { Route, Routes } from "react-router-dom";
import { ScreenStore } from "../components/screens/ScreenStore/ScreenStore";
import { ScreenProduct } from "../components/screens/ScreenProduct/ScreenProduct";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ScreenStore />} />
      <Route path="/product" element={<ScreenProduct />} />
    </Routes>
  );
};
