import { Schema, model } from "mongoose";
import type { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>({
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, required: true, default: 0 },
});

export const Cart = model<ICart>("Cart", cartSchema);
