import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../../../../redux/slices/Filters";
import { ICategories } from "../../../../types/ICategories";
import { FC } from "react";
interface ICardCategory {
  category: ICategories;
}
export const CardCategory: FC<ICardCategory> = ({ category }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSelectCategory = () => {
    dispatch(setCategory(category.denomination));
    navigate("/store");
  };

  return (
    <Card
      onClick={() => {
        handleSelectCategory();
      }}
      sx={{ width: `90%`, height: "90%" }}
    >
      <CardMedia component="img" height={"60%"} image={category.image} />
      <CardContent>
        <Typography variant="body2" color="text.primary" textAlign={"center"}>
          {category.denomination}
        </Typography>
      </CardContent>
    </Card>
  );
};
