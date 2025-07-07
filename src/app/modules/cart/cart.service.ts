import { Cart } from "./cart.model";
import { Product } from "../product/product.model";
import { Types } from "mongoose";

const getCart = async () => {
  let cart = await Cart.findOne().populate("items.product");
  if (!cart) {
    cart = await Cart.create({ items: [], totalAmount: 0 });
  }
  return cart;
};

const addItemToCart = async (productId: string) => {
  const cart = await getCart();

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    // If already exists, increase quantity by 1
    existingItem.quantity += 1;
  } else {
    // If new, add with quantity 1
    cart.items.push({ product: new Types.ObjectId(productId), quantity: 1 });
  }

  await calculateTotal(cart);
  await cart.save();
  return cart;
};

const updateItemQuantity = async (cartItemId: string, quantity: number) => {
  const cart = await getCart();

  // Find item by cart item _id using .find()
  const existingItem = cart.items.find(
    (item: any) => item._id.toString() === cartItemId
  );

  if (!existingItem) {
    throw new Error("Cart item not found");
  }

  existingItem.quantity = quantity;

  if (existingItem.quantity <= 0) {
    cart.items = cart.items.filter(
      (item: any) => item._id.toString() !== cartItemId
    );
  }

  await calculateTotal(cart);
  await cart.save();
  return cart;
};

const calculateTotal = async (cart: any) => {
  let total = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  cart.totalAmount = total;
};

const getCartDetails = async () => {
  const cart = await getCart();
  return cart;
};

export const CartService = {
  addItemToCart,
  updateItemQuantity,
  getCartDetails,
};
