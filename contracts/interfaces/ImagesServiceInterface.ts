import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";

export default interface ImagesServiceInterface {
  uploadPhoto(user_id: number, imageFile: MultipartFileContract | null): any;
  uploadImages(
    product_id: number,
    imageFiles: MultipartFileContract[] | null
  ): any;
}
