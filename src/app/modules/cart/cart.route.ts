import express from "express";
import { CartController } from "./cart.controller";
import { CartValidation } from "./cart.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/add",
  validateRequest(CartValidation.addToCartZodSchema),
  CartController.addItemToCart
);

router.patch("/update/:productId", CartController.updateCartItem);

router.get("/", CartController.getCart);

export const CartRoutes = router;
