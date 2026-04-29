import { addOrderData, getAllOrderData } from "../model/ordersModel.js";
import { customer_db } from "../db/db.js";
import { vehicle_db } from "../db/db.js";
import { order_db } from "../db/db.js";

let currentOrderItems = [];

const el = (id) => document.getElementById(id);

function initOrder() {
    el('oId').value  = uid('ORD');
    el('oDate').value = new Date().toISOString().split('T')[0];
    populateOrderSelects();
    renderOrderItems();
}

function populateOrderSelects() {
    el('oCust').innerHTML = '<option value="">-- Select Customer --</option>' +
        customer_db.map(c => `<option value="${c.id}">${c.id} — ${c.firstName} ${c.lastName}</option>`).join('');

    el('oVeh').innerHTML = '<option value="">-- Select Vehicle --</option>' +
        vehicle_db.filter(v => v.qty > 0)
            .map(v => `<option value="${v.id}">${v.id} — ${v.make} ${v.model} ${v.year || ''} (Stock: ${v.qty})</option>`).join('');
}

function fillCustInfo() {
    const c = customer_db.find(x => x.id === el('oCust').value);
    el('oCustName').value = c ? `${c.firstName} ${c.lastName}` : '';
    el('oCustAddr').value = c ? (c.address || '') : '';
}

function fillVehInfo() {
    const v = vehicle_db.find(x => x.id === el('oVeh').value);
    el('oVehName').value  = v ? `${v.make} ${v.model} ${v.year || ''}`.trim() : '';
    el('oVehPrice').value = v ? `Rs. ${Number(v.price).toFixed(2)}` : '';
    el('oVehStock').value = v ? v.qty : '';
}

function addToOrder() {
    const vid = el('oVeh').value;
    if (!vid) { showMsg('Please select a vehicle.', 'error'); return; }
    const v = vehicle_db.find(x => x.id === vid);
    if (!v) return;
    const qty = parseInt(el('oQty').value) || 1;
    if (qty < 1) { showMsg('Quantity must be at least 1.', 'error'); return; }

    const ex = currentOrderItems.find(x => x.id === vid);
    const alreadyOrdered = ex ? ex.qty : 0;
    if (alreadyOrdered + qty > v.qty) {
        showMsg(`Only ${v.qty - alreadyOrdered} more available in stock!`, 'error'); return;
    }

    if (ex) {
        ex.qty  += qty;
        ex.total = ex.qty * ex.price;
    } else {
        currentOrderItems.push({
            id: vid,
            name: `${v.make} ${v.model} ${v.year || ''}`.trim(),
            price: v.price,
            qty,
            total: qty * v.price
        });
    }

    renderOrderItems();
    el('oVeh').value = ''; el('oQty').value = '';
    el('oVehName').value = ''; el('oVehPrice').value = ''; el('oVehStock').value = '';
    showMsg(`${v.make} ${v.model} added to order.`);
}

function removeOrderItem(id) {
    currentOrderItems = currentOrderItems.filter(x => x.id !== id);
    renderOrderItems();
}

function renderOrderItems() {
    const tot = currentOrderItems.reduce((s, x) => s + x.total, 0);
    el('oTotal').textContent = 'Rs. ' + tot.toFixed(2);
    const tb = el('orderItemsTbl');
    if (!currentOrderItems.length) {
        tb.innerHTML = '<tr class="empty-row"><td colspan="6">No vehicles added yet.</td></tr>';
        return;
    }
    tb.innerHTML = currentOrderItems.map(x => `
        <tr>
            <td><span class="badge badge-blue">${x.id}</span></td>
            <td style="font-weight:600">${x.name}</td>
            <td>Rs. ${Number(x.price).toFixed(2)}</td>
            <td style="font-weight:700">${x.qty}</td>
            <td style="font-weight:700;color:#06d6a0">Rs. ${Number(x.total).toFixed(2)}</td>
            <td><button class="btn-remove" onclick="removeOrderItem('${x.id}')">✕ Remove</button></td>
        </tr>`).join('');
}

