import { Cart } from "./cart.model";
import { Product } from "../product/product.model";
import { Types } from "mongoose";

// Get or create a shared cart (no user context)
const getCart = async () => {
  let cart = await Cart.findOne().populate("items.product");
  if (!cart) {
    cart = await Cart.create({ items: [], totalAmount: 0 });
  }
  return cart;
};

// Recalculate total based on product prices and quantities
const recalculateCartTotal = async (cart: any) => {
  const productIds = cart.items.map(
    (item: any) => item.product?._id?.toString?.() || item.product?.toString?.()
  );

  const products = await Product.find({ _id: { $in: productIds } }).lean();

  const priceMap = new Map(products.map((p) => [p._id.toString(), p.price]));

  let total = 0;
  for (const item of cart.items) {
    const productId =
      item.product?._id?.toString?.() || item.product?.toString?.();
    const price = priceMap.get(productId) || 0;
    total += price * item.quantity;
  }

  cart.totalAmount = total;
};

// Add item to the cart
const addItemToCart = async (productId: string) => {

  if (!Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const cart = await getCart();

  const existingItem = cart.items.find((item: any) => {
    const id = item.product?._id?.toString?.() || item.product?.toString?.();
    return id === productId;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      product: new Types.ObjectId(productId),
      quantity: 1,
    });
  }

  await recalculateCartTotal(cart);
  await cart.save();

  return cart;
};

// Update quantity of an item
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
