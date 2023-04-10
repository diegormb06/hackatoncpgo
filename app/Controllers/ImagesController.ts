import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import { IImagesServices } from "Domain/interfaces/IImagesServices";
import { ImageServices } from "App/services/ImageServices";

export default class ImagesController {
  constructor(
    private readonly imageServices: IImagesServices = new ImageServices()
  ) {}

  public async uploadPhoto({ request, params }: http) {
    const file = request.file("photo", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    return this.imageServices.uploadPhoto(params.user_id, file);
  }

  public uploadImages({ request, params }: http) {
    const images = request.files("images");
    if (!images) return "não foi localizado imagens";
    return this.imageServices.uploadImages(params.product_id, images);
  }

  public async deletePhoto({ params }: http) {
    return this.imageServices.deletePhoto(params.user_id);
  }

  public async show({ params, response }) {
    return response.attachment(
      Application.makePath(`uploads/${params.type}/`, params.filename)
    );
  }

  public async deleteImages({ params }: http) {
    return this.imageServices.deleteProductImage(params.image_id);
  }
}
