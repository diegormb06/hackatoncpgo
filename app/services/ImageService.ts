import Application from "@ioc:Adonis/Core/Application";
import UserRepository from "../repository/UserRepository"
import cuid from "cuid";
import fs from "fs";

export default class ImageService {
  async uploadPhoto(user_id:number, imageFile:any) {
    const fileName = `${cuid()}.${imageFile.extname}`

    try {
      await imageFile.move(Application.makePath("uploads/photos"), {
        name: fileName,
      })
      const userRepository = new UserRepository();
      await userRepository.update(user_id, {photo: fileName});
      return {photo: fileName}
    } catch (e) {
       return false
    }
  }

  async updatePhoto(user_id, newImage) {
    const newPhoto = `${cuid()}.${newImage.extname}`

    try {
      const userRepository = new UserRepository();
      const userPhoto = (await userRepository.findOne(user_id)).photo;
      fs.unlinkSync(Application.makePath("uploads/photos/"+userPhoto));

      await newImage.move(Application.makePath("uploads/photos"), {
        name: newPhoto,
      })

      await userRepository.update(user_id, {photo: newPhoto});

      return {photo: newPhoto}
    } catch (e) {
      return e.message;
    }
  }
}
