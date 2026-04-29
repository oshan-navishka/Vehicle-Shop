// ============================================================
// ORDER
// ============================================================
function initOrder() {
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

  // Check total already ordered + new qty
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

  const order = {
    orderId: $('oId').value,
    date: $('oDate').value,
    custId: $('oCust').value,
    custName: $('oCustName').value,
    items: [...currentOrderItems],
    total: net,
    discount: disc,
    cash,
    balance: bal
  };

  // Deduct stock
  order.items.forEach(item => {
    const i = state.vehicles.findIndex(v => v.id === item.id);
    if (i >= 0) state.vehicles[i].qty -= item.qty;
  });

  state.orders.push(order);
  saveState();
  showMsg('✅ Order placed successfully!');

  // Reset order form
  currentOrderItems = [];
  renderOrderItems();
  $('oId').value = uid('ORD');
  $('oDate').value = new Date().toISOString().split('T')[0];
  ['oCust','oVeh'].forEach(f => $(f).value = '');
  ['oCustName','oCustAddr','oVehName','oVehPrice','oVehStock','oQty','oDisc','oCash','oBal'].forEach(f => $(f).value = '');
  $('oTotal').textContent = 'Rs. 0.00';
  populateOrderSelects();
}