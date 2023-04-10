import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";

export interface IImagesServices {
  uploadPhoto(user_id: number, imageFile: MultipartFileContract | null): any;
  deletePhoto(user_id: number): any;
  deleteProductImage(image_id): Promise<string>;
  uploadImages(
    product_id: number,
    imageFiles: MultipartFileContract[] | null
  ): any;
}
