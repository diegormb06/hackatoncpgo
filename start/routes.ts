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

Route.get("/api", async () => {
  return { msg: "Api is running" };
});

Route.post("/login", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");
  try {
    const token = await auth.use("api").attempt(email, password);
    return token;
  } catch (error) {
    console.log(error);
    return response.badRequest(error);
  }
}).prefix("/api");

Route.group(() => {
  Route.resource("users", "UsersController").apiOnly();
  Route.resource("products", "ProductsController").apiOnly();
  Route.resource("shops", "ShopsController").apiOnly();
  Route.resource("orders", "OrdersController").apiOnly();
}).prefix("/api");
