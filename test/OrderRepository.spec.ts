import test from "japa";
import OrderRepository from "App/Repositories/OrderRepository";
import { OrderFactory } from "Database/factories/orderFactory";
const orderRepository = new OrderRepository();

const orderAttributes = [
  "id",
  "user_id",
  "ship_address",
  "freight",
  "total_value",
  "status",
];

test.group("Test OrderRepository", () => {
  test("OrderRepository.create should create and returns an order", async (assert) => {
    const newOrder = await OrderFactory.makeStubbed();
    delete newOrder.$attributes.id;
    const createdOrder = await orderRepository.create(newOrder.$attributes);

    assert.isObject(createdOrder, "order data should be an object");
    assert.containsAllKeys(createdOrder, orderAttributes);
  });

  test("orderRepository.getAll should return an array of order and paginate data", async (assert) => {
    const orders = await orderRepository.getAll();
    assert.isOk(orders, "getAll return truthy value");
    assert.containsAllKeys(
      orders,
      [
        "data",
        "total",
        "per_page",
        "current_page",
        "last_page",
        "first_page",
        "first_page_url",
        "last_page_url",
        "next_page_url",
        "previous_page_url",
      ],
      "order data should contains all required attributes"
    );
    assert.isArray(orders.data, "data should be an array");
  });

  test("orderRepository.findOne should return one order data", async (assert) => {
    const testOrder = await OrderFactory.create();
    const foundOrder = await orderRepository.findOne(testOrder.id);

    assert.isOk(foundOrder, "findOne should return an truthy value");
    assert.containsAllKeys(foundOrder, orderAttributes);
    assert.ownInclude(testOrder.serialize(), foundOrder);
  });

  test("orderRepository.update should update an order data", async (assert) => {
    const testOrder = await OrderFactory.create();
    const newTestOrderData = await OrderFactory.makeStubbed();
    const { updatedAt, ...newData } = newTestOrderData.serialize();
    const updatedOrder = await orderRepository.update(
      testOrder.serialize().id,
      newData
    );

    assert.isOk(updatedOrder);
    assert.ownInclude(updatedOrder.serialize(), newData);
  });

  test("orderRepository.delete should delete a order", async (assert) => {
    const testOrder = await OrderFactory.create();
    const deleteResponse = await orderRepository.delete(testOrder.id);

    assert.ownInclude(deleteResponse, { message: `deleted with success` });
  });
});
