import { customer_db } from "../db/db.js";

class Customer {
	#id;
	#firstName;
	#lastName;
	#email;
	#phone;
	#address;

	constructor(id, firstName, lastName, email, phone, address) {
		this.#id = id;
		this.#firstName = firstName;
		this.#lastName = lastName;
		this.#email = email;
		this.#phone = phone;
		this.#address = address;
	}

	get id() {
		return this.#id;
	}

	get firstName() {
		return this.#firstName;
	}

	get lastName() {
		return this.#lastName;
	}

	get email() {
		return this.#email;
	}

	get phone() {
		return this.#phone;
	}

	get address() {
		return this.#address;
	}

	set id(newId) {
		this.#id = newId;
	}

	set firstName(newFirstName) {
		this.#firstName = newFirstName;
	}

	set lastName(newLastName) {
		this.#lastName = newLastName;
	}

	set email(newEmail) {
		this.#email = newEmail;
	}

	set phone(newPhone) {
		this.#phone = newPhone;
	}

	set address(newAddress) {
		this.#address = newAddress;
	}
}

// ------------------------------ Add Customer -------------------------------
const addCustomerData = (customerId, firstName, lastName, email, phone, address) => {
	let new_customer = new Customer(customerId, firstName, lastName, email, phone, address);

	customer_db.push(new_customer);
	return new_customer;
};

//------------------------- Update Customer -------------------------
const updateCustomerData = (index, customerId, firstName, lastName, email, phone, address) => {
	const customer_obj = customer_db[index];

	customer_obj.id = customerId;
	customer_obj.firstName = firstName;
	customer_obj.lastName = lastName;
	customer_obj.email = email;
	customer_obj.phone = phone;
	customer_obj.address = address;
	return customer_obj;
};

//------------------------- Delete Customer -------------------------
const deleteCustomerData = (index) => {
	customer_db.splice(index, 1);
	return true;
};

//------------------------- Get Customer -------------------------
const getCustomerData = (index) => {
	return customer_db[index];
};

//------------------------- Get All Customers -------------------------
const getAllCustomerData = () => {
	return customer_db;
};

//------------------------- Get Customer data by index -------------------------
const getCustomerDataByIndex = (index) => {
	return customer_db[index];
};

// ------------------------ Get Customer data by Id -------------------------
const getCustomerDataById = (customerId) => {
	return customer_db.find(item => item.id === customerId);
};

export { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getAllCustomerData, getCustomerDataByIndex, getCustomerDataById };
