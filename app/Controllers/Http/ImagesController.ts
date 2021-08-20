import { HttpContextContract as http } from '@ioc:Adonis/Core/HttpContext'
import ImageService from "App/services/ImageService";

export default class ImagesController {
  public imageService = new ImageService();

  public async uploadPhoto({request, response, params}:http) {
    const file = request.file("photo", {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    });
    const newPhoto = this.imageService.uploadPhoto(params.user_id, file);
    if(!newPhoto) {
      return response.safeStatus(500).json({message: "error while save image"})
    }
    return newPhoto;
  }

  public async updatePhoto({request, params}:http) {
    const file = request.file("photo", {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    });

    return  this.imageService.updatePhoto(params.user_id, file);
  }

  public async destroy() {}
}
