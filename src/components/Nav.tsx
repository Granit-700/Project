import { Container, Stack } from "@mui/material";
import { burgers, snacks, hotdogs, combo, shawarma, pizza, wok, desserts, sauces } from "../assets/icons";
import NavButton from "./NavButton";
import type { Category } from "../types";
import { useState } from "react";

// !_временно_!
const categories: Category[] = [
  { id: 1, title: "Бургеры", icon: burgers },
  { id: 2, title: "Закуски", icon: snacks },
  { id: 3, title: "Хот-доги", icon: hotdogs },
  { id: 4, title: "Комбо", icon: combo },
  { id: 5, title: "Шаурма", icon: shawarma },
  { id: 6, title: "Пицца", icon: pizza },
  { id: 7, title: "Вок", icon: wok },
  { id: 8, title: "Десерты", icon: desserts },
  { id: 9, title: "Соусы", icon: sauces }
];
// !_временно_!

const Nav = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  return (
    <Stack margin="40px 0 50px">
      <Container disableGutters sx={{ display: "flex", gap: "24px" }}>
        {categories.map((category) => (
          <NavButton
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
            onSelect={() => setSelectedCategory(category.id)}
          />
        ))}
      </Container>
    </Stack>
  );
};

export default Nav;
