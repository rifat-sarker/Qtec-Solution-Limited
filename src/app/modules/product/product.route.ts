import express from "express";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { multerUpload } from "../../config/multer.config";
import catchAsync from "../../utils/catchAsync";

const router = express.Router();

router.post(
  "/",
  multerUpload.single("file"),
  catchAsync(async (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  }),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

export const ProductRoutes = router;
