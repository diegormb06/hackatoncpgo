/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/api", () => "Autofast API 1.0.0");

Route.group(() => {
  Route.post("/login", "AuthController.login");
  Route.post("/admin", "AuthController.adminLogin");
  Route.post("/authenticate", "AuthController.authenticate");
}).prefix("/auth");

Route.group(() => {
  Route.get("products/search", "ProductsController.searchProduct");

  Route.post("registerUser", "UsersController.store");
  Route.get("uploads/:type/:filename", "ImagesController.show");
});

Route.group(() => {
  Route.resource("users", "UsersController").apiOnly();
  Route.resource("address", "AddressesController").apiOnly();

  Route.resource("shops", "ShopsController").apiOnly();
  Route.get("shops/:shopId/products", "ShopsController.getProductsByShop");
  Route.get("shops/:shopId/orders", "OrdersController.getOrdersByShop");
  Route.get(
    "shops/confirm-integration/:paymentAccount",
    "ShopsController.confirmIntegration"
  );
  Route.get(
    "shops/:shopId/addPaymentAccount",
    "OrdersController.createPaymentAccount"
  );

  Route.resource("products", "ProductsController").apiOnly();

  Route.resource("orders", "OrdersController").apiOnly();
  Route.get("orders/stats", "OrdersController.orderStats");
  Route.put("orders/:orderId/:status", "OrdersController.updateStatus");

  Route.post("uploads/photo/:user_id", "ImagesController.uploadPhoto");
  Route.delete("uploads/photo/:user_id", "ImagesController.deletePhoto");
  Route.post("uploads/images/:product_id", "ImagesController.uploadImages");
  Route.delete("uploads/images/:image_id", "ImagesController.deleteImages");

  Route.post("payment", "PaymentController.createPaymentIntent");
  Route.post("payment/status", "PaymentController.savePaymentData");
  Route.get(
    "payment/link/:accountId",
    "PaymentController.createIntegrationLink"
  );
}).middleware("auth");
