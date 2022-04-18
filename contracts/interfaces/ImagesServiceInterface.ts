import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";

export default interface ImagesServiceInterface {
  uploadPhoto(user_id: number, imageFile: MultipartFileContract | null): any;
  deletePhoto(user_id: number): any;
  uploadImages(
    product_id: number,
    imageFiles: MultipartFileContract[] | null
  ): any;
  deleteProductImage(image_id): string
}
