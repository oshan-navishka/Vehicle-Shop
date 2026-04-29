import { 
    addOrderData, 
    getAllOrderData 
} from "../model/ordersModel.js";

import { customer_db, vehicle_db, order_db } from "../db/db.js";

let currentOrderItems = [];

// helper
const el = (id) => document.getElementById(id);

// ---------------- INIT ----------------
function initOrder() {
    el('oId').value = uid('ORD');
    el('oDate').value = new Date().toISOString().split('T')[0];

    populateOrderSelects();
    renderOrderItems();
}

// ---------------- POPULATE DROPDOWNS ----------------
function populateOrderSelects() {
    el('oCust').innerHTML =
        '<option value="">-- Select Customer --</option>' +
        customer_db.map(c =>
            `<option value="${c.id}">${c.id} - ${c.firstName} ${c.lastName}</option>`
        ).join('');

    el('oVeh').innerHTML =
        '<option value="">-- Select Vehicle --</option>' +
        vehicle_db.filter(v => v.qty > 0)
        .map(v =>
            `<option value="${v.id}">${v.id} - ${v.make} ${v.model} (Stock:${v.qty})</option>`
        ).join('');
}

// ---------------- CUSTOMER INFO ----------------
function fillCustInfo() {
    const c = customer_db.find(x => x.id === el('oCust').value);
    el('oCustName').value = c ? `${c.firstName} ${c.lastName}` : '';
    el('oCustAddr').value = c ? c.address : '';
}

// ---------------- VEHICLE INFO ----------------
function fillVehInfo() {
    const v = vehicle_db.find(x => x.id === el('oVeh').value);
    el('oVehName').value = v ? `${v.make} ${v.model}` : '';
    el('oVehPrice').value = v ? v.price : '';
    el('oVehStock').value = v ? v.qty : '';
}

// ---------------- ADD TO ORDER ----------------
function addToOrder() {
    const vid = el('oVeh').value;
    const v = vehicle_db.find(x => x.id === vid);

    if (!v) return;

    const qty = parseInt(el('oQty').value) || 1;

    const existing = currentOrderItems.find(x => x.id === vid);
    const already = existing ? existing.qty : 0;

    if (already + qty > v.qty) {
        showMsg("Not enough stock!", "error");
        return;
    }

    if (existing) {
        existing.qty += qty;
        existing.total = existing.qty * existing.price;
    } else {
        currentOrderItems.push({
            id: vid,
            name: `${v.make} ${v.model}`,
            price: v.price,
            qty,
            total: v.price * qty
        });
    }

    renderOrderItems();
}

// ---------------- RENDER ITEMS ----------------
function renderOrderItems() {
    const tb = el('orderItemsTbl');

    if (!currentOrderItems.length) {
        tb.innerHTML = `<tr><td colspan="6">No items</td></tr>`;
        el('oTotal').textContent = "Rs. 0.00";
        return;
    }

    const total = currentOrderItems.reduce((s, i) => s + i.total, 0);
    el('oTotal').textContent = "Rs. " + total.toFixed(2);

    tb.innerHTML = currentOrderItems.map(i => `
        <tr>
            <td>${i.id}</td>
            <td>${i.name}</td>
            <td>${i.price}</td>
            <td>${i.qty}</td>
            <td>${i.total}</td>
            <td><button onclick="removeOrderItem('${i.id}')">X</button></td>
        </tr>
    `).join('');
}

// ---------------- REMOVE ITEM ----------------
function removeOrderItem(id) {
    currentOrderItems = currentOrderItems.filter(x => x.id !== id);
    renderOrderItems();
}

// ---------------- CALC ----------------
function calcBalance() {
    const total = currentOrderItems.reduce((s, i) => s + i.total, 0);
    const disc = parseFloat(el('oDisc').value) || 0;
    const cash = parseFloat(el('oCash').value) || 0;

    const net = total - (total * disc / 100);
    const bal = cash - net;

    el('oTotal').textContent = "Rs. " + net.toFixed(2);
    el('oBal').value = bal.toFixed(2);
}

// ---------------- PLACE ORDER ----------------
function placeOrder() {
    if (!el('oCust').value || currentOrderItems.length === 0) {
        showMsg("Select customer & items", "error");
        return;
    }

    const total = currentOrderItems.reduce((s, i) => s + i.total, 0);
    const disc = parseFloat(el('oDisc').value) || 0;
    const cash = parseFloat(el('oCash').value) || 0;

    const net = total - (total * disc / 100);
    const bal = cash - net;

    const order = addOrderData(
        el('oId').value,
        el('oDate').value,
        el('oCust').value,
        el('oCustName').value,
        [...currentOrderItems],
        net,
        disc,
        cash,
        bal
    );

    // reduce stock
    currentOrderItems.forEach(i => {
        const v = vehicle_db.find(x => x.id === i.id);
        if (v) v.qty -= i.qty;
    });

    // SAVE TO STORAGE (IMPORTANT FIX)
    localStorage.setItem("pos_orders", JSON.stringify(order_db));

    showMsg("Order placed!");

    currentOrderItems = [];
    renderOrderItems();
    initOrder();

    window.renderHist();
    window.updateDash();
}

// ---------------- HISTORY ----------------
function renderHist() {
    const data = getAllOrderData();
    const tb = el('histTbl');

    if (!data.length) {
        tb.innerHTML = `<tr><td colspan="9">No orders</td></tr>`;
        return;
    }

    tb.innerHTML = data.slice().reverse().map(o => `
        <tr>
            <td>${o.orderId}</td>
            <td>${o.date}</td>
            <td>${o.custName}</td>
            <td>${o.items.map(i => i.name).join("<br>")}</td>
            <td>${o.items.reduce((s,i)=>s+i.qty,0)}</td>
            <td>${o.total}</td>
            <td>${o.discount}</td>
            <td>${o.cash}</td>
            <td>${o.balance}</td>
        </tr>
    `).join('');
}

// ---------------- FILTER ----------------
function filterHist() {
    const q = el('hSearch').value.toLowerCase();
    renderHist(
        getAllOrderData().filter(o =>
            o.orderId.toLowerCase().includes(q) ||
            o.custName.toLowerCase().includes(q)
        )
    );
}

// ---------------- EXPORT ----------------
window.initOrder = initOrder;
window.fillCustInfo = fillCustInfo;
window.fillVehInfo = fillVehInfo;
window.addToOrder = addToOrder;
window.removeOrderItem = removeOrderItem;
window.calcBalance = calcBalance;
window.placeOrder = placeOrder;
window.renderHist = renderHist;
window.filterHist = filterHist;