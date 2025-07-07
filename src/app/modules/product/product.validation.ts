import { z } from "zod";

const createProductZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Product title is required",
    }),
    price: z.number({
      required_error: "Product price is required",
    }),
    quantity: z.number({
      required_error: "Product price is required",
    }),
    description: z.string({
      required_error: "Product description is required",
    }),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
