declare module "@ioc:Api/ImageServices" {
  import ImagesServices from "Contracts/interfaces/IImagesServices";
  const ImagesServices: ImagesServices;
  export default ImagesServices;
}

declare module "@ioc:Api/OrderServices" {
  import { IOrderServices } from "Contracts/interfaces/IOrderServices";
  const OrderServices: IOrderServices;
  export default OrderServices;
}

declare module "@ioc:Api/UserServices" {
  import { IUserServices } from "Contracts/interfaces/IUserServices";
  const UserServices: IUserServices;
  export default UserServices;
}

declare module "@ioc:Api/ShopServices" {
  import { IShopServices } from "Contracts/interfaces/IShopServices";
  const ShopServices: IShopServices;
  export default ShopServices;
}

declare module "@ioc:Api/ShopRepository" {
  import { IShopRepository } from "Contracts/interfaces/IShopRepository";
  const ShopRepository: IShopRepository;
  export default ShopRepository;
}
