import { z } from "zod";

const createProductZodSchema = z.object({
  body: z.object({
    image: z.string({
      required_error: "Product image is required",
    }),
    title: z.string({
      required_error: "Product title is required",
    }),
    price: z.number({
      required_error: "Product price is required",
    }),
    description: z.string({
      required_error: "Product description is required",
    }),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
