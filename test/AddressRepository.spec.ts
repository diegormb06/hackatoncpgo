import test from "japa";
import AddressRepository from "App/repository/AddressRepository";
import { AddressFactory } from "Database/factories/addressFactory";
const addressRepository = new AddressRepository();

const addressAttributes = [
  "id",
  "user_id",
  "zipcode",
  "address",
  "number",
  "complement",
  "district",
  "city",
  "state",
  "country",
];

test.group("Test AddressRepository", () => {
  test("AddressRepository.create should create and returns an address", async (assert) => {
    const newAddress = await AddressFactory.makeStubbed();
    delete newAddress.$attributes.id;
    const createdAddress = await addressRepository.create(
      newAddress.$attributes
    );

    assert.isObject(createdAddress, "address data should be an object");
    assert.containsAllKeys(createdAddress, addressAttributes);
  });

  test("addressRepository.getAll should return an array of address and paginate data", async (assert) => {
    const addresss = await addressRepository.getAll();
    assert.isOk(addresss, "getAll return truthy value");
    assert.containsAllKeys(
      addresss,
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
      "address data should contains all required attributes"
    );
    assert.isArray(addresss.data, "data should be an array");
  });

  test("addressRepository.findOne should return one address data", async (assert) => {
    const testAddress = await AddressFactory.create();
    const foundAddress = await addressRepository.findOne(
      testAddress.serialize().id
    );

    assert.isOk(foundAddress, "findOne should return an truthy value");
    assert.containsAllKeys(foundAddress, addressAttributes);
    assert.ownInclude(testAddress.serialize(), foundAddress);
  });

  test("addressRepository.update should update an address data", async (assert) => {
    const testAddress = await AddressFactory.create();
    const newTestAddressData = await AddressFactory.makeStubbed();
    const { updatedAt, ...newData } = newTestAddressData.serialize();
    const updatedAddress = await addressRepository.update(
      testAddress.serialize().id,
      newData
    );

    assert.isOk(updatedAddress);
    assert.ownInclude(updatedAddress.serialize(), newData);
  });

  test("addressRepository.delete should delete a address", async (assert) => {
    const testAddress = await AddressFactory.create();
    const deleteResponse = await addressRepository.delete(testAddress.id);

    assert.ownInclude(deleteResponse, { message: "success" });
  });
});
