import { customer_db } from "../db/db.js";

// ---------------- CLASS ----------------
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

    get id() { return this.#id; }
    get firstName() { return this.#firstName; }
    get lastName() { return this.#lastName; }
    get email() { return this.#email; }
    get phone() { return this.#phone; }
    get address() { return this.#address; }

    set id(v) { this.#id = v; }
    set firstName(v) { this.#firstName = v; }
    set lastName(v) { this.#lastName = v; }
    set email(v) { this.#email = v; }
    set phone(v) { this.#phone = v; }
    set address(v) { this.#address = v; }
}

// ---------------- SYNC STORAGE ----------------
function syncCustomers() {
    localStorage.setItem("pos_customers", JSON.stringify(customer_db));
}

// ---------------- SEED FIX ----------------
for (let i = 0; i < customer_db.length; i++) {
    const d = customer_db[i];

    if (!(d instanceof Customer)) {
        customer_db[i] = new Customer(
            d.id,
            d.firstName,
            d.lastName,
            d.email,
            d.phone,
            d.address
        );
    }
}

// ---------------- ADD ----------------
const addCustomerData = (id, firstName, lastName, email, phone, address) => {

    const c = new Customer(id, firstName, lastName, email, phone, address);

    customer_db.push(c);

    syncCustomers(); // 🔥 FIX

    return c;
};

// ---------------- UPDATE (SAFE FIX) ----------------
const updateCustomerData = (index, id, firstName, lastName, email, phone, address) => {

    const c = customer_db[index];
    if (!c) return null;

    c.id = id;
    c.firstName = firstName;
    c.lastName = lastName;
    c.email = email;
    c.phone = phone;
    c.address = address;

    syncCustomers(); // 🔥 FIX

    return c;
};

// ---------------- DELETE ----------------
const deleteCustomerData = (index) => {
    customer_db.splice(index, 1);
    syncCustomers(); // 🔥 FIX
};

// ---------------- GET ALL ----------------
const getAllCustomerData = () => customer_db;

// ---------------- GET BY INDEX ----------------
const getCustomerDataByIndex = (index) => customer_db[index];

// ---------------- GET BY ID ----------------
const getCustomerDataById = (id) =>
    customer_db.find(c => c.id === id);

// ---------------- EXPORT ----------------
export {
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    getAllCustomerData,
    getCustomerDataByIndex,
    getCustomerDataById
};