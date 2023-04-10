import Application from "@ioc:Adonis/Core/Application";
import UserRepository from "../../infrastructure/Repositories/UserRepository";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import ProductImageRepository from "Infrastructure/Repositories/ProductImageRepository";
import cuid from "cuid";
import fs from "fs";

export class ImageServices {
  async uploadPhoto(user_id: number, newImage: MultipartFileContract) {
    const newPhoto = `${cuid()}.${newImage.extname}`;

    const userRepository = new UserRepository();
    const userPhoto = (await userRepository.findOne(user_id))?.photo;

    if (userPhoto)
      fs.unlinkSync(Application.makePath("uploads/photos/" + userPhoto));

    await newImage.move(Application.makePath("uploads/photos"), {
      name: newPhoto,
    });

    await userRepository.update(user_id, { photo: newPhoto });

    return { photo: newPhoto };
  }

  async deletePhoto(user_id: number) {
    const userRepository = new UserRepository();
    const userPhoto = (await userRepository.findOne(user_id))?.photo;

    if (userPhoto)
      fs.unlinkSync(Application.makePath("uploads/photos/" + userPhoto));

    await userRepository.update(user_id, { photo: null });
  }

  async uploadImages(product_id: number, images: MultipartFileContract[]) {
    let createdImages: String[] = [];
    try {
      const productImageRepository = new ProductImageRepository();
      for (let image of images) {
        const imageName = `${cuid()}.${image.extname}`;
        await image.move(Application.makePath("uploads/images"), {
          name: imageName,
        });

        await productImageRepository.create({
          product_id,
          path: imageName,
        });

        createdImages.push(imageName);
      }

      return createdImages;
    } catch (e) {
      return e.message;
    }
  }

  async deleteProductImage(image_id: number) {
    const imageRepository = new ProductImageRepository();
    const productImage = await imageRepository.findOne(image_id);

    fs.access(
      Application.makePath("uploads/images/" + productImage.path),
      (err: any) => {
        if (!err)
          fs.unlinkSync(
            Application.makePath("uploads/images/" + productImage.path)
          );
      }
    );

    await imageRepository.delete(image_id);
    return `imagem ${productImage.path} deletada`;
  }
}
