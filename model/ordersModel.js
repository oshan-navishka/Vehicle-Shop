import { order_db } from "../db/db.js";

class Order {
    #orderId;
    #date;
    #custId;
    #custName;
    #items;
    #total;
    #discount;
    #cash;
    #balance;

    constructor(orderId, date, custId, custName, items, total, discount, cash, balance) {
        this.#orderId  = orderId;
        this.#date     = date;
        this.#custId   = custId;
        this.#custName = custName;
        this.#items    = items;
        this.#total    = total;
        this.#discount = discount;
        this.#cash     = cash;
        this.#balance  = balance;
    }

    get orderId()   { return this.#orderId; }
    get date()      { return this.#date; }
    get custId()    { return this.#custId; }
    get custName()  { return this.#custName; }
    get items()     { return this.#items; }
    get total()     { return this.#total; }
    get discount()  { return this.#discount; }
    get cash()      { return this.#cash; }
    get balance()   { return this.#balance; }

    set orderId(v)  { this.#orderId = v; }
    set date(v)     { this.#date = v; }
    set custId(v)   { this.#custId = v; }
    set custName(v) { this.#custName = v; }
    set items(v)    { this.#items = v; }
    set total(v)    { this.#total = v; }
    set discount(v) { this.#discount = v; }
    set cash(v)     { this.#cash = v; }
    set balance(v)  { this.#balance = v; }
}

// ---- Convert seed plain objects to Order instances ----
for (let i = 0; i < order_db.length; i++) {
    const d = order_db[i];
    if (!(d instanceof Order)) {
        order_db[i] = new Order(
            d.orderId, d.date, d.custId, d.custName,
            d.items, d.total, d.discount, d.cash, d.balance
        );
    }
}

// ---- Add ----
const addOrderData = (orderId, date, custId, custName, items, total, discount, cash, balance) => {
    const o = new Order(orderId, date, custId, custName, items, total, discount, cash, balance);
    order_db.push(o);
    return o;
};

// ---- Update ----
const updateOrderData = (index, orderId, date, custId, custName, items, total, discount, cash, balance) => {
    const o = order_db[index];
    o.orderId  = orderId;
    o.date     = date;
    o.custId   = custId;
    o.custName = custName;
    o.items    = items;
    o.total    = total;
    o.discount = discount;
    o.cash     = cash;
    o.balance  = balance;
    return o;
};

// ---- Delete ----
const deleteOrderData = (index) => {
    order_db.splice(index, 1);
    return true;
};

// ---- Get All ----
const getAllOrderData = () => order_db;

// ---- Get By Index ----
const getOrderDataByIndex = (index) => order_db[index];

// ---- Get By Id ----
const getOrderDataById = (orderId) => order_db.find(o => o.orderId === orderId);

export {
    addOrderData,
    updateOrderData,
    deleteOrderData,
    getAllOrderData,
    getOrderDataByIndex,
    getOrderDataById
};