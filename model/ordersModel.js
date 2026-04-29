import { order_db } from "../db/db.js";

// ---------------- ADD ORDER ----------------
export function addOrderData(orderId, date, custId, custName, items, total, discount, cash, balance) {

    const newOrder = {
        orderId,
        date,
        custId,
        custName,
        items,
        total,
        discount,
        cash,
        balance
    };

    order_db.push(newOrder);

    // persist
    localStorage.setItem("pos_orders", JSON.stringify(order_db));

    return newOrder;
}

// ---------------- GET ALL ----------------
export function getAllOrderData() {
    return order_db;
}

// ---------------- GET BY ID ----------------
export function getOrderById(id) {
    return order_db.find(o => o.orderId === id);
}

// ---------------- DELETE ----------------
export function deleteOrderByIndex(index) {
    order_db.splice(index, 1);
    localStorage.setItem("pos_orders", JSON.stringify(order_db));
}

// ---------------- CLEAR ALL ----------------
export function clearAllOrders() {
    order_db.length = 0;
    localStorage.removeItem("pos_orders");
}