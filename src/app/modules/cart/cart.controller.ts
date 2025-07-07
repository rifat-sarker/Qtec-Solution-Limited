import httpStatus from "http-status";
import { CartService } from "./cart.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const addItemToCart = catchAsync(async (req, res) => {
  const { productId } = req.body;
  console.log(productId);

  if (!productId) {
    throw new Error("Product ID is required");
  }

  const result = await CartService.addItemToCart(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added to cart successfully",
    data: result,
  });
});

const updateCartItem = catchAsync(async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  if (!cartItemId) {
    throw new Error("Cart item ID is required");
  }

  const result = await CartService.updateItemQuantity(cartItemId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart updated successfully",
    data: result,
  });
});
const getCart = catchAsync(async (req, res) => {
  const result = await CartService.getCartDetails();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrieved successfully",
    data: result,
  });
});

export const CartController = {
  addItemToCart,
  updateCartItem,
  getCart,
};
