import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton } from "@mui/material";
import type { Product } from "../../../types";

interface ProductModalProps {
  isOpen: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false;
  setIsOpen: (value: "ProductDetails" | "Profile" | "SignIn" | "SignUp" | "TwoFA" | false) => void;
  product: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const ProductDetailModal = ({ isOpen, setIsOpen, product, setSelectedProduct }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={() => {
        setIsOpen(false);
        setSelectedProduct(null);
      }}
      fullWidth
      maxWidth="sm"
      sx={{ borderRadius: "24px" }}
    >
      <DialogTitle>
        {product.name}
        <IconButton />
      </DialogTitle>
      <DialogContent>
        <Box component="img" src={product.image} alt={product.name} width="276px" height="220px" borderRadius="16px" />
      </DialogContent>
      <DialogActions>
        <Button disabled variant="contained" color="primary">Добавить в корзину</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDetailModal;
