import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const file = req.file;

  if (!file) {
    throw new Error("Image file is required");
  }

  const result = await ProductServices.createProduct({
    ...productData,
    image: file.path,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is added succesfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved succesfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const productId = req.params.productId;

  if (!productId) {
    throw new Error("Product ID is required");
  }

  console.log(req.body);

  const result = await ProductServices.getProductById(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved succesfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
};
