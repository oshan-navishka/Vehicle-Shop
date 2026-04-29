import {
  addOrderData,
  updateOrderData,
  deleteOrderData,
  getAllOrderData,
  getOrderDataByIndex,
  getOrderDataById
} from "../model/ordersModel.js";

const orderScope = $('#orderSection').length ? '#orderSection ' : '';
const orderResetButton = $('#orderSection').length ? '#order_btnReset' : '#btnReset';

let currentOrderItems = [];
let selected_index = -1;

function initOrder() {
  if (typeof state !== 'undefined') {
    state.orders = getAllOrderData();
  }
  $('oId').value = uid('ORD');
  $('oDate').value = new Date().toISOString().split('T')[0];
  populateOrderSelects();
  if (!currentOrderItems.length) renderOrderItems();
}

function populateOrderSelects() {
  $('oCust').innerHTML = '<option value="">-- Select Customer --</option>' +
    state.customers.map(c => `<option value="${c.id}">${c.id} — ${c.firstName} ${c.lastName}</option>`).join('');
  $('oVeh').innerHTML = '<option value="">-- Select Vehicle --</option>' +
    state.vehicles.filter(v => v.qty > 0)
      .map(v => `<option value="${v.id}">${v.id} — ${v.make} ${v.model} ${v.year || ''} (Stock: ${v.qty})</option>`).join('');
}

function fillCustInfo() {
  const c = state.customers.find(x => x.id === $('oCust').value);
  $('oCustName').value = c ? `${c.firstName} ${c.lastName}` : '';
  $('oCustAddr').value = c ? (c.address || '') : '';
}

function fillVehInfo() {
  const v = state.vehicles.find(x => x.id === $('oVeh').value);
  $('oVehName').value  = v ? `${v.make} ${v.model} ${v.year||''}`.trim() : '';
  $('oVehPrice').value = v ? `Rs. ${v.price.toFixed(2)}` : '';
  $('oVehStock').value = v ? v.qty : '';
}

function addToOrder() {
  const vid = $('oVeh').value;
  if (!vid) { showMsg('Please select a vehicle.', 'error'); return; }
  const v = state.vehicles.find(x => x.id === vid);
  if (!v) return;
  const qty = parseInt($('oQty').value) || 1;
  if (qty < 1) { showMsg('Quantity must be at least 1.', 'error'); return; }

  const ex = currentOrderItems.find(x => x.id === vid);
  const alreadyOrdered = ex ? ex.qty : 0;
  if (alreadyOrdered + qty > v.qty) {
    showMsg(`Only ${v.qty - alreadyOrdered} more available in stock!`, 'error'); return;
  }

  if (ex) {
    ex.qty += qty;
    ex.total = ex.qty * ex.price;
  } else {
    currentOrderItems.push({ id: vid, name: `${v.make} ${v.model} ${v.year||''}`.trim(), price: v.price, qty, total: qty * v.price });
  }

  renderOrderItems();
  $('oVeh').value = ''; $('oQty').value = '';
  $('oVehName').value = ''; $('oVehPrice').value = ''; $('oVehStock').value = '';
  showMsg(`${v.make} ${v.model} added to order.`);
}

function removeOrderItem(id) {
  currentOrderItems = currentOrderItems.filter(x => x.id !== id);
  renderOrderItems();
}

function renderOrderItems() {
  const tot = currentOrderItems.reduce((s, x) => s + x.total, 0);
  $('oTotal').textContent = 'Rs. ' + tot.toFixed(2);
  const tb = $('orderItemsTbl');
  if (!currentOrderItems.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="6">No vehicles added yet. Select a vehicle above.</td></tr>';
    return;
  }
  tb.innerHTML = currentOrderItems.map(x => `
    <tr>
      <td><span class="badge badge-blue">${x.id}</span></td>
      <td style="font-weight:600">${x.name}</td>
      <td>Rs. ${x.price.toFixed(2)}</td>
      <td style="font-weight:700">${x.qty}</td>
      <td style="font-weight:700;color:#06d6a0">Rs. ${x.total.toFixed(2)}</td>
      <td><button class="btn-remove" onclick="removeOrderItem('${x.id}')">✕ Remove</button></td>
    </tr>`).join('');
}

