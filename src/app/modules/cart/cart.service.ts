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

// Recalculate total based on cart items
const recalculateCartTotal = async (cart: any) => {
  const productIds = cart.items.map(
    (item: any) => item.product._id || item.product
  );
  const products = await Product.find({ _id: { $in: productIds } }).lean();

  const priceMap = new Map(products.map((p) => [p._id.toString(), p.price]));

  let total = 0;
  for (const item of cart.items) {
    const price =
      priceMap.get(item.product._id?.toString() || item.product.toString()) ||
      0;
    total += price * item.quantity;
  }

  cart.totalAmount = total;
};

const addItemToCart = async (productId: string) => {
  const cart = await getCart();

  const existingItem = cart.items.find(
    (item: any) =>
      item.product._id?.toString() === productId ||
      item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: new Types.ObjectId(productId), quantity: 1 });
  }

  await recalculateCartTotal(cart);
  await cart.save();
  return cart;
};

const updateItemQuantity = async (cartItemId: string, quantity: number) => {
  const cart = await getCart();

  const existingItem = cart.items.find(
    (item: any) => item._id.toString() === cartItemId
  );

  if (!existingItem) {
    throw new Error("Cart item not found");
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item: any) => item._id.toString() !== cartItemId
    );
  } else {
    existingItem.quantity = quantity;
  }

  await recalculateCartTotal(cart);
  await cart.save();
  return cart;
};

export const CartService = {
  getCart, 
  addItemToCart,
  updateItemQuantity,
};
