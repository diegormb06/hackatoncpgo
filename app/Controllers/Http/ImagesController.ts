import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import imageService from "@ioc:Services/ImageServices";
import Application from "@ioc:Adonis/Core/Application";

export default class ImagesController {
  public async uploadPhoto({ request, params }: http) {
    const file = request.file("photo", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    return imageService.uploadPhoto(params.user_id, file);
  }

  public uploadImages({ response }: http) {
    console.log("parametros: test");
    // const images = request.files("images");
    return response.json("teste");
    // const serviceReturn = imageService.uploadImages(params.product_id, images);
    // console.log(images);
    // return imageService.uploadImages(params.id, images);
  }

  public async deletePhoto({ params }: http) {
    return imageService.deletePhoto(params.user_id);
  }

  public async show({ params, response }) {
    return response.attachment(
      Application.makePath(`uploads/${params.type}/`, params.filename)
    );
  }

  public async deleteImages() {}
}