function calcBalance() {
    const subtotal = currentOrderItems.reduce((s, x) => s + x.total, 0);
    const disc     = parseFloat(el('oDisc').value) || 0;
    const net      = subtotal - subtotal * (disc / 100);
    const cash     = parseFloat(el('oCash').value) || 0;
    const bal      = cash - net;
    el('oTotal').textContent = 'Rs. ' + net.toFixed(2);
    el('oBal').value = 'Rs. ' + bal.toFixed(2);
    if (bal < 0) showMsg('Insufficient cash! Balance is negative.', 'error');
    else showMsg('Balance calculated.', 'info');
}

function placeOrder() {
    if (!el('oCust').value)      { showMsg('Please select a customer.', 'error'); return; }
    if (!currentOrderItems.length) { showMsg('Please add at least one vehicle.', 'error'); return; }

    const subtotal = currentOrderItems.reduce((s, x) => s + x.total, 0);
    const disc     = parseFloat(el('oDisc').value) || 0;
    const net      = subtotal * (1 - disc / 100);
    const cash     = parseFloat(el('oCash').value) || 0;
    const bal      = parseFloat((el('oBal').value || '0').replace(/[^\d.-]/g, '')) || 0;

    const orderId  = el('oId').value;
    const date     = el('oDate').value;
    const custId   = el('oCust').value;
    const custName = el('oCustName').value;
    const items    = [...currentOrderItems];

    addOrderData(orderId, date, custId, custName, items, net, disc, cash, bal);

    // stock reduce
    items.forEach(item => {
        const v = vehicle_db.find(x => x.id === item.id);
        if (v) v.qty -= item.qty;
    });

    showMsg('✅ Order placed successfully!');

    // reset form
    currentOrderItems = [];
    renderOrderItems();
    el('oId').value   = uid('ORD');
    el('oDate').value = new Date().toISOString().split('T')[0];
    ['oCust','oVeh'].forEach(f => { el(f).value = ''; });
    ['oCustName','oCustAddr','oVehName','oVehPrice','oVehStock','oQty','oDisc','oCash','oBal']
        .forEach(f => { el(f).value = ''; });
    el('oTotal').textContent = 'Rs. 0.00';
    populateOrderSelects();
}

function renderHist(data) {
    data = data || getAllOrderData();
    const tb = el('histTbl');
    if (!data.length) {
        tb.innerHTML = '<tr class="empty-row"><td colspan="9">No orders yet. Place your first order!</td></tr>';
        return;
    }
    tb.innerHTML = data.slice().reverse().map(o => `
        <tr>
            <td><span class="badge badge-gold">${o.orderId}</span></td>
            <td style="color:#888;font-size:12px">${o.date}</td>
            <td style="font-weight:600">${o.custName || o.custId}</td>
            <td>${o.items.map(i => i.name).join('<br>')}</td>
            <td style="text-align:center"><span class="badge badge-blue">${o.items.reduce((s,i) => s + i.qty, 0)}</span></td>
            <td style="font-weight:700;color:#06d6a0">Rs. ${Number(o.total).toFixed(2)}</td>
            <td><span class="badge badge-gold">${o.discount || 0}%</span></td>
            <td>Rs. ${Number(o.cash).toFixed(2)}</td>
            <td style="font-weight:700;color:${o.balance >= 0 ? '#06d6a0' : '#e94560'}">Rs. ${Number(o.balance).toFixed(2)}</td>
        </tr>`).join('');
}

function filterHist() {
    const q = el('hSearch').value.toLowerCase();
    renderHist(getAllOrderData().filter(o =>
        o.orderId.toLowerCase().includes(q) ||
        o.custId.toLowerCase().includes(q) ||
        (o.custName || '').toLowerCase().includes(q)
    ));
}

// window expose
window.initOrder          = initOrder;
window.populateOrderSelects = populateOrderSelects;
window.fillCustInfo       = fillCustInfo;
window.fillVehInfo        = fillVehInfo;
window.addToOrder         = addToOrder;
window.removeOrderItem    = removeOrderItem;
window.renderOrderItems   = renderOrderItems;
window.calcBalance        = calcBalance;
window.placeOrder         = placeOrder;
window.renderHist         = renderHist;
window.filterHist         = filterHist;

// state + window sync
window.order_db  = order_db;
state.orders     = order_db;

// initial hist render
renderHist();