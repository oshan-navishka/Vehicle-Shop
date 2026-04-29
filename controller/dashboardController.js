// ============================================================
// DASHBOARD
// ============================================================
function updateDash() {
  $('dc_cust').textContent = state.customers.length;
  $('dc_veh').textContent  = state.vehicles.length;
  $('dc_ord').textContent  = state.orders.length;
  const rev = state.orders.reduce((s, o) => s + o.total, 0);
  $('dc_rev').textContent = 'Rs. ' + rev.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });

  const tb = $('recentOrdTbl');
  const recent = state.orders.slice(-8).reverse();
  if (!recent.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="5">No orders yet — create your first sale!</td></tr>';
    return;
  }
  tb.innerHTML = recent.map(o => `
    <tr>
      <td><span class="badge badge-gold">${o.orderId}</span></td>
      <td style="font-weight:600">${o.custName || o.custId}</td>
      <td>${o.items.map(i => i.name).join(', ')}</td>
      <td style="font-weight:700;color:#06d6a0">Rs. ${o.total.toFixed(2)}</td>
      <td style="color:#888;font-size:12px">${o.date}</td>
    </tr>`).join('');
}