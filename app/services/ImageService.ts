import Application from "@ioc:Adonis/Core/Application";
import UserRepository from "../repository/UserRepository";
import cuid from "cuid";
import fs from "fs";
import ImagesServiceInterface from "Contracts/interfaces/ImagesServiceInterface";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import ProductImageRepository from "App/repository/ProductImageRepository";

export default class ImageService implements ImagesServiceInterface {
  async uploadPhoto(user_id: number, newImage: MultipartFileContract) {
    const newPhoto = `${cuid()}.${newImage.extname}`;

    try {
      const userRepository = new UserRepository();
      const userPhoto = (await userRepository.findOne(user_id)).photo;

      if (userPhoto)
        fs.unlinkSync(Application.makePath("uploads/photos/" + userPhoto));

      await newImage.move(Application.makePath("uploads/photos"), {
        name: newPhoto,
      });

      await userRepository.update(user_id, { photo: newPhoto });

      return { photo: newPhoto };
    } catch (e) {
      return e.message;
    }
  }

  async uploadImages(product_id: number, images: MultipartFileContract[]) {
    try {
      const productImageRepository = new ProductImageRepository();

      for (let image of images) {
        const imageName = `${cuid()}.${image.extname}`;
        await image.move(Application.makePath("uploads/images"), {
          name: imageName,
        });
        await productImageRepository.create({
          product_id: product_id,
          path: imageName,
        });
      }

      return { message: "upload success" };
    } catch (e) {
      return e.message;
    }
  }
}
