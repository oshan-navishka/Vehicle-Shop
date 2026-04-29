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

    get id()        { return this.#id; }
    get firstName() { return this.#firstName; }
    get lastName()  { return this.#lastName; }
    get email()     { return this.#email; }
    get phone()     { return this.#phone; }
    get address()   { return this.#address; }

    set id(v)        { this.#id = v; }
    set firstName(v) { this.#firstName = v; }
    set lastName(v)  { this.#lastName = v; }
    set email(v)     { this.#email = v; }
    set phone(v)     { this.#phone = v; }
    set address(v)   { this.#address = v; }
}

// ---- Convert seed plain objects to Customer instances ----
for (let i = 0; i < customer_db.length; i++) {
    const d = customer_db[i];
    if (!(d instanceof Customer)) {
        customer_db[i] = new Customer(d.id, d.firstName, d.lastName, d.email, d.phone, d.address);
    }
}

// ---- Add ----
const addCustomerData = (customerId, firstName, lastName, email, phone, address) => {
    const c = new Customer(customerId, firstName, lastName, email, phone, address);
    customer_db.push(c);
    return c;
};

// ---- Update ----
const updateCustomerData = (index, customerId, firstName, lastName, email, phone, address) => {
    const c = customer_db[index];
    c.id        = customerId;
    c.firstName = firstName;
    c.lastName  = lastName;
    c.email     = email;
    c.phone     = phone;
    c.address   = address;
    return c;
};

// ---- Delete ----
const deleteCustomerData = (index) => {
    customer_db.splice(index, 1);
    return true;
};

// ---- Get All ----
const getAllCustomerData = () => customer_db;

// ---- Get By Index ----
const getCustomerDataByIndex = (index) => customer_db[index];

// ---- Get By Id ----
const getCustomerDataById = (customerId) => customer_db.find(c => c.id === customerId);

export {
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    getAllCustomerData,
    getCustomerDataByIndex,
    getCustomerDataById
};