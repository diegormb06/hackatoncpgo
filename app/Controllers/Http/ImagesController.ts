import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import imageService from "@ioc:Services/ImageServices";

export default class ImagesController {
  public async uploadPhoto({ request, params }: http) {
    const file = request.file("photo", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    return imageService.uploadPhoto(params.user_id, file);
  }

  public async uploadImages({ request, params }: http) {
    const images = request.files("images", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    return imageService.uploadImages(params.product_id, images);
  }

  public async deletePhoto() {}
  public async deleteImages() {}
}