function calcBalance() {
  const subtotal = currentOrderItems.reduce((s, x) => s + x.total, 0);
  const disc = parseFloat($('oDisc').value) || 0;
  const discAmt = subtotal * (disc / 100);
  const net = subtotal - discAmt;
  const cash = parseFloat($('oCash').value) || 0;
  const bal = cash - net;
  $('oTotal').textContent = 'Rs. ' + net.toFixed(2);
  $('oBal').value = 'Rs. ' + bal.toFixed(2);
  if (bal < 0) showMsg('Insufficient cash! Balance is negative.', 'error');
  else showMsg('Balance calculated.', 'info');
}

function placeOrder() {
  if (!$('oCust').value) { showMsg('Please select a customer.', 'error'); return; }
  if (!currentOrderItems.length) { showMsg('Please add at least one vehicle.', 'error'); return; }

  const subtotal = currentOrderItems.reduce((s, x) => s + x.total, 0);
  const disc = parseFloat($('oDisc').value) || 0;
  const net = subtotal * (1 - disc / 100);
  const cash = parseFloat($('oCash').value) || 0;
  const bal = parseFloat(($('oBal').value || '0').replace(/[^\d.-]/g, '')) || 0;

  const orderId = $('oId').value;
  const date = $('oDate').value;
  const custId = $('oCust').value;
  const custName = $('oCustName').value;
  const items = [...currentOrderItems];

  const order = addOrderData(orderId, date, custId, custName, items, net, disc, cash, bal);

  order.items.forEach(item => {
    const i = state.vehicles.findIndex(v => v.id === item.id);
    if (i >= 0) state.vehicles[i].qty -= item.qty;
  });

  state.orders = getAllOrderData();
  saveState();
  showMsg('✅ Order placed successfully!');

  currentOrderItems = [];
  renderOrderItems();
  $('oId').value = uid('ORD');
  $('oDate').value = new Date().toISOString().split('T')[0];
  ['oCust','oVeh'].forEach(f => $(f).value = '');
  ['oCustName','oCustAddr','oVehName','oVehPrice','oVehStock','oQty','oDisc','oCash','oBal'].forEach(f => $(f).value = '');
  $('oTotal').textContent = 'Rs. 0.00';
  populateOrderSelects();
}

function renderHist(data) {
  data = data || getAllOrderData();
  const tb = $('histTbl');
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
      <td style="text-align:center"><span class="badge badge-blue">${o.items.reduce((s,i)=>s+i.qty,0)}</span></td>
      <td style="font-weight:700;color:#06d6a0">Rs. ${o.total.toFixed(2)}</td>
      <td><span class="badge badge-gold">${o.discount || 0}%</span></td>
      <td>Rs. ${o.cash.toFixed(2)}</td>
      <td style="font-weight:700;color:${o.balance >= 0 ? '#06d6a0' : '#e94560'}">Rs. ${o.balance.toFixed(2)}</td>
    </tr>`).join('');
}

function filterHist() {
  const q = $('hSearch').value.toLowerCase();
  renderHist(getAllOrderData().filter(o =>
    o.orderId.toLowerCase().includes(q) ||
    o.custId.toLowerCase().includes(q) ||
    (o.custName || '').toLowerCase().includes(q)
  ));
}

window.initOrder = initOrder;
window.populateOrderSelects = populateOrderSelects;
window.fillCustInfo = fillCustInfo;
window.fillVehInfo = fillVehInfo;
window.addToOrder = addToOrder;
window.removeOrderItem = removeOrderItem;
window.renderOrderItems = renderOrderItems;
window.calcBalance = calcBalance;
window.placeOrder = placeOrder;
window.renderHist = renderHist;
window.filterHist = filterHist;