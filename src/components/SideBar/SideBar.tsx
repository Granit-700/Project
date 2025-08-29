import { Box, Typography, Button } from "@mui/material";
import {
  useItems,
  useIncreaseQty,
  useDecreaseQty,
  useCartTotalQty,
  useCartTotalPrice,
  useFetchCart,
} from "../../stores/cartStore";
import delivery from "../../assets/icons/delivery.svg";
import { useEffect } from "react";
import { useAccessToken } from "../../stores/authStore";

const SideBar = () => {
  const items = useItems();
  const totalQty = useCartTotalQty();
  const totalPrice = useCartTotalPrice();
  const increaseQty = useIncreaseQty();
  const decreaseQty = useDecreaseQty();
  const fetchCart = useFetchCart();

  // отслеживаем токен — вызываем fetchCart только если токен есть
  const token = useAccessToken();

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      // если нет токена — можно очистить локальную корзину или оставить как есть
      // например: // set local items to []
    }
  }, [token, fetchCart]);

  return (
    <Box width="300px" margin="72px 30px 0 0" sx={{ backgroundColor: "#fff", borderRadius: "18px" }}>
      <Box padding="24px 16px" borderRadius="18px">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="16px">
          <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>Корзина</Typography>
          <Box
            width="40px"
            height="20px"
            textAlign="center"
            borderRadius="6px"
            sx={{ backgroundColor: "#F2F2F3", fontSize: "12px", lineHeight: "20px", fontFamily: "Nunito" }}
          >
            {totalQty}
          </Box>
        </Box>

        {items.length === 0 ? (
          <Typography>{"Тут пока пусто :("}</Typography>
        ) : (
          <>
            {items.map((item) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderTop="1px solid #F2F2F3"
                borderBottom="1px solid #F2F2F3"
                paddingY="16px"
              >
                <Box component="img" src={item.image} alt={item.name} width="64px" height="52px" borderRadius="8px" mr="6px" />
                <Box>
                  <Typography fontSize="12px" mb="1px">{item.name}</Typography>
                  <Typography fontSize="12px" mb="6px" color="#B1B1B1">{item.grams}г</Typography>
                  <Typography fontSize="12px">{item.original_price} сом</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="15px" sx={{ backgroundColor: "#F2F2F3", borderRadius: "12px", padding: "9px 12px" }}>
                  <Button disableRipple sx={{ p: 0, minWidth: 0, fontSize: "16px" }} onClick={() => decreaseQty(item.id)}>-</Button>
                  <Typography fontSize="16px">{item.quantity}</Typography>
                  <Button disableRipple sx={{ p: 0, minWidth: 0, fontSize: "16px" }} onClick={() => increaseQty(item.id)}>+</Button>
                </Box>
              </Box>
            ))}

            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Итого</Typography>
              <Typography sx={{ fontWeight: 600 }}>{totalPrice} сом</Typography>
            </Box>

            <Button fullWidth disableRipple variant="contained" sx={{ mt: 2, borderRadius: "12px", textTransform: "none", backgroundColor: "#FF7020", fontSize: "16px" }}>
              Оформить заказ
            </Button>

            {totalPrice > 599 && (
              <Box display="flex" alignItems="center" gap="8px" mt="8px">
                <Box component="img" src={delivery} />
                <Typography fontSize="12px">Бесплатная доставка</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SideBar;
